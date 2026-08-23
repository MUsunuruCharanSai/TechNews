import { Link } from 'react-router-dom';
import ItemImage from './ItemImage';

function ItemCard({ item }) {
  return (
    <article className="item-card">
      <ItemImage src={item.mainImage} alt={item.name} boxClass="card-size" />
      <span className="badge">{item.category?.name}</span>
      <h3>{item.name}</h3>
      <p className="desc-short">{item.description}</p>
      <Link to={`/item/${item._id}`} className="see-more">
        See more
      </Link>
    </article>
  );
}

export default ItemCard;
