import { Link } from 'react-router-dom';
import { fixImageUrl } from '../utils/imageHelper';

function PostedBy({ user }) {
  if (!user) return null;

  const imageUrl = fixImageUrl(user.image);

  return (
    <Link to={`/profile/${user._id}`} className="posted-by">
      <div className="poster-avatar">
        {imageUrl ? (
          <img src={imageUrl} alt={user.name} />
        ) : (
          <span>{user.name?.[0]?.toUpperCase() || 'A'}</span>
        )}
      </div>
      <div className="poster-info">
        <p className="poster-name">{user.name || 'Admin'}</p>
        {user.designation && <p className="poster-role">{user.designation}</p>}
      </div>
      <span className="poster-arrow">&rarr;</span>
    </Link>
  );
}

export default PostedBy;
