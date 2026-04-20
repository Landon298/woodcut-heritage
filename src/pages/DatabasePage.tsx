import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, ChevronDown } from 'lucide-react';
import { useDatabase, WoodcutWork } from '../contexts/DatabaseContext';

const DatabasePage = () => {
  const { searchWorks, works } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedWorks, setDisplayedWorks] = useState<WoodcutWork[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [selectedSeries, setSelectedSeries] = useState(searchParams.get('series') || '全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedDynasty, setSelectedDynasty] = useState('全部');
  const [selectedOrigin, setSelectedOrigin] = useState('全部');

  // Get unique values for filters
  const seriesOptions = ['全部', ...new Set(works.map(w => w.series))];
  const categoryOptions = ['全部', ...new Set(works.map(w => w.category))];
  const dynastyOptions = ['全部', ...new Set(works.map(w => w.dynasty))];
  const originOptions = ['全部', ...new Set(works.map(w => w.origin))];

  useEffect(() => {
    const filtered = searchWorks(searchQuery, {
      series: selectedSeries,
      category: selectedCategory,
      dynasty: selectedDynasty,
      origin: selectedOrigin
    });
    setDisplayedWorks(filtered);
  }, [searchQuery, selectedSeries, selectedCategory, selectedDynasty, selectedOrigin, works]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSelectedSeries('全部');
    setSelectedCategory('全部');
    setSelectedDynasty('全部');
    setSelectedOrigin('全部');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">版画数据库</h1>
          <p className="text-xl text-amber-100 mb-8">
            探索来自全国各地的传统木刻版画作品，感受千年匠心
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索作品名称、描述或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/10 border border-amber-400/50 rounded-full text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300" />
            </div>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-amber-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  筛选
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-800"
                >
                  清除筛选
                </button>
              </div>

              {/* Series Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-800 mb-2">系列</label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-amber-200 rounded-lg text-amber-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  {seriesOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-800 mb-2">类别</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-amber-200 rounded-lg text-amber-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  {categoryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Dynasty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-800 mb-2">年代</label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-amber-200 rounded-lg text-amber-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  {dynastyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Origin Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-amber-800 mb-2">产地</label>
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-amber-200 rounded-lg text-amber-900 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 appearance-none bg-white cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d97706'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  {originOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Works Grid/List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-amber-700">
                共找到 <span className="font-bold text-amber-900">{displayedWorks.length}</span> 件作品
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Works Display */}
            {displayedWorks.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedWorks.map((work) => (
                    <Link
                      key={work.id}
                      to={`/work/${work.id}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-100"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-amber-500/90 text-white text-xs rounded-full">
                            {work.category}
                          </span>
                        </div>
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
                        <div className="flex items-center text-sm text-amber-500 mb-3">
                          <span>{work.dynasty}</span>
                          <span className="mx-2">·</span>
                          <span>{work.origin}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-amber-900">{work.rating}</span>
                            <span className="text-amber-400 text-sm ml-1">({work.reviewCount})</span>
                          </div>
                          <span className="text-amber-500 text-sm">{work.series}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedWorks.map((work) => (
                    <Link
                      key={work.id}
                      to={`/work/${work.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-amber-100 flex"
                    >
                      <div className="w-48 h-40 relative flex-shrink-0">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-1">{work.title}</h3>
                            <p className="text-amber-600 text-sm mb-2">{work.titleEn}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                            {work.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{work.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-amber-500">
                            <span>{work.dynasty}</span>
                            <span className="mx-2">·</span>
                            <span>{work.origin}</span>
                            <span className="mx-2">·</span>
                            <span>{work.series}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-amber-900">{work.rating}</span>
                            <span className="text-amber-400 text-sm ml-1">({work.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <p className="text-amber-600 text-lg mb-4">未找到匹配的作品</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabasePage;
