import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { itemAPI } from '../services/api';

const ITEMS_PER_PAGE = 6;

function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    itemAPI
      .getAll()
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="center error">{error}</p>;

  const filtered = category
    ? items.filter(
        (item) => item.category?.name?.toLowerCase() === category.toLowerCase()
      )
    : items;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container home-page">
      {category && <h2 className="category-title">{category}</h2>}

      <div className="news-grid">
        {currentItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="center">No items in this category yet.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
