import { Link, useSearchParams } from 'react-router-dom';

const subLinks = ['Home', 'Tech', 'Reviews', 'Tutorials', 'Gaming'];

function SubNavbar() {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const getLink = (name) => {
    if (name === 'Home') return '/';
    return `/?category=${name}`;
  };

  const isActive = (name) => {
    if (name === 'Home') return !activeCategory;
    return activeCategory.toLowerCase() === name.toLowerCase();
  };

  return (
    <div className="sub-navbar">
      <div className="container sub-nav-inner">
        {subLinks.map((name) => (
          <Link
            key={name}
            to={getLink(name)}
            className={isActive(name) ? 'sub-link active' : 'sub-link'}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubNavbar;
