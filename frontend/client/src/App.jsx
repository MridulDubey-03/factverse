import React, { useState, forwardRef } from 'react';

function AppWrapper({ children }) {
  return <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">{children}</div>;
}

const Button = forwardRef(({ className, variant = 'default', size = 'default', onClick, children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-white shadow hover:bg-primary/90",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
  };

  const finalClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ''}`;

  return (
    <button className={finalClasses} onClick={onClick} ref={ref} {...props}>
      {children}
    </button>
  );
});

const Card = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className || ''}`} {...props}>
    {children}
  </div>
));

const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props}>
    {children}
  </div>
));

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={`font-semibold leading-none tracking-tight ${className || ''}`} {...props}>
    {children}
  </h3>
));

const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-500 ${className || ''}`} {...props}>
    {children}
  </p>
));

const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props}>
    {children}
  </div>
));

const Badge = forwardRef(({ className, variant = 'default', children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default: "border-transparent bg-primary text-white hover:bg-primary/80",
    secondary: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const finalClasses = `${baseClasses} ${variants[variant]} ${className || ''}`;

  return (
    <div className={finalClasses} ref={ref} {...props}>
      {children}
    </div>
  );
});


function Filter(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );
}

function Shield(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
}

function FileText(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7z"></path>
      <path d="M14 2v4a2 2 0 002 2h4"></path>
      <line x1="10" y1="9" x2="10" y2="15"></line>
      <line x1="14" y1="9" x2="14" y2="15"></line>
      <line x1="12" y1="9" x2="12" y2="15"></line>
    </svg>
  );
}

function CheckCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

function HelpCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12" y2="17"></line>
    </svg>
  );
}

function Users(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 00-3-3.87M2 21v-2a4 4 0 013-3.87"></path>
    </svg>
  );
}

function Menu(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  );
}

function X(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18"></path>
      <path d="M6 6L18 18"></path>
    </svg>
  );
}


function InteractiveLogo({ size, showText = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    lg: 'w-16 h-16',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#3b82f6" strokeWidth="5" fill="none" strokeDasharray="200" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" from="0" to="200" dur="2s" repeatCount="indefinite" />
          </circle>
          <path d="M30 40 L50 60 L70 40" stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {showText && <span className="font-semibold text-lg text-blue-600">FactVerse</span>}
    </div>
  );
}

const FilterNews = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Filter News</h2>
    <p>This is a placeholder for the news filtering functionality.</p>
</div>;
const DetectFakeNews = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Detect Fake News</h2>
    <p>This is a placeholder for the fake news detection functionality.</p>
</div>;
const SummarizeArticles = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Summarize Articles</h2>
    <p>This is a placeholder for the article summarization functionality.</p>
</div>;
const ValidateFacts = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Validate Facts</h2>
    <p>This is a placeholder for the fact validation functionality.</p>
</div>;
const UserQuestions = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">User Questions</h2>
    <p>This is a placeholder for the user questions and answers section.</p>
</div>;
const CrowdFeedback = () => <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Crowd Feedback</h2>
    <p>This is a placeholder for the crowd feedback and collaborative fact-checking section.</p>
</div>;

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const style = `
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 15s linear infinite;
    }
    .animate-spin-paused {
      animation-play-state: paused;
    }
    @keyframes spin-reverse-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    .animate-spin-reverse-slow {
      animation: spin-reverse-slow 15s linear infinite;
    }
    .animate-spin-reverse-paused {
      animation-play-state: paused;
    }
  `;

  const sections = [
    { id: 'dashboard', label: 'Home', icon: FileText },
    { id: 'filter', label: 'Filter News', icon: Filter },
    { id: 'detect', label: 'Detect Fake News', icon: Shield },
    { id: 'summarize', label: 'Summarize Articles', icon: FileText },
    { id: 'validate', label: 'Validate Facts', icon: CheckCircle },
    { id: 'questions', label: 'User Questions', icon: HelpCircle },
    { id: 'feedback', label: 'Crowd Feedback', icon: Users },
  ];

  const featureCards = [
    {
      id: 'filter',
      title: 'Filter News',
      description: 'Smart filtering by source, topic, and credibility',
      icon: Filter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      id: 'detect',
      title: 'Detect Fake News',
      description: 'AI-powered fake news detection and analysis',
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20'
    },
    {
      id: 'summarize',
      title: 'Summarize Articles',
      description: 'Quick, intelligent article summaries',
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      id: 'validate',
      title: 'Validate Facts',
      description: 'Cross-reference facts with trusted sources',
      icon: CheckCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      id: 'questions',
      title: 'User Questions',
      description: 'Community-driven Q&A and discussions',
      icon: HelpCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    },
    {
      id: 'feedback',
      title: 'Crowd Feedback',
      description: 'Collaborative fact-checking and ratings',
      icon: Users,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50 dark:bg-teal-950/20'
    }
  ];

  return (
    <AppWrapper>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-paused {
          animation-play-state: paused;
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
        .animate-spin-reverse-paused {
          animation-play-state: paused;
        }
      `}</style>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <InteractiveLogo size="sm" showText={true} />

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeTab === section.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(section.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </Button>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 grid grid-cols-2 gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeTab === section.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setActiveTab(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className="gap-2 justify-start"
                  >
                    <Icon className="w-4 h-4" />
                    {section.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div
              className="relative flex items-center justify-center min-h-[600px]"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <Card className="relative z-10 w-80 h-80 flex flex-col items-center justify-center text-center shadow-2xl border-2 overflow-hidden">
                <CardContent className="space-y-6 p-8 flex flex-col items-center">
                  <InteractiveLogo size="lg" />
                  <div>
                    <h2 className="text-3xl font-medium mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                      FactVerse
                    </h2>
                    <p className="text-gray-500">
                      Your trusted platform for news verification and fact-checking
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className={`absolute inset-0 ${isCarouselPaused ? 'animate-spin-paused' : 'animate-spin-slow'}`}>
                {featureCards.map((feature, index) => {
                  const Icon = feature.icon;
                  const angle = (index * 60) - 90;
                  const radius = 250;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <Card
                      key={feature.id}
                      className={`absolute w-48 h-32 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${feature.bgColor} ${isCarouselPaused ? 'animate-spin-reverse-paused' : 'animate-spin-reverse-slow'}`}
                      style={{
                        left: `calc(50% + ${x}px - 6rem)`,
                        top: `calc(50% + ${y}px - 4rem)`,
                      }}
                      onClick={() => setActiveTab(feature.id)}
                    >
                      <CardContent className="p-4 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-5 h-5 ${feature.color}`} />
                          <h3 className="font-medium text-sm">{feature.title}</h3>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    Fact-Checking
                  </CardTitle>
                  <CardDescription>
                    AI-powered detection and verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Articles Verified</span>
                      <Badge variant="secondary">12,847</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy Rate</span>
                      <Badge className="bg-green-100 text-green-800">94.2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Community
                  </CardTitle>
                  <CardDescription>
                    User contributions and feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <Badge variant="secondary">8,924</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Feedback Score</span>
                      <Badge className="bg-blue-100 text-blue-800">4.7/5</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Processing
                  </CardTitle>
                  <CardDescription>
                    Real-time article analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Queue Length</span>
                      <Badge variant="secondary">47</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Process Time</span>
                      <Badge className="bg-orange-100 text-orange-800">2.3s</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'filter' && <FilterNews />}
        {activeTab === 'detect' && <DetectFakeNews />}
        {activeTab === 'summarize' && <SummarizeArticles />}
        {activeTab === 'validate' && <ValidateFacts />}
        {activeTab === 'questions' && <UserQuestions />}
        {activeTab === 'feedback' && <CrowdFeedback />}
        </main>
      </AppWrapper>
  )}