# statistical_analysis_api.py

import pandas as pd
import numpy as np
import json
import io
import base64
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from scipy.stats import shapiro, normaltest, kstest, anderson
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from openai import OpenAI
import os

# Create blueprint
statistical_bp = Blueprint('statistical_analysis', __name__, url_prefix='/api/statistical-analysis')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'csv', 'xlsx', 'xls'}

def detect_column_types(df):
    """Detect column types for statistical analysis"""
    column_types = {}
    for col in df.columns:
        if df[col].dtype in ['int64', 'float64']:
            # Check if it's actually categorical (few unique values)
            unique_ratio = df[col].nunique() / len(df)
            if unique_ratio < 0.05 and df[col].nunique() < 20:
                column_types[col] = 'categorical'
            else:
                column_types[col] = 'numeric'
        else:
            column_types[col] = 'categorical'
    return column_types

def get_openai_client():
    """Get OpenAI client with proper configuration"""
    try:
        api_key = current_app.config.get('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OpenAI API key not configured")
        return OpenAI()
    except Exception as e:
        raise ValueError(f"Failed to initialize OpenAI client: {str(e)}")

def get_ai_analysis(data_summary, goal, target_col=None, group_col=None):
    """Get AI-powered analysis insights"""
    try:
        client = get_openai_client()
        
        prompt = f"""
        You are a statistical analysis expert. Analyze this dataset and provide insights:
        
        Dataset Summary:
        {data_summary}
        
        Analysis Goal: {goal}
        Target Column: {target_col or 'None specified'}
        Group Column: {group_col or 'None specified'}
        
        Please provide:
        1. Key insights about the data
        2. Recommended statistical tests
        3. Interpretation of results
        4. Next steps for analysis
        
        Keep the response concise and actionable.
        """
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful statistical analysis assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"AI analysis unavailable: {str(e)}"

@statistical_bp.route('/upload', methods=['POST'])
def upload_file():
    """Handle file upload and return data preview"""
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not supported. Please upload CSV or Excel files.'}), 400
    
    try:
        # Read file based on extension
        filename = secure_filename(file.filename)
        if filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)
        
        # Basic info
        column_types = detect_column_types(df)
        
        # Data preview
        preview = {
            'filename': filename,
            'rows': len(df),
            'columns': len(df.columns),
            'column_info': [
                {
                    'name': col,
                    'type': column_types[col],
                    'non_null': int(df[col].count()),
                    'null_count': int(df[col].isnull().sum()),
                    'unique_values': int(df[col].nunique())
                }
                for col in df.columns
            ],
            'sample_data': df.head(5).to_dict('records')
        }
        
        return jsonify({
            'success': True,
            'data': preview,
            'message': f'Successfully loaded {filename} with {len(df)} rows and {len(df.columns)} columns'
        })
        
    except Exception as e:
        return jsonify({'error': f'Error processing file: {str(e)}'}), 500

