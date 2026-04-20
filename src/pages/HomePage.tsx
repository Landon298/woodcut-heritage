import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Users, Award } from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';

const HomePage = () => {
  const { works, isLoggedIn } = useDatabase();
  const navigate = useNavigate();

  const categories = [
    {
      icon: '🦄',
      title: '山海经异兽系列',
      description: '《山海经》记载的神话生物系列，传承千年的神异怪兽木刻版画',
      count: works.filter(w => w.series === '山海经异兽系列').length
    },
    {
      icon: '🔥',
      title: '原创热门IP系列',
      description: '以黑悟空、哪吒、《山海经》异兽等热门神话IP为核心的原创木刻场景版画',
      count: works.filter(w => w.series === '原创热门IP系列').length
    },
    {
      icon: '🎭',
      title: '传统木版年画',
      description: '传承千年的朱仙镇木版年画，包括门神、吉祥图案、戏曲人物等经典题材',
      count: works.filter(w => w.series === '传统木版年画').length
    },
    {
      icon: '⚔️',
      title: '历史人物场景',
      description: '以中华历史人物和经典战役为题材的木刻版画作品',
      count: works.filter(w => w.series === '历史人物场景').length
    }
  ];

  const featuredWorks = works.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-800/50 rounded-full mb-6">
              <span className="text-amber-200 text-sm">国家级非遗传承</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              华夏神谱 · 版印千年
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-4">
              传承千年非遗技艺 · 木刻版画数字博物馆
            </p>
            <p className="text-lg text-amber-200 max-w-3xl mx-auto mb-8">
              以青年学子之力，守护雕版文脉。以传统木刻版画工艺，演绎黑悟空、哪吒、山海经异兽等热门神话IP，让非遗技艺在新时代焕发新生。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/database"
                className="px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all flex items-center"
              >
                探索作品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-transparent border-2 border-amber-300 text-amber-100 rounded-full hover:bg-amber-800/50 transition-all"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-300">{works.length}+</div>
              <div className="text-amber-200 mt-2">馆藏作品</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-300">{categories.length}</div>
              <div className="text-amber-200 mt-2">原创IP系列</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-300">86</div>
              <div className="text-amber-200 mt-2">版画产地</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-300">国家级</div>
              <div className="text-amber-200 mt-2">非遗项目</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">作品分类</h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              涵盖原创IP系列、山海经异兽系列、传统木版年画、历史人物场景四大板块，传承与创新并重
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/database?series=${encodeURIComponent(category.title)}`}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-amber-100"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{category.title}</h3>
                <p className="text-amber-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center text-amber-500">
                  <span className="text-sm">{category.count} 件作品</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">精选作品</h2>
              <p className="text-amber-600">探索来自全国各地的传统木刻版画作品，感受千年匠心</p>
            </div>
            <Link
              to="/database"
              className="hidden md:flex items-center text-amber-600 hover:text-amber-800 transition-colors"
            >
              查看全部
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <Link
                key={work.id}
                to={`/work/${work.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-amber-500/90 text-white text-sm rounded-full">
                      {work.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{work.rating}</span>
                      <span className="mx-2">·</span>
                      <span>{work.dynasty}</span>
                      <span className="mx-2">·</span>
                      <span>{work.origin}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-1">{work.title}</h3>
                  <p className="text-amber-600 text-sm mb-3">{work.titleEn}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{work.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/database"
              className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors"
            >
              查看全部作品
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">关于"承印千年"</h2>
              <p className="text-lg text-amber-700 mb-6">
                "承印千年"项目始于黄淮学院学生的一次开封之旅。在古都开封的街巷中，我们与传承千年的非遗木刻版画不期而遇，那一眼的惊艳与触动，开启了我们的非遗传承之路。
              </p>
              <p className="text-lg text-amber-700 mb-8">
                我们以青年学子的视角，以同窗之力，开展非遗木刻版画的系统性研究与推广。希望以调研为基础，以创作为羽翼，以青春为力量，让沉睡千年的雕版文脉，走出深巷、走进当代。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-amber-600 mr-3" />
                  <div>
                    <div className="font-bold text-amber-900">国家级非遗项目</div>
                    <div className="text-sm text-amber-600">官方认定</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-amber-600 mr-3" />
                  <div>
                    <div className="font-bold text-amber-900">青年传承力量</div>
                    <div className="text-sm text-amber-600">新生代力量</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="w-8 h-8 text-amber-600 mr-3" />
                  <div>
                    <div className="font-bold text-amber-900">千年雕版文脉</div>
                    <div className="text-sm text-amber-600">历史传承</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-amber-600 mr-3" />
                  <div>
                    <div className="font-bold text-amber-900">创新当代表达</div>
                    <div className="text-sm text-amber-600">现代诠释</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-amber-200 rounded-2xl p-8 text-center">
                <span className="text-8xl">🦌</span>
                <h3 className="text-2xl font-bold text-amber-900 mt-4">小鹿工匠</h3>
                <p className="text-amber-700">非遗传承大使</p>
                <p className="text-amber-600 mt-2">以数字科技传承千年木刻艺术</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">加入我们</h2>
          <p className="text-xl text-amber-100 mb-8">
            注册成为会员，上传您的作品，与其他木刻版画爱好者交流互动
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all"
                >
                  立即注册
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent border-2 border-amber-300 text-amber-100 rounded-full hover:bg-amber-800/50 transition-all"
                >
                  已有账号？登录
                </Link>
              </>
            ) : (
              <Link
                to="/upload"
                className="px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all"
              >
                上传您的作品
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
