import React, { useState } from 'react';

// Shadcn/ui components consolidated into a single file
// --- CARD Component
function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={`font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  );
}

// --- BUTTON Component
function Button({ className, ...props }) {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };
  const finalClasses = `${baseClasses} ${variantClasses[props.variant || 'default']} ${sizeClasses[props.size || 'default']} ${className}`;

  return (
    <button
      className={finalClasses}
      {...props}
    />
  );
}

// --- INPUT Component
function Input({ className, ...props }) {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// --- TEXTAREA Component
function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// --- BADGE Component
function Badge({ className, ...props }) {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    outline: "text-foreground",
  };
  const finalClasses = `${baseClasses} ${variantClasses[props.variant || 'default']} ${className}`;
  
  return (
    <div
      className={finalClasses}
      {...props}
    />
  );
}

// --- AVATAR Component
function Avatar({ className, ...props }) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`}
      {...props}
    />
  );
}

// --- TABS Component
function Tabs({ className, defaultValue, ...props }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {React.Children.map(props.children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { value, setValue });
        } else if (child.type === TabsContent) {
          return React.cloneElement(child, { value, currentValue: value });
        }
        return child;
      })}
    </div>
  );
}

function TabsList({ className, value, setValue, ...props }) {
  return (
    <div
      className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    >
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { onClick: () => setValue(child.props.value) })
      )}
    </div>
  );
}

function TabsTrigger({ className, value, children, ...props }) {
  const isActive = props.onClick && props.onClick.name === 'onClick' ? false : true;
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-background text-foreground shadow' : 'data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground'} ${className}`}
      data-state={isActive ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, currentValue, className, ...props }) {
  return (
    <div
      className={`${value === currentValue ? '' : 'hidden'} mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  );
}

// --- SELECT Component
function Select({ onValueChange, value, children }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setOpen(false);
  };
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { onClick: () => setOpen(!open) });
        }
        return null;
      })}
      {open && React.Children.map(children, child => {
        if (child.type === SelectContent) {
          return React.cloneElement(child, { handleValueChange, selectedValue });
        }
        return null;
      })}
    </div>
  );
}

function SelectTrigger({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function SelectValue({ placeholder, children }) {
  return children || <span className="text-muted-foreground">{placeholder}</span>;
}

function SelectContent({ handleValueChange, selectedValue, children }) {
  return (
    <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
      <div className="p-1">
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            onSelect: () => handleValueChange(child.props.value),
            isSelected: child.props.value === selectedValue,
          });
        })}
      </div>
    </div>
  );
}

function SelectItem({ children, value, onSelect, isSelected }) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${isSelected ? 'font-semibold' : ''}`}
    >
      {children}
    </button>
  );
}

// Lucide React Icons
const lucide_react = {
  HelpCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.86 0"/><path d="M12 16h.01"/></svg>,
  MessageSquare: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  ThumbsUp: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 10v12h10a2 2 0 0 0 2-2V8l-7-7-1.5 1.5A3 3 0 0 1 9 4.2V6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3z"/></svg>,
  Trophy: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M12 2v20"/><path d="M12 12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4"/><path d="M12 12v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4"/></svg>,
  Clock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Users: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Plus: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  TrendingUp: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  CheckCircle: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-8.6"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Star: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
};
const HelpCircle = lucide_react.HelpCircle;
const MessageSquare = lucide_react.MessageSquare;
const ThumbsUp = lucide_react.ThumbsUp;
const ThumbsDown = lucide_react.ThumbsDown;
const Trophy = lucide_react.Trophy;
const Clock = lucide_react.Clock;
const Users = lucide_react.Users;
const Plus = lucide_react.Plus;
const Search = lucide_react.Search;
const TrendingUp = lucide_react.TrendingUp;
const CheckCircle = lucide_react.CheckCircle;
const Star = lucide_react.Star;


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

export default function App() {
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
        <h1 className="text-2xl font-bold tracking-tight">User Questions</h1>
        <Badge variant="secondary">{sortedQuestions.length} questions</Badge>
      </div>

      <Tabs defaultValue="browse" onValueChange={setActiveTab}>
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
                  <Button variant="outline" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
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

                  <h3 className="mb-2 text-xl font-semibold hover:text-blue-600 transition-colors">
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
                <label className="block mb-2 text-sm font-medium">Question Title</label>
                <Input
                  placeholder="What's your question?"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Category</label>
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
                <label className="block mb-2 text-sm font-medium">Question Details</label>
                <Textarea
                  placeholder="Provide more context about your question..."
                  value={newQuestion.content}
                  onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                  rows={6}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Tags (comma-separated)</label>
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
