import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const [currentTip, setCurrentTip] = useState(0);
  
  // Sample user data - this would come from props or context in real app
  const userData = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Project Lead",
    joinDate: "March 2024",
    stats: {
      projects: 47,
      reports: 12
    },
    subscriptions: {
      marketiq: true,
      improveiq: true
    }
  };

  const productivityTips = [
    "The best way to get started is to quit talking and begin doing. But first, make sure you're doing the right thing – otherwise you'll efficiently accomplish nothing!",
    "Time management is really about energy management. Schedule your most important work when your brain is at its peak – usually not after your third coffee!",
    "The secret to productivity isn't working harder, it's working smarter. And sometimes 'smarter' means taking that nap you've been avoiding.",
    "Multitasking is like trying to read a book while watching TV – you'll finish neither well. Focus on one thing at a time, your future self will thank you.",
    "Perfectionism is just procrastination wearing a fancy suit. Done is better than perfect, especially when perfect never ships.",
    "The two-minute rule: If it takes less than two minutes, do it now. If it takes longer, add it to your list and do it when you're not in a meeting about meetings."
  ];

  const refreshTip = () => {
    setCurrentTip((prev) => (prev + 1) % productivityTips.length);
  };

  const handleNavigation = (path) => {
    // Navigate to the specified path
    window.location.href = path;
  };

  return (
    <div className={styles.profileContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.navBrand}>
            <h1>SaaS Platform</h1>
          </div>
          <nav className={styles.headerNav}>
            <a href="#" className={styles.navLink}>Settings</a>
            <div className={styles.profileIcon}>
              <i className="fas fa-user"></i>
            </div>
          </nav>
        </div>
      </header>

      <div className={styles.mainLayout}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            {/* Profile Info */}
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                <i className="fas fa-user"></i>
              </div>
              <div className={styles.profileDetails}>
                <h3 className={styles.profileName}>{userData.name}</h3>
                <p className={styles.profileEmail}>{userData.email}</p>
                <span className={styles.profileRole}>{userData.role}</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className={styles.sidebarNav}>
              <h4 className={styles.navTitle}>Suites</h4>
              
              {/* MarketIQ */}
              <button 
                className={`${styles.navItem} ${userData.subscriptions.marketiq ? styles.active : styles.disabled}`}
                onClick={() => userData.subscriptions.marketiq && handleNavigation('/dashboard')}
                disabled={!userData.subscriptions.marketiq}
              >
                <i className="fas fa-chart-line"></i>
                <span className={styles.navText}>MarketIQ</span>
                <span className={styles.navSubtext}>Business Analysis</span>
                {!userData.subscriptions.marketiq && <i className="fas fa-lock"></i>}
              </button>

              {/* ImproveIQ */}
              <button 
                className={`${styles.navItem} ${userData.subscriptions.improveiq ? styles.active : styles.disabled}`}
                onClick={() => userData.subscriptions.improveiq && handleNavigation('/ops/lss')}
                disabled={!userData.subscriptions.improveiq}
              >
                <i className="fas fa-cogs"></i>
                <span className={styles.navText}>ImproveIQ</span>
                <span className={styles.navSubtext}>Lean Six Sigma</span>
                {!userData.subscriptions.improveiq && <i className="fas fa-lock"></i>}
              </button>
            </nav>

            {/* User Stats */}
            <div className={styles.userStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{userData.stats.projects}</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{userData.stats.reports}</span>
                <span className={styles.statLabel}>Reports</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.contentArea}>
            {/* Welcome Section */}
            <section className={styles.welcomeSection}>
              <h2>Welcome back, {userData.name.split(' ')[0]}!</h2>
              <p>Choose a suite from the sidebar to get started with your analysis tools.</p>
            </section>

            {/* Productivity Tip Section */}
            <section className={styles.tipSection}>
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className={styles.tipContent}>
                  <h4>Daily Productivity Tip</h4>
                  <p>{productivityTips[currentTip]}</p>
                </div>
                <button className={styles.tipRefresh} onClick={refreshTip}>
                  <i className="fas fa-sync-alt"></i>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;

