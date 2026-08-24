import { useEffect, useState } from 'react';
import { commentAPI } from '../services/api';

function Comments({ itemId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadComments = () => {
    commentAPI
      .getByItem(itemId)
      .then(setComments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadComments();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await commentAPI.create({ item: itemId, name, text });
      setName('');
      setText('');
      loadComments();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="comments-section">
      <h2>Comments ({comments.length})</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="3"
          required
        />
        <button type="submit">Post Comment</button>
      </form>

      {loading ? (
        <p className="empty-text">Loading comments...</p>
      ) : (
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-top">
                <strong>{comment.name}</strong>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="empty-text">No comments yet. Be the first!</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Comments;
