import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-logo">TechNews</p>
          <p className="footer-text">Latest tech news and updates</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/admin/login">Admin</Link>
        </div>
      </div>
      <p className="footer-copy">&copy; 2026 TechNews. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
