import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, User } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: '邮箱',
      value: '1702078331@qq.com'
    },
    {
      icon: Phone,
      title: '电话',
      value: '400-XXX-XXXX',
      subValue: '工作日 9:00-18:00'
    },
    {
      icon: MapPin,
      title: '地址',
      value: '河南省驻马店市驿城区',
      subValue: '金河街道开源办事处开源大道76号'
    },
    {
      icon: MessageCircle,
      title: '微信公众号',
      value: '承印千年',
      subValue: '关注获取最新资讯'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-900 via-orange-800 to-amber-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            无论您是对木刻版画感兴趣，还是希望合作交流，我们都期待与您联系
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-8">联系方式</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <method.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900">{method.title}</h3>
                      <p className="text-lg text-amber-700">{method.value}</p>
                      <p className="text-sm text-amber-500">{method.subValue}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="mt-8 p-6 bg-amber-100 rounded-2xl">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="font-semibold text-amber-900">工作时间</h3>
                </div>
                <p className="text-amber-700">周一至周五: 9:00 - 18:00</p>
                <p className="text-amber-700">周六至周日: 10:00 - 17:00</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-8">发送消息</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">消息已发送！</h3>
                  <p className="text-amber-600">感谢您的留言，我们会尽快回复您</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      您的姓名
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      placeholder="请输入您的姓名"
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
                      主题
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                      placeholder="请输入消息主题"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      留言内容
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none"
                      placeholder="请输入您的留言内容..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    发送消息
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="bg-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">我们的位置</h2>
          <p className="text-amber-700 mb-8">河南省驻马店市驿城区金河街道开源办事处开源大道76号</p>
          <div className="bg-amber-200 rounded-2xl h-64 flex items-center justify-center">
            <p className="text-amber-600">地图展示区域</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
