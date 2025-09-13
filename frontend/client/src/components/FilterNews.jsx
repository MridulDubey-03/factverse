import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from "./ui/checkbox";
import { Slider } from './ui/slider';
import { Filter, Search, Calendar, TrendingUp, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const mockArticles = [
  {
    id: '1',
    title: 'Climate Change Summit Reaches Historic Agreement',
    source: 'Reuters',
    category: 'Environment',
    credibilityScore: 95,
    publishedAt: '2024-01-15T10:30:00Z',
    summary: 'World leaders agree on ambitious carbon reduction targets in landmark climate summit.',
    verified: true,
    trending: true
  },
  {
    id: '2',
    title: 'New AI Technology Breakthrough in Medical Diagnosis',
    source: 'Nature',
    category: 'Science',
    credibilityScore: 92,
    publishedAt: '2024-01-14T14:20:00Z',
    summary: 'Researchers develop AI system that can detect diseases with 98% accuracy.',
    verified: true,
    trending: false
  },
  {
    id: '3',
    title: 'Controversial Social Media Policy Changes',
    source: 'TechBlog',
    category: 'Technology',
    credibilityScore: 67,
    publishedAt: '2024-01-13T09:15:00Z',
    summary: 'Platform announces new content moderation policies amid user backlash.',
    verified: false,
    trending: true
  },
  {
    id: '4',
    title: 'Economic Recovery Shows Positive Signs',
    source: 'Financial Times',
    category: 'Economics',
    credibilityScore: 88,
    publishedAt: '2024-01-12T16:45:00Z',
    summary: 'Latest economic indicators suggest steady recovery across major markets.',
    verified: true,
    trending: false
  }
];

export function FilterNews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [credibilityRange, setCredibilityRange] = useState([0]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = ['all', 'Environment', 'Science', 'Technology', 'Economics', 'Politics', 'Health'];
  const sources = ['all', 'Reuters', 'Nature', 'TechBlog', 'Financial Times', 'BBC', 'Associated Press'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSource = selectedSource === 'all' || article.source === selectedSource;
    const matchesCredibility = article.credibilityScore >= credibilityRange[0];
    const matchesVerified = !showVerifiedOnly || article.verified;
    const matchesTrending = !showTrendingOnly || article.trending;

    return matchesSearch && matchesCategory && matchesSource && 
           matchesCredibility && matchesVerified && matchesTrending;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'credibility':
        return b.credibilityScore - a.credibilityScore;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case 'latest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  const getCredibilityColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSource('all');
    setCredibilityRange([0]);
    setShowVerifiedOnly(false);
    setShowTrendingOnly(false);
    setSortBy('latest');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/10 to-indigo-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-6 p-6">
        {/* Dynamic Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Filter className="w-8 h-8 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Smart News Filter
            </h1>
          </div>
          <p className="text-white/70 text-lg mb-4">Discover verified news with intelligent filtering</p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2 animate-pulse">
              {sortedArticles.length} articles found
            </Badge>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Live feed active</span>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="relative">
                <Search className="w-6 h-6 text-cyan-400" />
                {isSearching && (
                  <div className="absolute inset-0 w-6 h-6 border-2 border-cyan-400/50 rounded-full animate-spin"></div>
                )}
              </div>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Advanced Search & Filter
              </span>
            </CardTitle>
            <CardDescription className="text-cyan-100/80">
              🎯 Intelligent filtering with real-time results and AI-powered recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Enhanced Search Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Input
                placeholder="🔍 Search articles by title, content, or keywords..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearching(true);
                  setTimeout(() => setIsSearching(false), 1000);
                }}
                className="relative bg-white/5 border-cyan-400/30 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300 hover:bg-white/10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className={`w-4 h-4 ${searchTerm ? 'text-cyan-400' : 'text-white/40'} transition-colors duration-300`} />
              </div>
            </div>

            {/* Enhanced Filter Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group">
                <label className="block mb-3 text-cyan-200 font-medium flex items-center gap-2">
                  📂 Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/5 border-cyan-400/30 text-white hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-cyan-400/30">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-cyan-500/20">
                        {category === 'all' ? '🌐 All Categories' : `📰 ${category}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="group">
                <label className="block mb-3 text-cyan-200 font-medium flex items-center gap-2">
                  📡 Source
                </label>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger className="bg-white/5 border-cyan-400/30 text-white hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-400">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-cyan-400/30">
                    {sources.map(source => (
                      <SelectItem key={source} value={source} className="text-white hover:bg-cyan-500/20">
                        {source === 'all' ? '🌍 All Sources' : source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="group">
                <label className="block mb-3 text-cyan-200 font-medium flex items-center gap-2">
                  🔄 Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/5 border-cyan-400/30 text-white hover:bg-white/10 transition-all duration-300 group-hover:border-cyan-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-cyan-400/30">
                    <SelectItem value="latest" className="text-white hover:bg-cyan-500/20">⏰ Latest First</SelectItem>
                    <SelectItem value="credibility" className="text-white hover:bg-cyan-500/20">🏆 Highest Credibility</SelectItem>
                    <SelectItem value="trending" className="text-white hover:bg-cyan-500/20">🔥 Trending First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Credibility Slider */}
            <div className="group">
              <label className="block mb-4 text-cyan-200 font-medium flex items-center gap-2">
                🛡️ Minimum Credibility Score: 
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                  {credibilityRange[0]}%
                </span>
              </label>
              <div className="relative">
                <Slider
                  value={credibilityRange}
                  onValueChange={setCredibilityRange}
                  max={100}
                  step={5}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>0% Unverified</span>
                  <span>50% Moderate</span>
                  <span>85% Highly Credible</span>
                  <span>100% Verified</span>
                </div>
              </div>
            </div>

            {/* Enhanced Toggle Options */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-3 group cursor-pointer hover:bg-white/5 rounded-lg p-3 transition-all duration-300">
                <Checkbox
                  id="verified"
                  checked={showVerifiedOnly}
                  onCheckedChange={setShowVerifiedOnly}
                  className="border-emerald-400/50 data-[state=checked]:bg-emerald-500"
                />
                <label htmlFor="verified" className="flex items-center gap-2 text-white cursor-pointer group-hover:text-emerald-300 transition-colors duration-300">
                  <CheckCircle className={`w-5 h-5 ${showVerifiedOnly ? 'text-emerald-400 animate-pulse' : 'text-emerald-500/70'} transition-all duration-300`} />
                  <span className="font-medium">✅ Verified Only</span>
                </label>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer hover:bg-white/5 rounded-lg p-3 transition-all duration-300">
                <Checkbox
                  id="trending"
                  checked={showTrendingOnly}
                  onCheckedChange={setShowTrendingOnly}
                  className="border-orange-400/50 data-[state=checked]:bg-orange-500"
                />
                <label htmlFor="trending" className="flex items-center gap-2 text-white cursor-pointer group-hover:text-orange-300 transition-colors duration-300">
                  <TrendingUp className={`w-5 h-5 ${showTrendingOnly ? 'text-orange-400 animate-bounce' : 'text-orange-500/70'} transition-all duration-300`} />
                  <span className="font-medium">🔥 Trending Only</span>
                </label>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-cyan-400/20">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="bg-white/5 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-cyan-400/20 group-hover:bg-cyan-400/40 transition-colors duration-300"></div>
                  🗑️ Clear All Filters
                </div>
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                🎯 Apply Smart Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Results Section */}
        <div className="space-y-6">
          {sortedArticles.map((article, index) => (
            <Card 
              key={article.id} 
              className="group hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 border-cyan-500/20 bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-xl hover:scale-[1.02] hover:border-cyan-400/40"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(article.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6 relative overflow-hidden">
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 ${hoveredCard === article.id ? 'opacity-100' : ''} transition-opacity duration-500`}></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 hover:bg-cyan-500/30 transition-colors duration-300">
                      📂 {article.category}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-colors duration-300">
                      📡 {article.source}
                    </Badge>
                    {article.verified && (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 animate-pulse hover:bg-emerald-500/30 transition-colors duration-300">
                        <CheckCircle className="w-3 h-3 mr-1 animate-spin" style={{animationDuration: '3s'}} />
                        ✅ Verified
                      </Badge>
                    )}
                    {article.trending && (
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30 animate-bounce hover:bg-orange-500/30 transition-colors duration-300">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        🔥 Trending
                      </Badge>
                    )}
                  </div>
                  <Badge className={`${getCredibilityColor(article.credibilityScore)} font-bold hover:scale-110 transition-transform duration-300`}>
                    <Shield className="w-3 h-3 mr-1" />
                    🛡️ {article.credibilityScore}%
                  </Badge>
                </div>

                <h3 className="mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                  {article.title}
                </h3>
                <p className="text-white/70 mb-4 leading-relaxed group-hover:text-white/90 transition-colors duration-300 relative z-10">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-sm text-white/60 group-hover:text-cyan-300 transition-colors duration-300">
                    <Calendar className="w-4 h-4" />
                    📅 {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/5 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all duration-300"
                  >
                    📖 Read More
                  </Button>
                </div>
            </CardContent>
          </Card>
        ))}

          {sortedArticles.length === 0 && (
            <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5 backdrop-blur-xl">
              <CardContent className="text-center py-16">
                <div className="relative inline-block mb-6">
                  <AlertCircle className="w-16 h-16 text-orange-400 mx-auto animate-bounce" />
                  <div className="absolute inset-0 w-16 h-16 bg-orange-400/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="mb-4 text-white text-xl">🔍 No articles found</h3>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  🎯 Try adjusting your filters or search terms to discover more relevant articles.
                </p>
                <Button 
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  🗑️ Clear Filters & Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}