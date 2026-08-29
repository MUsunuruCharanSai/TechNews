import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import ItemDetail from './pages/ItemDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MouseFollower />
        <Navbar />
        <SubNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/profile/:id" element={<AdminProfile />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
