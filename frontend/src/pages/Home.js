import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { itemAPI } from '../services/api';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    itemAPI
      .getAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="center error">{error}</p>;

  return (
    <div className="container">
      <div className="grid">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {items.length === 0 && <p className="center">No items yet.</p>}
    </div>
  );
}

export default Home;
