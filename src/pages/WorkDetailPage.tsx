import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Calendar, MapPin, User, MessageSquare, Share2, ArrowLeft, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';

const WorkDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getWorkById, addComment, user, isLoggedIn, works } = useDatabase();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const work = getWorkById(id || '');

  // Get all images for the work
  const allImages = work?.images && work.images.length > 0 ? work.images : (work?.image ? [work.image] : []);

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">作品未找到</h2>
          <Link to="/database" className="text-amber-600 hover:text-amber-800">
            返回数据库
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(work.id, comment);
    setComment('');
  };

  const toggleCommentLike = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: work.title,
        text: work.description,
        url: url
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert('链接已复制到剪贴板');
    }
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Get related works
  const relatedWorks = works
    .filter(w => w.id !== work.id && (w.category === work.category || w.series === work.series))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Back Button */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-amber-100 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section with Carousel */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
              <div className="relative">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`${work.title} - 图片 ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[600px] object-contain"
                />

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-amber-900/80 hover:bg-amber-900 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                      aria-label="上一张"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-amber-900/80 hover:bg-amber-900 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                      aria-label="下一张"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-amber-900/80 text-white text-sm rounded-full">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                )}

                {/* User Upload Badge */}
                {work.isUserUpload && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-green-500 text-white text-sm rounded-full">
                      用户上传作品
                    </span>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="p-4 border-t border-amber-100">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-amber-500 ring-2 ring-amber-300'
                            : 'border-amber-200 hover:border-amber-400'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`缩略图 ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Indicators */}
              {allImages.length > 1 && (
                <div className="flex justify-center gap-2 pb-4">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-amber-500 w-6'
                          : 'bg-amber-300 hover:bg-amber-400'
                      }`}
                      aria-label={`跳转到图片 ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                  {work.category}
                </span>
                <span className="px-4 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  {work.series}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">{work.title}</h1>
              <p className="text-xl text-amber-600 mb-6">{work.titleEn}</p>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(work.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-xl font-bold text-amber-900">{work.rating}</span>
                <span className="ml-2 text-amber-500">({work.reviewCount} 评价)</span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{work.description}</p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm text-amber-500">年代</p>
                    <p className="font-semibold text-amber-900">{work.dynasty}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm text-amber-500">产地</p>
                    <p className="font-semibold text-amber-900">{work.origin}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm text-amber-500">作者</p>
                    <p className="font-semibold text-amber-900">{work.author}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-amber-500 mr-3" />
                  <div>
                    <p className="text-sm text-amber-500">评论</p>
                    <p className="font-semibold text-amber-900">{work.comments.length} 条</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {work.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center px-6 py-3 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  分享
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3" />
                评论 ({work.comments.length})
              </h2>

              {/* Comment Form */}
              {isLoggedIn ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username}`}
                      alt={user?.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="发表您的看法..."
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 resize-none"
                        rows={3}
                      />
                      <div className="flex justify-end mt-3">
                        <button
                          type="submit"
                          disabled={!comment.trim()}
                          className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors"
                        >
                          发布评论
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-8 p-6 bg-amber-50 rounded-xl text-center">
                  <p className="text-amber-700 mb-4">登录后才能发表评论</p>
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                  >
                    登录
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {work.comments.length > 0 ? (
                  work.comments.map((c) => (
                    <div key={c.id} className="flex items-start space-x-4 p-4 bg-amber-50 rounded-xl">
                      <img
                        src={c.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${c.userName}`}
                        alt={c.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-semibold text-amber-900">{c.userName}</span>
                            <span className="ml-3 text-sm text-amber-500">{c.date}</span>
                          </div>
                          <button
                            onClick={() => toggleCommentLike(c.id)}
                            className={`flex items-center ${likedComments.has(c.id) ? 'text-red-500' : 'text-amber-400'}`}
                          >
                            <ThumbsUp className={`w-4 h-4 mr-1 ${likedComments.has(c.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm">{c.likes + (likedComments.has(c.id) ? 1 : 0)}</span>
                          </button>
                        </div>
                        <p className="text-gray-700">{c.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-amber-500 py-8">暂无评论，成为第一个评论的人吧！</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Works */}
        {relatedWorks.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-amber-900 mb-8">相关作品</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedWorks.map((relatedWork) => (
                <Link
                  key={relatedWork.id}
                  to={`/work/${relatedWork.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-100"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedWork.image}
                      alt={relatedWork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-amber-900 mb-1">{relatedWork.title}</h3>
                    <p className="text-sm text-amber-500">{relatedWork.dynasty} · {relatedWork.origin}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default WorkDetailPage;
