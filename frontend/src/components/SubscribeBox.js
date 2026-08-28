import { useState } from 'react';
import { subscribeAPI } from '../services/api';

function SubscribeBox() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await subscribeAPI.subscribe(email);
      setMessage(res.message);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscribe-box">
      <div className="subscribe-heading">
        <span className="subscribe-dot"></span>
        <h3>Subscribe to Email Updates</h3>
      </div>
      <p>Subscribe to receive daily updates direct to your inbox!</p>

      {message && <p className="subscribe-success">{message}</p>}
      {error && <p className="subscribe-error">{error}</p>}

      <form onSubmit={handleSubmit} className="subscribe-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

export default SubscribeBox;