@statistical_bp.route('/comprehensive', methods=['POST'])
def comprehensive_analysis():
    """Perform comprehensive statistical analysis"""
    try:
        # Get file and goal from request
        file = request.files.get('file')
        goal = request.form.get('goal', 'describe')
        target_col = request.form.get('target_col')
        group_col = request.form.get('group_col')
        
        if not file:
            return jsonify({'error': 'No file provided'}), 400
        
        # Read file
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)
        
        column_types = detect_column_types(df)
        numeric_cols = [col for col, dtype in column_types.items() if dtype == 'numeric']
        categorical_cols = [col for col, dtype in column_types.items() if dtype == 'categorical']
        
        results = {
            'dataset_info': {
                'rows': len(df),
                'columns': len(df.columns),
                'numeric_columns': numeric_cols,
                'categorical_columns': categorical_cols
            },
            'analysis': {}
        }
        
        # Descriptive statistics
        if numeric_cols:
            desc_stats = df[numeric_cols].describe().to_dict()
            results['analysis']['descriptive_stats'] = desc_stats
        
        # Correlation analysis
        if len(numeric_cols) > 1:
            corr_matrix = df[numeric_cols].corr().to_dict()
            results['analysis']['correlations'] = corr_matrix
                # Regression (if a target_col is specified and is numeric, use other numeric cols as predictors)
        if target_col and target_col in df.columns and column_types.get(target_col) == 'numeric':
            try:
                # predictors = all numeric columns except target
                predictors = [c for c in numeric_cols if c != target_col]
                # drop rows with NaNs in y or X
                sub = df[[target_col] + predictors].dropna()
                if len(predictors) >= 1 and len(sub) >= 3:
                    X = sub[predictors].to_numpy()
                    y = sub[target_col].to_numpy()
                    # Standard linear regression
                    model = LinearRegression()
                    model.fit(X, y)
                    y_pred = model.predict(X)
                    r2 = float(r2_score(y, y_pred)) if np.isfinite(r2_score(y, y_pred)) else None

                    results['analysis']['regression'] = {
                        'target': target_col,
                        'predictors': predictors,
                        'r2_score': r2,
                        'intercept': float(model.intercept_) if np.isfinite(model.intercept_) else None,
                        'coefficients': {
                            predictors[i]: float(coef) if np.isfinite(coef) else None
                            for i, coef in enumerate(model.coef_)
                        },
                        'n_obs': int(len(sub))
                    }
            except Exception as rex:
                results.setdefault('analysis', {}).setdefault('errors', {})['regression'] = str(rex)

        # Group analysis if specified
        if group_col and target_col and group_col in df.columns and target_col in df.columns:
            if column_types.get(target_col) == 'numeric' and column_types.get(group_col) == 'categorical':
                group_stats = df.groupby(group_col)[target_col].agg(['mean', 'std', 'count']).to_dict()
                results['analysis']['group_analysis'] = group_stats
                # --- ANOVA (one-way) & T-Test (two-sample) when target numeric and group categorical ---
        if group_col and target_col and group_col in df.columns and target_col in df.columns:
            if column_types.get(target_col) == 'numeric' and column_types.get(group_col) == 'categorical':
                # Clean data for stats tests
                sub = df[[group_col, target_col]].dropna()
                # Build groups
                groups = []
                for gval, gdf in sub.groupby(group_col):
                    vals = pd.to_numeric(gdf[target_col], errors='coerce').dropna().to_numpy()
                    if len(vals) > 0:
                        groups.append((str(gval), vals))

                # One-way ANOVA if ≥ 2 groups with data
                if len(groups) >= 2:
                    try:
                        from scipy.stats import f_oneway, levene, ttest_ind
                        # ANOVA
                        labels, arrays = zip(*groups)
                        f_stat, p_val = f_oneway(*arrays)
                        # Basic effect size: eta-squared ≈ (SS_between / SS_total)
                        # Compute SS_total and SS_between quickly
                        all_vals = np.concatenate(arrays)
                        grand_mean = np.mean(all_vals)
                        ss_total = np.sum((all_vals - grand_mean) ** 2)
                        ss_between = 0.0
                        for lbl, arr in groups:
                            n = arr.size
                            ss_between += n * (np.mean(arr) - grand_mean) ** 2
                        eta_sq = float(ss_between / ss_total) if ss_total > 0 else None

                        results['analysis']['anova'] = {
                            'target': target_col,
                            'group': group_col,
                            'k_groups': len(groups),
                            'f_stat': float(f_stat) if np.isfinite(f_stat) else None,
                            'p_value': float(p_val) if np.isfinite(p_val) else None,
                            'eta_squared': eta_sq,
                            'group_means': {lbl: float(np.mean(arr)) for lbl, arr in groups},
                            'group_counts': {lbl: int(arr.size) for lbl, arr in groups},
                        }

                        # Two-sample T-Test only when exactly 2 groups
                        if len(groups) == 2:
                            (lbl1, a1), (lbl2, a2) = groups
                            # Levene test for equal variances
                            lev_stat, lev_p = levene(a1, a2, center='median')
                            equal_var = bool(lev_p >= 0.05)  # if p>=0.05 assume equal variances
                            t_stat, t_p = ttest_ind(a1, a2, equal_var=equal_var)

                            # Cohen's d
                            def cohens_d(x, y, use_pooled=True):
                                x, y = np.asarray(x), np.asarray(y)
                                nx, ny = x.size, y.size
                                mx, my = np.mean(x), np.mean(y)
                                vx, vy = np.var(x, ddof=1), np.var(y, ddof=1)
                                if use_pooled:
                                    sp2 = ((nx - 1) * vx + (ny - 1) * vy) / (nx + ny - 2) if (nx + ny - 2) > 0 else np.nan
                                    sp = np.sqrt(sp2) if sp2 >= 0 else np.nan
                                    return (mx - my) / sp if np.isfinite(sp) and sp != 0 else None
                                else:
                                    s = np.sqrt((vx + vy) / 2.0)
                                    return (mx - my) / s if np.isfinite(s) and s != 0 else None

                            d = cohens_d(a1, a2, use_pooled=equal_var)

                            results['analysis']['t_test'] = {
                                'target': target_col,
                                'group': group_col,
                                'groups': [lbl1, lbl2],
                                'equal_var_assumed': equal_var,
                                'levene_stat': float(lev_stat) if np.isfinite(lev_stat) else None,
                                'levene_p': float(lev_p) if np.isfinite(lev_p) else None,
                                't_stat': float(t_stat) if np.isfinite(t_stat) else None,
                                'p_value': float(t_p) if np.isfinite(t_p) else None,
                                'cohens_d': float(d) if d is not None and np.isfinite(d) else None,
                                'group_means': {lbl1: float(np.mean(a1)), lbl2: float(np.mean(a2))},
                                'group_counts': {lbl1: int(a1.size), lbl2: int(a2.size)},
                            }
                    except Exception as ex:
                        # Non-fatal: attach error details
                        results.setdefault('analysis', {}).setdefault('errors', {})['anova_ttest'] = str(ex)
        # --- Chi-Square for all pairs of categorical variables (+ Cramér's V) ---
        try:
            from scipy.stats import chi2_contingency
            def _cramers_v(contingency):
                # Bias-corrected Cramér's V (Bergsma, 2013)
                chi2, _, _, _ = chi2_contingency(contingency, correction=False)
                n = contingency.to_numpy().sum()
                if n == 0:
                    return None
                r, k = contingency.shape
                phi2 = chi2 / n
                phi2corr = max(0, phi2 - ((k - 1)*(r - 1))/(n - 1)) if n > 1 else 0
                rcorr = r - ((r - 1)**2)/(n - 1) if n > 1 else r
                kcorr = k - ((k - 1)**2)/(n - 1) if n > 1 else k
                denom = min(kcorr - 1, rcorr - 1)
                return float((phi2corr / denom) ** 0.5) if denom > 0 else None

            chi_results = {}
            if len(categorical_cols) >= 2:
                for i in range(len(categorical_cols)):
                    for j in range(i + 1, len(categorical_cols)):
                        a, b = categorical_cols[i], categorical_cols[j]
                        # Build contingency table (drop NaNs)
                        sub = df[[a, b]].dropna()
                        if sub.empty:
                            continue
                        table = pd.crosstab(sub[a].astype(str), sub[b].astype(str))
                        # Skip trivial tables
                        if table.size == 0 or table.shape[0] < 2 or table.shape[1] < 2:
                            continue
                        try:
                            chi2, p, dof, expected = chi2_contingency(table)
                            chi_results[f"{a}|{b}"] = {
                                "chi2": float(chi2),
                                "p_value": float(p),
                                "dof": int(dof),
                                "cramers_v": _cramers_v(table),
                                "observed_shape": list(map(int, table.shape)),
                                "sparsity": float((expected < 5).sum() / expected.size)  # rule-of-thumb indicator
                            }
                        except Exception as _ex:
                            chi_results[f"{a}|{b}"] = {"error": str(_ex)}
            if chi_results:
                results['analysis']['chi_square'] = chi_results
        except Exception as ex:
            results.setdefault('analysis', {}).setdefault('errors', {})['chi_square'] = str(ex)
        # Chi-Square test of independence (only when TWO categorical columns exist)
        try:
            if len(categorical_cols) >= 2:
                # pick first two categorical columns for now (can be parameterized later)
                cat_a, cat_b = categorical_cols[0], categorical_cols[1]
                # Build contingency table
                ct = pd.crosstab(df[cat_a], df[cat_b])
                if ct.shape[0] >= 2 and ct.shape[1] >= 2:
                    from scipy.stats import chi2_contingency
                    chi2, p, dof, expected = chi2_contingency(ct)
                    results.setdefault('analysis', {})['chi_square'] = {
                        'variables': [cat_a, cat_b],
                        'chi2': float(chi2),
                        'p_value': float(p),
                        'dof': int(dof),
                        'observed': ct.astype(int).to_dict(),
                        'expected': pd.DataFrame(expected, index=ct.index, columns=ct.columns).round(4).to_dict(),
                    }
        except Exception as ex:
            results.setdefault('analysis', {}).setdefault('errors', {})['chi_square'] = str(ex)

        # Get AI insights
        data_summary = f"Dataset with {len(df)} rows, {len(numeric_cols)} numeric columns, {len(categorical_cols)} categorical columns"
        ai_insights = get_ai_analysis(data_summary, goal, target_col, group_col)
        results['ai_insights'] = ai_insights
        
        return jsonify({
            'success': True,
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': f'Analysis error: {str(e)}'}), 500

@statistical_bp.route('/ai-chat', methods=['POST'])
def ai_chat():
    """Handle AI chat interactions"""
    try:
        data = request.get_json()
        message = data.get('message', '')
        context = data.get('context', {})
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400
        
        client = get_openai_client()
        
        # Build context-aware prompt
        system_prompt = """You are a helpful statistical analysis assistant. You help users understand data analysis, choose appropriate statistical tests, and interpret results. Provide clear, practical advice."""
        
        if context:
            context_info = f"Context: {json.dumps(context, indent=2)}\n\n"
            user_message = context_info + message
        else:
            user_message = message
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            max_tokens=800,
            temperature=0.7
        )
        
        return jsonify({
            'success': True,
            'response': response.choices[0].message.content
        })
        
    except Exception as e:
        return jsonify({'error': f'AI chat error: {str(e)}'}), 500

@statistical_bp.route('/execute-action', methods=['POST'])
def execute_action():
    """Execute suggested statistical actions"""
    try:
        data = request.get_json()
        action = data.get('action', {})
        
        # This would implement specific statistical actions
        # For now, return a placeholder
        return jsonify({
            'success': True,
            'message': 'Action execution not yet implemented',
            'action': action
        })
        
    except Exception as e:
        return jsonify({'error': f'Action execution error: {str(e)}'}), 500

@statistical_bp.route('/test', methods=['GET'])
def test():
    """Test endpoint"""
    return jsonify({
        'message': 'Statistical Analysis API is working',
        'endpoints': [
            '/upload - POST - Upload data file',
            '/comprehensive - POST - Comprehensive analysis',
            '/ai-chat - POST - AI chat assistance',
            '/execute-action - POST - Execute statistical actions'
        ]
    })
