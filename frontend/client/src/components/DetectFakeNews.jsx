import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './components/ui/button.jsx';
import { Input } from './components/ui/input.js';
import { Textarea } from './components/ui/textarea.js';
import { Badge } from './components/ui/badge.jsx';
import { Progress } from './components/ui/progress.js';
import { Alert, AlertDescription } from './components/ui/alert.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs.jsx';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Brain, 
  Search, 
  Link, 
  TrendingUp,
  Users,
  Clock,
  Target
} from 'lucide-react';

export function DetectFakeNews() {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('text');

  const mockAnalyze = async (content) => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis based on content characteristics
    const hasControversialKeywords = /breaking|urgent|shocking|exclusive|unbelievable/i.test(content);
    const hasCrediblePattern = /according to|research shows|study finds|experts say/i.test(content);
    const contentLength = content.length;
    
    const baseScore = hasCrediblePattern ? 75 : hasControversialKeywords ? 35 : 60;
    const lengthBonus = Math.min(contentLength / 50, 20); // Longer content tends to be more credible
    const finalScore = Math.min(Math.max(baseScore + lengthBonus + Math.random() * 20 - 10, 0), 100);
    
    return {
      isCredible: finalScore > 60,
      confidenceScore: Math.round(finalScore),
      riskLevel: finalScore > 70 ? 'low' : finalScore > 40 ? 'medium' : 'high',
      factors: {
        sourceCredibility: Math.round(finalScore * 0.9 + Math.random() * 10),
        contentConsistency: Math.round(finalScore * 1.1 + Math.random() * 10),
        factChecking: Math.round(finalScore * 0.8 + Math.random() * 15),
        biasDetection: Math.round(finalScore * 0.95 + Math.random() * 10),
        sentimentAnalysis: Math.round(finalScore * 1.05 + Math.random() * 8)
      },
      warnings: finalScore < 60 ? [
        'Emotional language detected',
        'Limited source verification',
        hasControversialKeywords ? 'Sensationalized headlines' : 'Inconsistent claims'
      ] : finalScore < 80 ? [
        'Minor inconsistencies found'
      ] : [],
      sources: ['Reuters', 'Associated Press', 'BBC News', 'Nature Journal'],
      relatedArticles: Math.floor(Math.random() * 50) + 10
    };
  };

  const handleAnalyze = async () => {
    const content = activeTab === 'text' ? inputText : inputUrl;
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysisResult = await mockAnalyze(content);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'high': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-red-500" />
        <h1>Detect Fake News</h1>
        <Badge variant="secondary">AI-Powered</Badge>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI News Analysis
          </CardTitle>
          <CardDescription>
            Upload text or URL for comprehensive fake news detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Text Analysis
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                URL Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste the news article or claim you want to verify..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!inputText.trim() || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Analyze Text
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <div className="space-y-4">
                <Input
                  placeholder="https://example.com/news-article"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!inputUrl.trim() || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 mr-2" />
                      Analyze URL
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>AI Analysis in Progress</span>
              </div>
              <Progress value={66} className="w-full" />
              <div className="text-sm text-muted-foreground">
                Processing content through multiple verification layers...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getRiskIcon(result.riskLevel)}
                  <span className="text-lg">Credibility Assessment</span>
                </div>
                <Badge 
                  className={`${getScoreBg(result.confidenceScore)} ${getScoreColor(result.confidenceScore)}`}
                >
                  {result.confidenceScore}% Confidence
                </Badge>
              </div>

              <div className="text-center mb-6">
                <div className={`text-4xl font-bold ${getScoreColor(result.confidenceScore)} mb-2`}>
                  {result.isCredible ? 'LIKELY CREDIBLE' : 'POTENTIALLY FAKE'}
                </div>
                <p className="text-muted-foreground">
                  Risk Level: <span className="capitalize font-medium">{result.riskLevel}</span>
                </p>
              </div>

              {result.warnings.length > 0 && (
                <Alert>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Warnings detected:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {result.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis Factors</CardTitle>
              <CardDescription>
                Breakdown of key metrics used in the analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(result.factors).map(([factor, score]) => (
                  <div key={factor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize">
                        {factor.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className={`font-medium ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Source Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Cross-referenced sources</span>
                    <Badge variant="secondary">{result.sources.length}</Badge>
                  </div>
                  <div className="space-y-1">
                    {result.sources.map((source, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {source}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Context Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Related articles found</span>
                    <Badge variant="secondary">{result.relatedArticles}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analysis time</span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      2.3 seconds
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Community reports</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">3 verified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}