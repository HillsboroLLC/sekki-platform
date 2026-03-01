import React from 'react';
import './SocialShareButtons.css';

export default function SocialShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank'
    );
  };

  return (
    <div className="social-share">
      <button
        className="share-btn"
        title="Share on Twitter"
        onClick={shareToTwitter}
      >
        <i className="fab fa-twitter" />
      </button>
      <button
        className="share-btn"
        title="Share on LinkedIn"
        onClick={shareToLinkedIn}
      >
        <i className="fab fa-linkedin-in" />
      </button>
    </div>
  );
}
