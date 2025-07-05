import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Send,
  Code,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Copy,
  Sparkles,
  User,
  Zap,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  codeBlock?: string;
  language?: string;
  suggestions?: string[];
}

interface QuickPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: "debug" | "explain" | "optimize" | "generate";
  icon: React.ReactNode;
}

const quickPrompts: QuickPrompt[] = [
  {
    id: "1",
    title: "Debug My Code",
    description: "Find and fix errors in your code",
    prompt: "Can you help me debug this code and explain what's wrong?",
    category: "debug",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  {
    id: "2",
    title: "Explain Code",
    description: "Get detailed explanations of how code works",
    prompt: "Please explain how this code works step by step:",
    category: "explain",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: "3",
    title: "Optimize Performance",
    description: "Improve code efficiency and performance",
    prompt: "How can I optimize this code for better performance?",
    category: "optimize",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "4",
    title: "Generate Code",
    description: "Create code snippets from descriptions",
    prompt: "Can you generate code for:",
    category: "generate",
    icon: <Code className="w-4 h-4" />,
  },
];

const mockResponses: Record<string, any> = {
  debug: {
    content:
      "I found several issues in your code. Let me help you fix them:\n\n1. **Missing semicolon** on line 5\n2. **Undefined variable** 'result' - you need to declare it first\n3. **Incorrect function syntax** - missing parentheses\n\nHere's the corrected version:",
    codeBlock: `// Fixed version
function calculateTotal(items) {
  let result = 0; // Declare the variable
  for (let i = 0; i < items.length; i++) {
    result += items[i].price;
  }
  return result; // Add semicolon
}`,
    language: "javascript",
    suggestions: [
      "Use const/let instead of var",
      "Consider using array.reduce()",
      "Add input validation",
    ],
  },
  explain: {
    content:
      "This code implements a simple shopping cart calculator. Let me break it down:\n\n1. **Function Declaration**: `calculateTotal(items)` creates a function that accepts an array of items\n2. **Variable Initialization**: `let result = 0` creates a counter starting at zero\n3. **Loop Iteration**: The for loop goes through each item in the array\n4. **Accumulation**: `result += items[i].price` adds each item's price to the total\n5. **Return Statement**: Returns the final calculated total",
    suggestions: [
      "Learn about array methods",
      "Explore object destructuring",
      "Practice with more examples",
    ],
  },
  optimize: {
    content:
      "Here are several ways to optimize your code for better performance:\n\n1. **Use array.reduce()** - more functional and often faster\n2. **Destructuring** - cleaner and more readable\n3. **Input validation** - prevent runtime errors\n\nOptimized version:",
    codeBlock: `// Optimized version
const calculateTotal = (items = []) => {
  // Input validation
  if (!Array.isArray(items)) return 0;
  
  // Use reduce for better performance
  return items.reduce((total, { price = 0 }) => total + price, 0);
};`,
    language: "javascript",
    suggestions: [
      "Add TypeScript for type safety",
      "Consider memoization for large arrays",
      "Use Web Workers for heavy calculations",
    ],
  },
  generate: {
    content:
      "I'll help you generate the code you need. Here's a responsive navigation bar with modern styling:",
    codeBlock: `<!-- HTML -->
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">
      <a href="#" class="nav-logo-link">Brand</a>
    </div>
    <div class="nav-menu">
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">About</a>
      <a href="#" class="nav-link">Services</a>
      <a href="#" class="nav-link">Contact</a>
    </div>
    <div class="nav-toggle">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</nav>

<style>
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-toggle {
    display: block;
  }
}
</style>`,
    language: "html",
    suggestions: [
      "Add JavaScript for mobile menu",
      "Implement smooth scroll",
      "Add active state styling",
    ],
  },
};

export function AICodeAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your AI Code Assistant. I can help you debug code, explain concepts, optimize performance, and generate code snippets. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Debug my JavaScript",
        "Explain CSS flexbox",
        "Generate a contact form",
        "Optimize my React component",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Message => {
    // Simple keyword matching for demo
    let responseType = "explain";
    if (
      userMessage.toLowerCase().includes("debug") ||
      userMessage.toLowerCase().includes("error") ||
      userMessage.toLowerCase().includes("fix")
    ) {
      responseType = "debug";
    } else if (
      userMessage.toLowerCase().includes("optimize") ||
      userMessage.toLowerCase().includes("performance")
    ) {
      responseType = "optimize";
    } else if (
      userMessage.toLowerCase().includes("generate") ||
      userMessage.toLowerCase().includes("create") ||
      userMessage.toLowerCase().includes("build")
    ) {
      responseType = "generate";
    }

    const response = mockResponses[responseType];

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response.content,
      timestamp: new Date(),
      codeBlock: response.codeBlock,
      language: response.language,
      suggestions: response.suggestions,
    };
  };

  const sendMessage = async () => {
    if (!inputValue.trim() && !codeInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
      codeBlock: codeInput.trim() || undefined,
      language: codeInput.trim() ? "javascript" : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setCodeInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = simulateAIResponse(
        userMessage.content + " " + (userMessage.codeBlock || ""),
      );
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const useQuickPrompt = (prompt: QuickPrompt) => {
    setInputValue(prompt.prompt);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: "Code snippet copied to clipboard",
    });
  };

  const useSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "debug":
        return "bg-red-100 text-red-700 border-red-200";
      case "explain":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "optimize":
        return "bg-green-100 text-green-700 border-green-200";
      case "generate":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
            AI Code Assistant
          </span>
        </h2>
        <p className="text-muted-foreground">
          Get instant help with coding questions, debugging, and code generation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Prompts Sidebar */}
        <div className="space-y-4">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt.id}
              variant="outline"
              className={`w-full justify-start h-auto p-4 ${getCategoryColor(prompt.category)}`}
              onClick={() => useQuickPrompt(prompt)}
            >
              <div className="flex items-start gap-3">
                {prompt.icon}
                <div className="text-left">
                  <div className="font-medium text-sm">{prompt.title}</div>
                  <div className="text-xs opacity-80">{prompt.description}</div>
                </div>
              </div>
            </Button>
          ))}

          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Code Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your code here for analysis..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="min-h-[120px] text-sm font-mono"
              />
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Code Assistant</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Powered by advanced language models
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                          : "bg-gray-100 text-gray-900"
                      } rounded-lg p-4`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {message.type === "assistant" ? (
                          <Bot className="w-4 h-4 mt-0.5 text-neon-purple" />
                        ) : (
                          <User className="w-4 h-4 mt-0.5" />
                        )}
                        <span className="text-sm font-medium">
                          {message.type === "assistant"
                            ? "AI Assistant"
                            : "You"}
                        </span>
                      </div>

                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>

                      {message.codeBlock && (
                        <div className="mt-4 bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between bg-gray-800 px-3 py-2">
                            <span className="text-xs text-gray-400">
                              {message.language || "code"}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyCode(message.codeBlock!)}
                              className="text-gray-400 hover:text-white h-auto p-1"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          <pre className="p-3 text-sm overflow-auto">
                            <code>{message.codeBlock}</code>
                          </pre>
                        </div>
                      )}

                      {message.suggestions && (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs opacity-80">
                            Quick follow-ups:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                onClick={() => useSuggestion(suggestion)}
                                className="text-xs h-auto py-1 px-2"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-neon-purple" />
                        <span className="text-sm">AI is thinking...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about coding..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-neon-purple to-neon-pink"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
