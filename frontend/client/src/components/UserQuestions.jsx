import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Trophy, 
  Clock, 
  Users, 
  Plus,
  Search,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';

const mockQuestions = [
  {
    id: '1',
    title: 'How can I verify if a viral social media claim is true?',
    content: 'I saw a post claiming that a certain political figure made a specific statement, but I can\'t find the original source. What\'s the best way to verify this?',
    author: { name: 'NewsReader42', reputation: 1250, verified: false },
    category: 'Fact Checking',
    tags: ['social-media', 'verification', 'politics'],
    votes: 23,
    answers: 5,
    views: 1840,
    createdAt: '2024-01-15T10:30:00Z',
    status: 'answered'
  },
  {
    id: '2',
    title: 'What makes a news source credible?',
    content: 'I\'m trying to understand what factors determine if a news source is reliable. Are there specific criteria I should look for?',
    author: { name: 'FactChecker', reputation: 2100, verified: true },
    category: 'Media Literacy',
    tags: ['credibility', 'sources', 'journalism'],
    votes: 45,
    answers: 8,
    views: 3200,
    createdAt: '2024-01-14T14:20:00Z',
    status: 'answered',
    bounty: 50
  },
  {
    id: '3',
    title: 'Climate change data interpretation help needed',
    content: 'I found conflicting reports about recent climate data. How do I determine which interpretation is more accurate?',
    author: { name: 'ScienceFan', reputation: 890, verified: false },
    category: 'Science',
    tags: ['climate', 'data-analysis', 'research'],
    votes: 18,
    answers: 3,
    views: 920,
    createdAt: '2024-01-13T09:15:00Z',
    status: 'open'
  }
];

const mockAnswers = [
  {
    id: '1',
    content: 'Great question! Here are the key steps I recommend: 1) Check if the claim includes specific dates, locations, or quotes. 2) Search for the original source using reverse image search or quote searches. 3) Look for verification from established fact-checking organizations like Reuters, Snopes, or PolitiFact. 4) Check if other credible news outlets have reported on the same claim.',
    author: { name: 'ExpertFactChecker', reputation: 5420, verified: true },
    votes: 34,
    accepted: true,
    createdAt: '2024-01-15T11:45:00Z'
  },
  {
    id: '2',
    content: 'Additionally, consider the source\'s track record and motivation. Be especially cautious of claims that seem designed to provoke strong emotional reactions.',
    author: { name: 'MediaLiteracyPro', reputation: 3100, verified: true },
    votes: 12,
    accepted: false,
    createdAt: '2024-01-15T12:30:00Z'
  }
];

export function UserQuestions() {
  const [activeTab, setActiveTab] = useState('browse');
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '', category: '', tags: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'Fact Checking', 'Media Literacy', 'Science', 'Politics', 'Technology', 'Health'];

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || question.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'views':
        return b.views - a.views;
      case 'answers':
        return b.answers - a.answers;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleAskQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim()) return;
    
    // Mock question submission
    console.log('New question submitted:', newQuestion);
    setNewQuestion({ title: '', content: '', category: '', tags: '' });
    setActiveTab('browse');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <HelpCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-orange-500" />
        <h1>User Questions</h1>
        <Badge variant="secondary">{sortedQuestions.length} questions</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Browse Questions
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ask Question
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-4">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="votes">Most Voted</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                      <SelectItem value="answers">Most Answers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            {sortedQuestions.map(question => (
              <Card key={question.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(question.status)}
                      <Badge className={getStatusColor(question.status)} variant="secondary">
                        {question.status}
                      </Badge>
                      <Badge variant="outline">{question.category}</Badge>
                      {question.bounty && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Trophy className="w-3 h-3 mr-1" />
                          {question.bounty} pts
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 hover:text-blue-600 transition-colors">
                    {question.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {question.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {question.votes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {question.answers}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {question.views}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {question.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          {question.author.name}
                          {question.author.verified && (
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {question.author.reputation} pts
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ask" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Get help from the FactVerse community of experts and fact-checkers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block mb-2">Question Title</label>
                <Input
                  placeholder="What's your question?"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-2">Category</label>
                <Select 
                  value={newQuestion.category} 
                  onValueChange={(value) => setNewQuestion({...newQuestion, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block mb-2">Question Details</label>
                <Textarea
                  placeholder="Provide more context about your question..."
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  rows={6}
                />
              </div>

              <div>
                <label className="block mb-2">Tags (comma-separated)</label>
                <Input
                  placeholder="verification, fact-check, politics"
                  value={newQuestion.tags}
                  onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
                />
              </div>

              <Button 
                onClick={handleAskQuestion}
                disabled={!newQuestion.title.trim() || !newQuestion.content.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Hot Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Election Verification</span>
                    <Badge variant="secondary">142 questions</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Climate Data</span>
                    <Badge variant="secondary">89 questions</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Social Media Claims</span>
                    <Badge variant="secondary">67 questions</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>EF</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        ExpertFactChecker
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">5,420 pts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        MediaLiteracyPro
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">3,100 pts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Active Bounties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      What makes a news source credible?
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      50 pts
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">
                      How to verify scientific claims?
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      75 pts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}