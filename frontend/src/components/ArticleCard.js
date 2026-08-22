function ArticleCard({ article }) {
  const date = new Date(article.createdAt).toLocaleDateString();

  return (
    <article className="card">
      <span className="badge">{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.content.slice(0, 120)}...</p>
      <div className="card-footer">
        <span>{article.author}</span>
        <span>{date}</span>
      </div>
    </article>
  );
}

export default ArticleCard;
