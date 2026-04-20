import { Link } from 'react-router-dom';
import { User, Calendar, Upload, MessageSquare, Star, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';

const UserDashboardPage = () => {
  const { user, isLoggedIn, logout, getUserWorks } = useDatabase();
  const navigate = useNavigate();
  const userWorks = getUserWorks();

  // Calculate stats
  const totalComments = userWorks.reduce((acc, work) => acc + work.comments.length, 0);
  const avgRating = userWorks.length > 0
    ? (userWorks.reduce((acc, work) => acc + work.rating, 0) / userWorks.length).toFixed(1)
    : '0.0';

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">请先登录</h2>
          <Link to="/login" className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600">
            登录
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
              alt={user.username}
              className="w-24 h-24 rounded-full border-4 border-amber-400"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
              <p className="text-amber-200 mb-2">{user.email}</p>
              <div className="flex items-center text-amber-300 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                加入时间: {user.joinedDate}
              </div>
            </div>
            <div className="md:ml-auto flex gap-3">
              <Link
                to="/upload"
                className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                上传作品
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-amber-800/50 text-amber-200 rounded-full hover:bg-amber-700 flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                退出
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
                <Upload className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-900">{userWorks.length}</div>
              <div className="text-amber-600 text-sm">我的作品</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-900">{totalComments}</div>
              <div className="text-amber-600 text-sm">收到的评论</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-900">{avgRating}</div>
              <div className="text-amber-600 text-sm">平均评分</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
                <User className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-amber-900">1</div>
              <div className="text-amber-600 text-sm">我的等级</div>
            </div>
          </div>
        </div>
      </section>

      {/* My Works */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-amber-900">我的作品</h2>
            <Link
              to="/upload"
              className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 flex items-center text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              上传新作品
            </Link>
          </div>

          {userWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userWorks.map((work) => (
                <Link
                  key={work.id}
                  to={`/work/${work.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                    {work.isUserUpload && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-green-500/90 text-white text-xs rounded-full">
                          用户上传
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-amber-900 mb-1">{work.title}</h3>
                    <p className="text-amber-600 text-sm mb-3">{work.titleEn}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{work.rating}</span>
                        <span className="mx-1">·</span>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{work.comments.length}</span>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                        {work.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Upload className="w-16 h-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">还没有上传作品</h3>
              <p className="text-amber-600 mb-6">上传您的第一件木刻版画作品，开始您的收藏之旅</p>
              <Link
                to="/upload"
                className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                上传作品
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recent Comments */}
      {userWorks.some(w => w.comments.length > 0) && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-8">最新收到的评论</h2>
            <div className="space-y-4">
              {userWorks
                .filter(w => w.comments.length > 0)
                .flatMap(w => w.comments.map(c => ({ ...c, work: w })))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((comment) => (
                  <Link
                    key={comment.id}
                    to={`/work/${comment.work.id}`}
                    className="flex items-start p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                  >
                    <img
                      src={comment.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${comment.userName}`}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-amber-900">{comment.userName}</span>
                        <span className="text-sm text-amber-500">{comment.date}</span>
                      </div>
                      <p className="text-amber-700 text-sm mb-2">评论了《{comment.work.title}》</p>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDashboardPage;
