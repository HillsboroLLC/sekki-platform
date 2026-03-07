from flask import Blueprint, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app import db
from app.billing_config import bootstrap_legacy_credits, get_monthly_credit_limit, to_public_plan

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard_data():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        if bootstrap_legacy_credits(user, current_app.config):
            db.session.commit()

        monthly_limit = get_monthly_credit_limit(user.subscription_plan, current_app.config)
        remaining = user.credits_remaining
        used = None
        percent_remaining = None
        if monthly_limit is not None and isinstance(remaining, int):
            used = max(0, monthly_limit - max(0, remaining))
            percent_remaining = max(0, min(100, round((max(0, remaining) / monthly_limit) * 100)))

        # Mock data for now - you can replace with real database queries later
        dashboard_data = {
            'sessions': [
                {
                    'id': 1,
                    'name': 'Market Analysis Q1',
                    'created_at': '2025-01-15',
                    'status': 'completed'
                },
                {
                    'id': 2,
                    'name': 'SWOT Analysis - Product Launch',
                    'created_at': '2025-01-10',
                    'status': 'in_progress'
                },
                {
                    'id': 3,
                    'name': 'Gap Analysis - Customer Service',
                    'created_at': '2025-01-05',
                    'status': 'completed'
                }
            ],
            'metrics': {
                'pending': 1,  # Sessions in progress
                'all': 3       # Total sessions
            },
            'docTypeCounts': {
                'market_analysis': 1,
                'swot_analysis': 1,
                'gap_analysis': 1
            },
            'planInfo': {
                'plan': to_public_plan(user.subscription_plan),
                'used': used,
                'limit': monthly_limit,
                'remaining': remaining,
                'percentRemaining': percent_remaining
            }
        }

        return jsonify(dashboard_data), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to fetch dashboard data'}), 500
