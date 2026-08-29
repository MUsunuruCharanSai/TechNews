import { useState } from 'react';

function ShareButton({ title, url }) {
  const [message, setMessage] = useState('');

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // user cancelled or share failed
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setMessage('Link copied!');
      setTimeout(() => setMessage(''), 2000);
    } catch {
      setMessage('Could not copy link');
    }
  };

  return (
    <div className="share-box">
      <button type="button" className="share-btn" onClick={handleShare}>
        Share
      </button>
      {message && <span className="share-msg">{message}</span>}
    </div>
  );
}

export default ShareButton;
