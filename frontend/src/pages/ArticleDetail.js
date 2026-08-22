import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articleAPI } from '../services/api';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    articleAPI
      .getOne(id)
      .then(setArticle)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="center error">{error}</p>;
  if (!article) return null;

  const date = new Date(article.createdAt).toLocaleDateString();

  return (
    <div className="container article-page">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>
      <span className="badge">{article.category}</span>
      <h1>{article.title}</h1>
      <p className="meta">
        {article.author} &middot; {date}
      </p>
      <div className="article-body">{article.content}</div>
    </div>
  );
}

export default ArticleDetail;
