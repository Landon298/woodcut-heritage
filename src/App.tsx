import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DatabaseProvider } from './contexts/DatabaseContext';
import HomePage from './pages/HomePage';
import DatabasePage from './pages/DatabasePage';
import WorkDetailPage from './pages/WorkDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import UploadWorkPage from './pages/UploadWorkPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/work/:id" element={<WorkDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/upload" element={<UploadWorkPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DatabaseProvider>
  );
}

export default App;
