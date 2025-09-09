import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Ui/Card.jsxd';
import { Button } from './Ui/Button.jsx';
import { Input } from './Ui/input';
import { Badge } from './Ui/badge.jsx';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Shield, 
  BookOpen,
  ExternalLink,
  Clock,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

export function ValidateFacts() {
  const [factClaim, setFactClaim] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState(null);

  const mockValidate = async (claim) => {
    // Simulate fact-checking process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis based on claim characteristics
    const hasNumbers = /\d+/.test(claim);
    const hasSuperlatives = /most|best|worst|largest|smallest|first|last/i.test(claim);
    const isSpecific = claim.length > 50;
    
    // Determine verdict based on characteristics
    let verdict;
    let confidence;
    
    if (hasNumbers && isSpecific) {
      verdict = Math.random() > 0.3 ? 'true' : 'mixed';
      confidence = Math.random() * 20 + 75;
    } else if (hasSuperlatives) {
      verdict = Math.random() > 0.4 ? 'mixed' : 'false';
      confidence = Math.random() * 30 + 60;
    } else {
      verdict = ['true', 'false', 'mixed', 'unverified'][Math.floor(Math.random() * 4)];
      confidence = Math.random() * 40 + 50;
    }

    return {
      claim,
      verdict,
      confidence: Math.round(confidence),
      sources: [
        {
          name: 'Reuters Fact Check',
          url: 'https://reuters.com/fact-check',
          credibility: 95,
          verdict: verdict === 'true' ? 'Confirmed' : verdict === 'false' ? 'Debunked' : 'Partially accurate'
        },
        {
          name: 'Snopes',
          url: 'https://snopes.com',
          credibility: 92,
          verdict: verdict === 'true' ? 'True' : verdict === 'false' ? 'False' : 'Mixed'
        },
        {
          name: 'PolitiFact',
          url: 'https://politifact.com',
          credibility: 88,
          verdict: verdict === 'true' ? 'True' : verdict === 'false' ? 'Pants on Fire' : 'Half True'
        },
        {
          name: 'AP Fact Check',
          url: 'https://apnews.com/hub/ap-fact-check',
          credibility: 94,
          verdict: verdict === 'true' ? 'Accurate' : verdict === 'false' ? 'Inaccurate' : 'Needs context'
        }
      ],
      relatedClaims: [
        {
          text: 'Similar claim about the same topic from last month',
          verdict: 'mixed',
          similarity: 85
        },
        {
          text: 'Related statement with different context',
          verdict: 'true',
          similarity: 72
        },
        {
          text: 'Opposing viewpoint on the same subject',
          verdict: 'false',
          similarity: 68
        }
      ],
      timeline: [
        {
          date: '2024-01-10',
          event: 'Original claim first appeared',
          source: 'Social Media'
        },
        {
          date: '2024-01-12',
          event: 'Claim went viral',
          source: 'Various Platforms'
        },
        {
          date: '2024-01-14',
          event: 'First fact-check published',
          source: 'Reuters'
        },
        {
          date: '2024-01-15',
          event: 'Additional verification completed',
          source: 'Snopes'
        }
      ],
      context: 'This claim relates to ongoing discussions about the topic. Multiple sources have provided varying perspectives, and the full context suggests the situation is more nuanced than initially presented.'
    };
  };

  const handleValidate = async () => {
    if (!factClaim.trim()) return;

    setIsValidating(true);
    setResult(null);

    try {
      const validationResult = await mockValidate(factClaim);
      setResult(validationResult);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'false': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'mixed': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'true': return 'text-green-600 bg-green-100';
      case 'false': return 'text-red-600 bg-red-100';
      case 'mixed': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVerdictText = (verdict) => {
    switch (verdict) {
      case 'true': return 'TRUE';
      case 'false': return 'FALSE';
      case 'mixed': return 'MIXED';
      default: return 'UNVERIFIED';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-6 h-6 text-purple-500" />
        <h1>Validate Facts</h1>
        <Badge variant="secondary">Cross-Reference</Badge>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Fact Verification
          </CardTitle>
          <CardDescription>
            Cross-reference claims with trusted sources and expert analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter the fact or claim you want to verify..."
            value={factClaim}
            onChange={(e) => setFactClaim(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleValidate()}
          />
          <Button 
            onClick={handleValidate} 
            disabled={!factClaim.trim() || isValidating}
            className="w-full"
          >
            {isValidating ? (
              <>
                <Shield className="w-4 h-4 mr-2 animate-pulse" />
                Validating...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Validate Fact
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Validation Progress */}
      {isValidating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
                <span>Cross-referencing with trusted sources</span>
              </div>
              <Progress value={80} className="w-full" />
              <div className="text-sm text-muted-foreground">
                Checking claim against multiple fact-checking databases...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Verdict */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {getVerdictIcon(result.verdict)}
                  <Badge className={`text-lg px-4 py-2 ${getVerdictColor(result.verdict)}`}>
                    {getVerdictText(result.verdict)}
                  </Badge>
                </div>
                <div className="text-lg font-medium mb-2">
                  Confidence: {result.confidence}%
                </div>
                <Progress value={result.confidence} className="w-full max-w-md mx-auto" />
              </div>

              <Alert>
                <BookOpen className="w-4 h-4" />
                <AlertDescription>
                  <strong>Claim:</strong> "{result.claim}"
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Source Verification
              </CardTitle>
              <CardDescription>
                Cross-referenced with {result.sources.length} trusted fact-checking sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.sources.map((source, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{source.name}</span>
                      </div>
                      <Badge variant="outline">
                        Credibility: {source.credibility}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Verdict: <span className="font-medium">{source.verdict}</span>
                      </span>
                      <Button variant="ghost" size="sm">
                        View Source
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Context & Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.context}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{event.event}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} • {event.source}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Claims */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Related Claims
              </CardTitle>
              <CardDescription>
                Similar claims found in our database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.relatedClaims.map((claim, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getVerdictIcon(claim.verdict)}
                        <Badge className={getVerdictColor(claim.verdict)} variant="secondary">
                          {getVerdictText(claim.verdict)}
                        </Badge>
                      </div>
                      <Badge variant="outline">
                        {claim.similarity}% similar
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {claim.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}