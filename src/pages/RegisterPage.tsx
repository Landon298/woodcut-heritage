import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';

const RegisterPage = () => {
  const { register } = useDatabase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6个字符');
      return;
    }

    setLoading(true);

    try {
      const success = await register(formData.username, formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('该邮箱已被注册');
      }
    } catch (err) {
      setError('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center">
            <span className="text-5xl mr-3">木</span>
            <div className="text-left">
              <span className="text-2xl font-bold text-amber-900">承印千年</span>
              <span className="block text-sm text-amber-600">木刻版画数据库</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-amber-900 text-center mb-2">创建账号</h1>
          <p className="text-amber-600 text-center mb-8">加入我们，开始您的木刻版画探索之旅</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                用户名
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="请设置您的用户名"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                邮箱地址
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="请设置密码（至少6个字符）"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                确认密码
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="请再次输入密码"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 text-amber-500 border-amber-300 rounded focus:ring-amber-400"
              />
              <span className="ml-2 text-sm text-amber-600">
                我已阅读并同意{' '}
                <a href="#" className="text-amber-700 hover:underline">用户协议</a>
                {' '}和{' '}
                <a href="#" className="text-amber-700 hover:underline">隐私政策</a>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-amber-600">
              已有账号？
              <Link to="/login" className="text-amber-700 font-semibold hover:text-amber-800 ml-1">
                立即登录
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-amber-600 text-sm mt-8">
          注册即表示您同意我们的用户协议和隐私政策
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
