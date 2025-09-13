import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  FileText, 
  Brain, 
  Clock, 
  Target, 
  Download, 
  Copy, 
  Link, 
  Zap,
  BookOpen,
  TrendingUp,
  Hash
} from 'lucide-react';

export function SummarizeArticles() {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryStyle, setSummaryStyle] = useState('balanced');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('text');

  const mockSummarize = async (content) => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const summaryRatio = summaryLength === 'short' ? 0.2 : summaryLength === 'medium' ? 0.4 : 0.6;
    const summaryLength_sentences = Math.max(1, Math.floor(sentences.length * summaryRatio));
    
    // Mock intelligent summarization
    const summary = sentences
      .slice(0, summaryLength_sentences)
      .join('. ') + '.';
    
    const keyPoints = [
      'Main argument or thesis of the article',
      'Supporting evidence and key statistics',
      'Expert opinions and quotes mentioned',
      'Conclusion and implications discussed'
    ].slice(0, Math.min(4, Math.ceil(sentences.length / 3)));

    return {
      original: content,
      summary: summary || 'Summary could not be generated for this content.',
      keyPoints,
      readingTime: Math.ceil(content.split(' ').length / 200), // ~200 WPM
      compressionRatio: Math.round((1 - summary.length / content.length) * 100),
      sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
      topics: ['Technology', 'Politics', 'Economy', 'Science', 'Health'].slice(0, Math.floor(Math.random() * 3) + 1),
      entities: ['Organization Alpha', 'City Beta', 'Person Gamma', 'Company Delta'].slice(0, Math.floor(Math.random() * 4) + 1)
    };
  };

  const handleSummarize = async () => {
    const content = activeTab === 'text' ? inputText : inputUrl;
    if (!content.trim()) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const summaryResult = await mockSummarize(content);
      setResult(summaryResult);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900/20 via-green-900/10 to-teal-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-emerald-400/20 rounded-full animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Flowing data streams */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-data-flow"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-data-flow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <FileText className="w-10 h-10 text-emerald-400 animate-float" />
              <div className="absolute inset-0 w-10 h-10 bg-emerald-400/20 rounded-full animate-pulse-ring"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              📝 AI Article Summarizer
            </h1>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 px-4 py-2 animate-bounce">
              🤖 AI-Powered
            </Badge>
          </div>
          <p className="text-white/70 text-lg mb-4">Transform lengthy articles into concise, intelligent summaries</p>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Instant Processing</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-sm">Smart Compression</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm">Key Insights</span>
            </div>
          </div>
        </div>

        {/* Enhanced Input Section */}
        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="relative">
                <Brain className="w-7 h-7 text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 w-7 h-7 bg-emerald-400/20 rounded-full animate-scanner-sweep"></div>
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent text-xl">
                🧠 Intelligent Summarization Engine
              </span>
            </CardTitle>
            <CardDescription className="text-emerald-100/80 text-base">
              ⚡ Transform lengthy content into precise, actionable summaries with advanced AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Text Input
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                URL Input
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4 space-y-4">
              <Textarea
                placeholder="Paste the article or content you want to summarize..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </TabsContent>

            <TabsContent value="url" className="mt-4 space-y-4">
              <Input
                placeholder="https://example.com/article"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          {/* Summarization Options */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2">Summary Length</label>
              <Select value={summaryLength} onValueChange={setSummaryLength}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (20% of original)</SelectItem>
                  <SelectItem value="medium">Medium (40% of original)</SelectItem>
                  <SelectItem value="long">Long (60% of original)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Summary Style</label>
              <Select value={summaryStyle} onValueChange={setSummaryStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="factual">Factual Focus</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                  <SelectItem value="simplified">Simplified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSummarize} 
            disabled={(!inputText.trim() && !inputUrl.trim()) || isProcessing}
            className="w-full mt-4"
          >
            {isProcessing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>AI Processing Content</span>
              </div>
              <Progress value={75} className="w-full" />
              <div className="text-sm text-muted-foreground">
                Analyzing content structure and extracting key information...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-lg font-medium">{result.readingTime}min</div>
                    <div className="text-sm text-muted-foreground">Reading Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="text-lg font-medium">{result.compressionRatio}%</div>
                    <div className="text-sm text-muted-foreground">Compressed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="text-lg font-medium">{result.original.split(' ').length}</div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <div>
                    <Badge className={getSentimentColor(result.sentiment)} variant="secondary">
                      {result.sentiment}
                    </Badge>
                    <div className="text-sm text-muted-foreground">Sentiment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Summary
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(result.summary)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-foreground leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Topics & Entities */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Entities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.entities.map((entity, index) => (
                    <Badge key={index} variant="outline">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}