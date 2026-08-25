import { Link } from 'react-router-dom';
import { fixImageUrl } from '../utils/imageHelper';

function ItemCard({ item }) {
  const imageUrl = fixImageUrl(item.mainImage);
  const author = item.postedBy?.name || 'Admin';

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link to={`/item/${item._id}`} className="news-card">
      <div className="news-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={item.name} loading="lazy" />
        ) : (
          <div className="news-card-no-img">No Image</div>
        )}
        <span className="news-card-badge">{item.category?.name || 'General'}</span>
      </div>

      <div className="news-card-body">
        <h3>{item.name}</h3>
        <p className="news-card-desc">{item.description}</p>
        <div className="news-card-meta">
          <span>
            BY <strong>{author.toUpperCase()}</strong>
          </span>
          <span className="news-card-date">&#128339; {date.toUpperCase()}</span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
