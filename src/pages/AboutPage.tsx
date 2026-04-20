import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Sparkles, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">关于"承印千年"</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            以青年学子之力，守护雕版文脉
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">我们的故事</h2>
              <p className="text-lg text-amber-700 mb-4">
                "承印千年"项目始于黄淮学院学生的一次开封之旅。在古都开封的街巷中，我们与传承千年的非遗木刻版画不期而遇，那一眼的惊艳与触动，开启了我们的非遗传承之路。
              </p>
              <p className="text-lg text-amber-700 mb-4">
                我们以青年学子的视角，以同窗之力，开展非遗木刻版画的系统性研究与推广。希望以调研为基础，以创作为羽翼，以青春为力量，让沉睡千年的雕版文脉，走出深巷、走进当代。
              </p>
              <p className="text-lg text-amber-700">
                以传统木刻版画工艺，演绎黑悟空、哪吒、山海经异兽等热门神话IP，让非遗技艺在新时代焕发新生。
              </p>
            </div>
            <div className="bg-amber-200 rounded-2xl p-12 text-center">
              <img src="https://raw.githubusercontent.com/Landon298/my-blog-pic-base/main/木木.png" alt="木木" className="w-32 h-32 mx-auto object-cover rounded-full" />
              <h3 className="text-2xl font-bold text-amber-900 mt-4">木木</h3>
              <p className="text-amber-700">非遗传承大使</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-16">我们的使命</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">国家级非遗项目</h3>
              <p className="text-amber-600">获得官方认可的传统文化传承项目</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">青年传承力量</h3>
              <p className="text-amber-600">以在校学生的视角和热情传承非遗</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">千年雕版文脉</h3>
              <p className="text-amber-600">延续千年历史文化的传统技艺</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">创新当代表达</h3>
              <p className="text-amber-600">用现代语言诠释传统艺术的魅力</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-16">数据库特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Globe className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">高清数字化扫描</h3>
              <p className="text-amber-600">保留原作细节，让传统艺术永久保存</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <BookOpen className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">详尽的作品信息</h3>
              <p className="text-amber-600">提供作品的历史背景与文化内涵</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Heart className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">多维度分类检索</h3>
              <p className="text-amber-600">按系列、产地、年代等多维度浏览</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Sparkles className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-amber-900 mb-2">持续更新扩充</h3>
              <p className="text-amber-600">不断收录新的作品和系列</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-16">合作机构</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-900">中国非遗保护中心</h3>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-900">故宫博物院</h3>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-900">各地年画协会</h3>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-900">黄淮学院</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">开始探索</h2>
          <p className="text-xl text-amber-100 mb-8">
            浏览我们的数据库，发现更多精彩的木刻版画作品
          </p>
          <Link
            to="/database"
            className="inline-block px-8 py-4 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all"
          >
            进入数据库
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
