import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-4xl">木</span>
              <div>
                <h3 className="text-xl font-bold text-white">承印千年</h3>
                <p className="text-sm text-amber-300">木刻版画数据库</p>
              </div>
            </div>
            <p className="text-amber-200 mb-4 max-w-md">
              传承千年木刻艺术，数字化呈现中华传统版画瑰宝。我们致力于中国传统木刻版画的保护、传承与传播工作。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <span className="text-xl">📱</span>
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-amber-200 hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/database" className="text-amber-200 hover:text-white transition-colors">数据库</Link></li>
              <li><Link to="/about" className="text-amber-200 hover:text-white transition-colors">关于项目</Link></li>
              <li><Link to="/contact" className="text-amber-200 hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">作品分类</h4>
            <ul className="space-y-2">
              <li><Link to="/database?series=山海经异兽系列" className="text-amber-200 hover:text-white transition-colors">山海经异兽系列</Link></li>
              <li><Link to="/database?series=原创热门IP系列" className="text-amber-200 hover:text-white transition-colors">原创热门IP系列</Link></li>
              <li><Link to="/database?series=传统木版年画" className="text-amber-200 hover:text-white transition-colors">传统木版年画</Link></li>
              <li><Link to="/database?series=历史人物场景" className="text-amber-200 hover:text-white transition-colors">历史人物场景</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-amber-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>中国·北京 / 河南省驻马店市驿城区</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📧</span>
              <span>1702078331@qq.com</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📞</span>
              <span>400-XXX-XXXX</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300 text-sm">
          <p>© 2024-2026 承印千年工作室 | 黄淮学院 | 国家级非遗传承</p>
          <p className="mt-2">以青年学子之力，传承千年非遗技艺</p>
        </div>

        {/* Credits */}
        <div className="mt-8 pt-8 border-t border-amber-800 text-center text-xs text-amber-400">
          <p>© 2026 MiniMax</p>
          <p className="mt-1">上海稀宇科技有限公司</p>
          <p className="mt-1">沪ICP备2023003282号-38 | 沪公网安备31010402010179号</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
