import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Trophy, 
  Star, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Target,
  Award
} from 'lucide-react';

const mockFeedbackItems = [
  {
    id: '1',
    content: 'New study shows significant breakthrough in renewable energy efficiency',
    type: 'article',
    title: 'Renewable Energy Breakthrough Study',
    author: 'Science Journal',
    ratings: { credible: 145, questionable: 23, false: 7 },
    totalVotes: 175,
    comments: 34,
    status: 'verified',
    contributors: [
      { name: 'Dr. EnergyExpert', reputation: 4500, vote: 'credible', expertise: 'Energy Research' },
      { name: 'ScienceReviewer', reputation: 3200, vote: 'credible', expertise: 'Peer Review' },
      { name: 'SkepticalReader', reputation: 1800, vote: 'questionable' }
    ],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    content: 'Political figure claims economic growth rate of 15% this quarter',
    type: 'claim',
    title: 'Economic Growth Rate Claim',
    ratings: { credible: 45, questionable: 89, false: 156 },
    totalVotes: 290,
    comments: 67,
    status: 'disputed',
    contributors: [
      { name: 'EconomistPro', reputation: 5100, vote: 'false', expertise: 'Economics' },
      { name: 'DataAnalyst42', reputation: 2900, vote: 'false', expertise: 'Statistics' },
      { name: 'PolicyWatcher', reputation: 2200, vote: 'questionable' }
    ],
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    content: 'Medical research indicates new treatment reduces symptoms by 90%',
    type: 'article',
    title: 'New Medical Treatment Research',
    author: 'Medical Journal',
    ratings: { credible: 67, questionable: 45, false: 12 },
    totalVotes: 124,
    comments: 28,
    status: 'pending',
    contributors: [
      { name: 'Dr.MedExpert', reputation: 4800, vote: 'credible', expertise: 'Medicine' },
      { name: 'ResearchCritic', reputation: 2100, vote: 'questionable', expertise: 'Research Methods' }
    ],
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const mockContributors = [
  {
    id: '1',
    name: 'Dr. EnergyExpert',
    reputation: 4500,
    expertise: ['Energy Research', 'Climate Science', 'Environmental Policy'],
    contributions: 342,
    accuracy: 94,
    badges: ['Expert Reviewer', 'Top Contributor', 'Accuracy Award'],
    joined: '2023-03-15'
  },
  {
    id: '2',
    name: 'EconomistPro',
    reputation: 5100,
    expertise: ['Economics', 'Financial Analysis', 'Policy Research'],
    contributions: 456,
    accuracy: 96,
    badges: ['Expert Reviewer', 'Fact-Check Master', 'Community Leader'],
    joined: '2023-01-20'
  },
  {
    id: '3',
    name: 'ScienceReviewer',
    reputation: 3200,
    expertise: ['Peer Review', 'Research Methods', 'Scientific Writing'],
    contributions: 289,
    accuracy: 91,
    badges: ['Peer Review Expert', 'Quality Contributor'],
    joined: '2023-06-10'
  }
];

export function CrowdFeedback() {
  const [activeTab, setActiveTab] = useState('review');
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disputed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'disputed': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getCredibilityScore = (ratings) => {
    const total = ratings.credible + ratings.questionable + ratings.false;
    return Math.round((ratings.credible / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6 text-teal-500" />
        <h1>Crowd Feedback</h1>
        <Badge variant="secondary">Community-Driven</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Review Queue
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          {/* Community Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-lg font-medium">2,847</div>
                    <div className="text-sm text-muted-foreground">Active Reviewers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="text-lg font-medium">15,923</div>
                    <div className="text-sm text-muted-foreground">Reviews This Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="text-lg font-medium">89%</div>
                    <div className="text-sm text-muted-foreground">Consensus Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div>
                    <div className="text-lg font-medium">4.8/5</div>
                    <div className="text-sm text-muted-foreground">Avg. Quality Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Items */}
          <div className="space-y-4">
            {mockFeedbackItems.map(item => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <Badge className={getStatusColor(item.status)} variant="secondary">
                        {item.status}
                      </Badge>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {getCredibilityScore(item.ratings)}% credible
                    </Badge>
                  </div>

                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {item.content}
                  </p>

                  {/* Voting Distribution */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Community Assessment</span>
                      <span>{item.totalVotes} votes</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm w-20">Credible</span>
                        <Progress value={(item.ratings.credible / item.totalVotes) * 100} className="flex-1" />
                        <span className="text-sm w-12 text-right">{item.ratings.credible}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm w-20">Questionable</span>
                        <Progress value={(item.ratings.questionable / item.totalVotes) * 100} className="flex-1" />
                        <span className="text-sm w-12 text-right">{item.ratings.questionable}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm w-20">False</span>
                        <Progress value={(item.ratings.false / item.totalVotes) * 100} className="flex-1" />
                        <span className="text-sm w-12 text-right">{item.ratings.false}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expert Contributors */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Expert Contributors</div>
                    <div className="flex flex-wrap gap-2">
                      {item.contributors.slice(0, 3).map((contributor, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-50 rounded-full px-2 py-1">
                          <Avatar className="w-4 h-4">
                            <AvatarFallback className="text-xs">
                              {contributor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{contributor.name}</span>
                          {contributor.expertise && (
                            <Badge variant="secondary" className="text-xs h-4">
                              {contributor.expertise}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {item.comments} comments
                      </div>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Credible
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Questionable
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        False
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Contributors
              </CardTitle>
              <CardDescription>
                Community members making the biggest impact on fact-checking quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockContributors.map((contributor, index) => (
                  <div key={contributor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium">
                        #{index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Joined {new Date(contributor.joined).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-medium">{contributor.reputation}</div>
                        <div className="text-xs text-muted-foreground">Reputation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{contributor.contributions}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-medium">{contributor.accuracy}%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {contributor.badges.slice(0, 2).map(badge => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Review Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Daily Reviews</span>
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                    <Progress value={78} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Expert Participation</span>
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                    <Progress value={65} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Consensus Rate</span>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <Progress value={89} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Review Quality</span>
                    <Badge className="bg-green-100 text-green-800">4.8/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expert Agreement Rate</span>
                    <Badge className="bg-blue-100 text-blue-800">94%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">False Positive Rate</span>
                    <Badge className="bg-yellow-100 text-yellow-800">3.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Review Completion Time</span>
                    <Badge variant="secondary">2.4 days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Impact</CardTitle>
              <CardDescription>
                How crowd feedback is improving news verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>
                  <strong>This month's achievements:</strong> 2,847 active reviewers contributed 15,923 reviews with an 89% consensus rate, helping verify the credibility of 3,421 news items and claims.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}