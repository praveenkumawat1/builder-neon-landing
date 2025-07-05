import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Copy,
  RefreshCw,
  Download,
  Share,
  Code,
  Eye,
  Maximize,
  Settings,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  html: string;
  css: string;
  js: string;
  tags: string[];
}

const codeExamples: CodeExample[] = [
  {
    id: "1",
    title: "Animated Button",
    description: "A sleek button with hover animations using CSS transitions",
    difficulty: "Beginner",
    html: `<button class="animated-btn">
  <span>Click Me</span>
  <div class="ripple"></div>
</button>`,
    css: `.animated-btn {
  position: relative;
  padding: 12px 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.animated-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.animated-btn span {
  position: relative;
  z-index: 2;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.animated-btn:active .ripple {
  width: 300px;
  height: 300px;
}`,
    js: `document.querySelector('.animated-btn').addEventListener('click', function(e) {
  const ripple = this.querySelector('.ripple');
  ripple.style.width = '0';
  ripple.style.height = '0';
  
  setTimeout(() => {
    ripple.style.width = '300px';
    ripple.style.height = '300px';
  }, 10);
});`,
    tags: ["CSS", "Animations", "Interactive"],
  },
  {
    id: "2",
    title: "Card Component",
    description: "Modern card design with glass morphism effects",
    difficulty: "Intermediate",
    html: `<div class="glass-card">
  <div class="card-header">
    <h3>Glass Card</h3>
    <span class="status">Active</span>
  </div>
  <p class="card-content">
    This is a beautiful glassmorphism card with backdrop blur effects.
  </p>
  <div class="card-footer">
    <button class="learn-more">Learn More</button>
  </div>
</div>`,
    css: `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  max-width: 300px;
  margin: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2em;
}

.status {
  background: linear-gradient(45deg, #00d4ff, #ff00ff);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 600;
}

.card-content {
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.learn-more {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.learn-more:hover {
  background: #667eea;
  color: white;
}`,
    js: `document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.glass-card');
  
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
  });
});`,
    tags: ["CSS", "Glass Morphism", "Modern Design"],
  },
  {
    id: "3",
    title: "Interactive Dashboard",
    description: "Dynamic dashboard with GSAP animations",
    difficulty: "Advanced",
    html: `<div class="dashboard">
  <div class="dashboard-header">
    <h2>Analytics Dashboard</h2>
    <div class="metric-cards">
      <div class="metric-card" data-value="1,234">
        <div class="metric-icon">👥</div>
        <div class="metric-info">
          <span class="metric-label">Users</span>
          <span class="metric-value">0</span>
        </div>
      </div>
      <div class="metric-card" data-value="89.5">
        <div class="metric-icon">📈</div>
        <div class="metric-info">
          <span class="metric-label">Growth</span>
          <span class="metric-value">0%</span>
        </div>
      </div>
    </div>
  </div>
  <div class="chart-container">
    <canvas id="chart" width="400" height="200"></canvas>
  </div>
</div>`,
    css: `.dashboard {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  max-width: 500px;
  margin: 20px;
}

.dashboard-header h2 {
  margin: 0 0 20px 0;
  font-size: 1.5em;
}

.metric-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.metric-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
}

.metric-icon {
  font-size: 24px;
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.8em;
  opacity: 0.8;
}

.metric-value {
  font-size: 1.2em;
  font-weight: 700;
}

.chart-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
}

#chart {
  width: 100%;
  height: 200px;
}`,
    js: `// Animate counter values
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    
    if (element.textContent.includes('%')) {
      element.textContent = current + '%';
    } else {
      element.textContent = current.toLocaleString();
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  const metricCards = document.querySelectorAll('.metric-card');
  
  metricCards.forEach(card => {
    const valueElement = card.querySelector('.metric-value');
    const targetValue = parseFloat(card.dataset.value);
    
    setTimeout(() => {
      animateValue(valueElement, 0, targetValue, 2000);
    }, 500);
  });
  
  // Simple chart drawing
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  
  const data = [20, 45, 30, 60, 40, 70, 55];
  const maxValue = Math.max(...data);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * canvas.width;
    const y = canvas.height - (value / maxValue) * canvas.height;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
});`,
    tags: ["JavaScript", "GSAP", "Charts", "Dashboard"],
  },
];

export function CodePlayground() {
  const [selectedExample, setSelectedExample] = useState(codeExamples[0]);
  const [activeTab, setActiveTab] = useState("preview");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    if (!iframeRef.current) return;

    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: 'Inter', sans-serif;
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            ${selectedExample.css}
          </style>
        </head>
        <body>
          ${selectedExample.html}
          <script>
            ${selectedExample.js}
          </script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    iframe.src = "data:text/html;charset=utf-8," + encodeURI(combinedCode);
  };

  useEffect(() => {
    runCode();
  }, [selectedExample]);

  const copyCode = (type: "html" | "css" | "js") => {
    const code = selectedExample[type];
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `${type.toUpperCase()} code copied to clipboard`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
            Interactive Code Playground
          </span>
        </h2>
        <p className="text-muted-foreground">
          Experiment with live code examples and see results instantly
        </p>
      </div>

      {/* Example Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {codeExamples.map((example) => (
          <Card
            key={example.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedExample.id === example.id
                ? "border-neon-cyan bg-card/80"
                : "hover:border-neon-cyan/50"
            }`}
            onClick={() => setSelectedExample(example)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <Badge
                  className={`${getDifficultyColor(example.difficulty)} text-white`}
                >
                  {example.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {example.description}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {example.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="bg-gray-900 text-gray-100">
          <CardHeader className="border-b border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Code Editor</CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={runCode}
                  className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-gray-800 border-b border-gray-700">
                <TabsTrigger value="html" className="text-orange-400">
                  HTML
                </TabsTrigger>
                <TabsTrigger value="css" className="text-blue-400">
                  CSS
                </TabsTrigger>
                <TabsTrigger value="js" className="text-yellow-400">
                  JavaScript
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-green-400">
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="m-0">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white"
                    onClick={() => copyCode("html")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="p-4 overflow-auto max-h-96 text-sm">
                    <code className="text-orange-300">
                      {selectedExample.html}
                    </code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="css" className="m-0">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white"
                    onClick={() => copyCode("css")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="p-4 overflow-auto max-h-96 text-sm">
                    <code className="text-blue-300">{selectedExample.css}</code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="js" className="m-0">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10 text-gray-400 hover:text-white"
                    onClick={() => copyCode("js")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre className="p-4 overflow-auto max-h-96 text-sm">
                    <code className="text-yellow-300">
                      {selectedExample.js}
                    </code>
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="m-0">
                <div className="p-4">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-96 border border-gray-700 rounded-lg bg-white"
                    title="Code Preview"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Live Preview</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Maximize className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <iframe
              ref={iframeRef}
              className="w-full h-96 border border-border rounded-lg"
              title="Live Preview"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button className="bg-gradient-to-r from-neon-purple to-neon-pink">
          <Code className="w-4 h-4 mr-2" />
          Save to Projects
        </Button>
        <Button variant="outline" className="border-neon-cyan text-neon-cyan">
          <Share className="w-4 h-4 mr-2" />
          Share Code
        </Button>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Code
        </Button>
      </div>
    </div>
  );
}
