import { Link } from 'react-router-dom';
import SubscribeBox from './SubscribeBox';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-info">
          <p className="footer-logo">TechNews</p>
          <p className="footer-text">Latest tech news and updates</p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
        <SubscribeBox />
      </div>
      <p className="footer-copy">&copy; 2026 TechNews. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
