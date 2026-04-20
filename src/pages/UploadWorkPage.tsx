import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Image, FileText, Tag, Calendar, MapPin, X, Check, AlertCircle } from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';

const UploadWorkPage = () => {
  const { addWork, isLoggedIn } = useDatabase();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    category: '传统木版年画',
    series: '传统木版年画',
    dynasty: '现代',
    origin: '',
    description: '',
    image: '',
    tags: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = ['传统木版年画', '山海经异兽', '原创热门IP', '历史人物', '门神画', '吉祥图案', '戏曲故事', '福神画', '教化图案', '仕女画'];
  const seriesOptions = ['传统木版年画', '山海经异兽系列', '原创热门IP系列', '历史人物场景'];
  const dynasties = ['现代', '明代', '清代', '民国'];
  const origins = ['河南朱仙镇', '天津杨柳青', '山东潍坊', '四川绵竹', '河北武强', '苏州桃花坞', '山西平阳', '上海旧校场', '承印千年工作室', '其他'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setPreviewUrl(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('请输入作品名称');
      return;
    }

    if (!formData.description.trim()) {
      setError('请输入作品描述');
      return;
    }

    if (!formData.image.trim()) {
      setError('请输入作品图片URL');
      return;
    }

    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

    addWork({
      title: formData.title,
      titleEn: formData.titleEn || formData.title,
      category: formData.category,
      series: formData.series,
      dynasty: formData.dynasty,
      origin: formData.origin || '其他',
      description: formData.description,
      image: formData.image,
      author: '',
      tags
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">请先登录</h2>
          <p className="text-amber-600 mb-6">登录后才能上传作品</p>
          <Link to="/login" className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600">
            登录
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">作品上传成功！</h2>
          <p className="text-amber-600 mb-6">感谢您为承印千年数据库贡献作品</p>
          <p className="text-amber-500">页面即将跳转...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">上传作品</h1>
          <p className="text-amber-200">分享您的木刻版画作品到数据库</p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Preview */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Image className="w-4 h-4 inline mr-2" />
                作品图片预览
              </label>
              <div className="border-2 border-dashed border-amber-200 rounded-xl h-64 flex items-center justify-center bg-amber-50 overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-full object-contain" />
                ) : (
                  <div className="text-center text-amber-400">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p>图片预览区域</p>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  作品名称 *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="例如：麒麟"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  英文名称
                </label>
                <input
                  type="text"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder="例如：Qilin - The Auspicious Beast"
                />
              </div>
            </div>

            {/* Category & Series */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  作品系列 *
                </label>
                <select
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {seriesOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  作品类别 *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {categories.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynasty & Origin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  年代 *
                </label>
                <select
                  name="dynasty"
                  value={formData.dynasty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {dynasties.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  产地 *
                </label>
                <select
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {origins.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Image className="w-4 h-4 inline mr-2" />
                作品图片URL *
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleImageUrlChange}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-2 text-sm text-amber-500">请输入图片的网络链接地址</p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                作品描述 *
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none"
                placeholder="请详细描述这件作品的历史背景、艺术特色、文化意义等..."
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                标签（用逗号分隔）
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="例如：瑞兽, 吉祥, 神兽"
              />
              <p className="mt-2 text-sm text-amber-500">添加标签有助于其他用户更容易找到您的作品</p>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 text-amber-700 hover:text-amber-900"
              >
                取消
              </Link>
              <button
                type="submit"
                className="px-8 py-4 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                上传作品
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadWorkPage;
