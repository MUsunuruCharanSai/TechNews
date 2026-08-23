import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemImage from '../components/ItemImage';
import { itemAPI } from '../services/api';
import { cleanImages } from '../utils/imageHelper';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    itemAPI
      .getOne(id)
      .then(setItem)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="center error">{error}</p>;
  if (!item) return null;

  const extraImages = cleanImages(item.additionalImages);

  return (
    <div className="container item-detail">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>

      <ItemImage src={item.mainImage} alt={item.name} boxClass="detail-size" />
      <span className="badge">{item.category?.name}</span>
      <h1>{item.name}</h1>
      <p className="detail-desc">{item.description}</p>

      {extraImages.length > 0 && (
        <div className="extra-images">
          <h3>Additional Images</h3>
          <div className="extra-grid">
            {extraImages.map((img, i) => (
              <ItemImage
                key={i}
                src={img}
                alt={`${item.name} ${i + 1}`}
                boxClass="extra-size"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
