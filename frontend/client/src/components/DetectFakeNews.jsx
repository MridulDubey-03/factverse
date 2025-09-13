import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  TrendingUp,
  Shield,
  Filter,
  Search,
  BookOpen,
  Hash,
  Clock,
  ExternalLink,
  Users,
  AlertTriangle,
  FileText,
} from 'lucide-react';

export function FilterNews() {
  const [filters, setFilters] = useState({
    source: '',
    topic: '',
    sentiment: '',
    timeframe: '1d',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState([]);

  const mockFilter = async (queryFilters) => {
    // Simulate API call
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock data based on filters
    const allArticles = [
      {
        id: 1,
        title: 'New AI Model Achieves Record-Breaking Performance',
        source: 'TechCrunch',
        sentiment: 'positive',
        topic: 'Technology',
        relevance: 95,
      },
      {
        id: 2,
        title: 'Economic Outlook Remains Uncertain Amidst Global Tensions',
        source: 'Reuters',
        sentiment: 'negative',
        topic: 'Economy',
        relevance: 80,
      },
      {
        id: 3,
        title: 'Local Community Rallies to Save Historic Landmark',
        source: 'Local Times',
        sentiment: 'positive',
        topic: 'Community',
        relevance: 75,
      },
      {
        id: 4,
        title: 'Climate Scientists Warn of Accelerating Sea Level Rise',
        source: 'Nature',
        sentiment: 'negative',
        topic: 'Science',
        relevance: 90,
      },
      {
        id: 5,
        title: 'Tech Giants Announce New Partnership in Quantum Computing',
        source: 'Wired',
        sentiment: 'positive',
        topic: 'Technology',
        relevance: 88,
      },
      {
        id: 6,
        title: 'Federal Reserve Considers Next Steps on Interest Rates',
        source: 'Bloomberg',
        sentiment: 'neutral',
        topic: 'Economy',
        relevance: 85,
      },
      {
        id: 7,
        title: 'Surge in Renewable Energy Investment Reported',
        source: 'Clean Energy News',
        sentiment: 'positive',
        topic: 'Energy',
        relevance: 82,
      },
      {
        id: 8,
        title: 'Geopolitical Tensions Escalate in Key Region',
        source: 'BBC News',
        sentiment: 'negative',
        topic: 'Politics',
        relevance: 91,
      },
      {
        id: 9,
        title: 'Researchers Discover Potential Breakthrough for Disease',
        source: 'Science Daily',
        sentiment: 'positive',
        topic: 'Health',
        relevance: 94,
      },
      {
        id: 10,
        title: 'Local Businesses Face Supply Chain Challenges',
        source: 'Business Journal',
        sentiment: 'negative',
        topic: 'Economy',
        relevance: 78,
      },
    ];

    const filteredArticles = allArticles.filter((article) => {
      const sourceMatch =
        !queryFilters.source ||
        article.source.toLowerCase().includes(queryFilters.source.toLowerCase());
      const topicMatch =
        !queryFilters.topic ||
        article.topic.toLowerCase().includes(queryFilters.topic.toLowerCase());
      const sentimentMatch =
        !queryFilters.sentiment ||
        article.sentiment.toLowerCase() === queryFilters.sentiment.toLowerCase();

      return sourceMatch && topicMatch && sentimentMatch;
    });

    const sortedArticles = filteredArticles.sort((a, b) => b.relevance - a.relevance);

    return {
      totalFound: sortedArticles.length,
      articles: sortedArticles.slice(0, 5), // Return top 5 most relevant articles
      timeTaken: '2.0s',
    };
  };

  const handleFilterChange = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = async () => {
    setIsProcessing(true);
    const mockResults = await mockFilter(filters);
    setResults(mockResults);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-6 h-6 text-emerald-500" />
        <h1>Smart News Filter</h1>
        <Badge variant="secondary">AI-Powered</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            AI-Powered News Discovery
          </CardTitle>
          <CardDescription>
            Use intelligent filters to find the most relevant news
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Source Filter */}
            <div className="space-y-2">
              <Label>Source</Label>
              <Input
                placeholder="e.g., Reuters, BBC"
                value={filters.source}
                onChange={(e) => handleFilterChange('source')(e.target.value)}
              />
            </div>

            {/* Topic Filter */}
            <div className="space-y-2">
              <Label>Topic</Label>
              <Select
                value={filters.topic}
                onValueChange={handleFilterChange('topic')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Politics">Politics</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sentiment Filter */}
            <div className="space-y-2">
              <Label>Sentiment</Label>
              <Select
                value={filters.sentiment}
                onValueChange={handleFilterChange('sentiment')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timeframe Filter */}
            <div className="space-y-2">
              <Label>Timeframe</Label>
              <Tabs
                defaultValue="1d"
                value={filters.timeframe}
                onValueChange={handleFilterChange('timeframe')}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="1d">1D</TabsTrigger>
                  <TabsTrigger value="1w">1W</TabsTrigger>
                  <TabsTrigger value="1m">1M</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <Button onClick={handleApplyFilters} disabled={isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <TrendingUp className="w-4 h-4 mr-2 animate-pulse" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 animate-pulse">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Finding the most relevant news...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {results.articles && results.articles.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Top {results.articles.length} Results</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Found in {results.timeTaken}</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                A list of relevant articles based on your filters.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Article</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Relevance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{article.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{article.topic}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Progress value={article.relevance} className="h-2" />
                      <span className="text-sm text-muted-foreground">
                        {article.relevance}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}