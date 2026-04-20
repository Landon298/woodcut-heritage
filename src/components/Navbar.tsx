import { Link, useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import { useState } from 'react';
import { Search, Menu, X, User, LogOut, Upload, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useDatabase();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/database?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">木</span>
            <div>
              <span className="text-xl font-bold text-white">承印千年</span>
              <span className="block text-xs text-amber-200">木刻版画数据库</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-amber-100 hover:text-white transition-colors">首页</Link>
            <Link to="/database" className="text-amber-100 hover:text-white transition-colors">数据库</Link>
            <Link to="/about" className="text-amber-100 hover:text-white transition-colors">关于项目</Link>
            <Link to="/contact" className="text-amber-100 hover:text-white transition-colors">联系我们</Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索作品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-2 pl-10 bg-amber-800/50 border border-amber-600 rounded-full text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300" />
            </div>
          </form>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-amber-100 hover:text-white transition-colors"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-amber-400"
                  />
                  <span>{user.username}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-amber-50"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      我的作品
                    </Link>
                    <Link
                      to="/upload"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-amber-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      上传作品
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-amber-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-amber-100 hover:text-white transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-900 border-t border-amber-800">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索作品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-amber-800/50 border border-amber-600 rounded-full text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-300" />
              </div>
            </form>
            <Link to="/" className="block py-2 text-amber-100 hover:text-white">首页</Link>
            <Link to="/database" className="block py-2 text-amber-100 hover:text-white">数据库</Link>
            <Link to="/about" className="block py-2 text-amber-100 hover:text-white">关于项目</Link>
            <Link to="/contact" className="block py-2 text-amber-100 hover:text-white">联系我们</Link>
            {isLoggedIn && user ? (
              <>
                <Link to="/dashboard" className="block py-2 text-amber-100 hover:text-white">我的作品</Link>
                <Link to="/upload" className="block py-2 text-amber-100 hover:text-white">上传作品</Link>
                <button onClick={handleLogout} className="block py-2 text-amber-100 hover:text-white w-full text-left">
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-amber-100 hover:text-white">登录</Link>
                <Link to="/register" className="block py-2 text-amber-100 hover:text-white">注册</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
