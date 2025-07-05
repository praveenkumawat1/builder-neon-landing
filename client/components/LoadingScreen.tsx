import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  const loadingSteps = [
    { text: "initializing_bootcamp.js", icon: "⚡", color: "text-neon-cyan" },
    { text: "loading_html_modules.html", icon: "🏗️", color: "text-neon-green" },
    { text: "compiling_css_styles.css", icon: "🎨", color: "text-neon-purple" },
    { text: "importing_javascript.js", icon: "⚡", color: "text-neon-pink" },
    { text: "setting_up_workspace.json", icon: "🛠️", color: "text-neon-cyan" },
    { text: "ready_to_launch.exe", icon: "🚀", color: "text-neon-green" },
  ];

  const codeSnippets = [
    "const bootcamp = new FrontendBootcamp();",
    "bootcamp.initialize();",
    "await bootcamp.loadModules();",
    "bootcamp.startLearning();",
  ];

  useEffect(() => {
    // Matrix rain effect
    const createMatrixRain = () => {
      if (!matrixRef.current) return;

      const chars = "01HTML CSS JS{}</>[]();";
      const columns = Math.floor(window.innerWidth / 20);

      for (let i = 0; i < 15; i++) {
        const char = document.createElement("div");
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.className =
          "absolute text-neon-cyan opacity-20 font-mono text-sm animate-pulse";
        char.style.left = `${Math.random() * 100}%`;
        char.style.top = `${Math.random() * 100}%`;
        char.style.animationDelay = `${Math.random() * 3}s`;
        char.style.animationDuration = `${2 + Math.random() * 3}s`;
        matrixRef.current.appendChild(char);

        // Animate falling
        gsap.to(char, {
          y: window.innerHeight + 50,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2,
        });
      }
    };

    createMatrixRain();

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 12 + 3;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return newProgress;
      });
    }, 180);

    return () => {
      clearInterval(progressInterval);
      if (matrixRef.current) {
        matrixRef.current.innerHTML = "";
      }
    };
  }, []);

  // Typing effect for code snippets
  useEffect(() => {
    if (currentStep < codeSnippets.length) {
      const snippet = codeSnippets[currentStep];
      let index = 0;
      setTypedText("");

      const typeInterval = setInterval(() => {
        if (index < snippet.length) {
          setTypedText(snippet.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (isComplete) {
      // Epic exit animation
      const tl = gsap.timeline();

      tl.to(".terminal-window", {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      }).to(".loading-screen", {
        opacity: 0,
        scale: 0.9,
        rotationY: 15,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          const loadingElement = document.querySelector(".loading-screen");
          if (loadingElement) {
            loadingElement.remove();
          }
        },
      });
    }
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black z-[9999] flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <div
        ref={matrixRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 via-transparent to-neon-purple/20" />
        <div className="grid grid-cols-12 gap-1 h-full animate-pulse">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className="bg-neon-cyan/5 rounded-sm"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="terminal-window relative z-10 w-full max-w-4xl mx-4">
        {/* Terminal Header */}
        <div className="bg-slate-800 rounded-t-lg border border-slate-600 p-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div
              className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <div className="flex-1 text-center text-slate-300 text-sm font-mono">
            frontend-bootcamp-terminal
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-black/90 backdrop-blur-sm rounded-b-lg border-x border-b border-slate-600 p-6 min-h-[400px]">
          {/* ASCII Art Logo */}
          <div className="mb-6 font-mono text-xs text-neon-cyan">
            <pre className="whitespace-pre leading-tight">
              {`  ███████╗██████╗   ██████╗  ██████╗ ████████╗ ██████╗ █████╗ ███╗   ███╗██████╗
  ██╔════╝██╔══██╗ ██╔═══██╗██╔═══██╗╚══██╔══╝██╔═���══╝██╔══██╗████╗ ████║██╔══██╗
  █████╗  ██████╔╝ ██║   ██║██║   ██║   ██║   ██║     ███████║██╔████╔██║██████╔╝
  ██╔══╝  ██╔══██╗ ██║   ██║██║   ██║   ██║   ██║     ██╔══██║██║╚██╔╝██║██╔═══╝
  ██║     ██████╔╝ ╚██████╔╝╚██████╔╝   ██║   ╚██████╗██║  ██║██║ ╚═╝ ██║██║
  ╚═╝     ╚═════╝   ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝`}
            </pre>
          </div>

          {/* Loading Steps */}
          <div className="space-y-3 mb-6">
            {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-3 font-mono text-sm"
              >
                <span className={`${step.color}`}>{step.icon}</span>
                <span className="text-slate-300">Loading</span>
                <span className={`${step.color} flex-1`}>{step.text}</span>
                <span className="text-neon-green">
                  {index === currentStep ? (
                    <span className="animate-pulse">●</span>
                  ) : (
                    "✓"
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Code Typing Animation */}
          <div className="mb-6 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-neon-purple mb-2 font-mono text-xs">
              › Executing startup sequence...
            </div>
            <div className="font-mono text-sm text-slate-300 min-h-[1.5rem]">
              <span className="text-neon-cyan">$</span>{" "}
              <span className="text-neon-green">{typedText}</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="text-slate-400">Progress</span>
              <span className="text-neon-cyan">{Math.round(progress)}%</span>
            </div>
            <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
              {/* Background grid pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent animate-pulse" />
              </div>
              {/* Progress fill */}
              <div
                className="relative h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
              </div>
              {/* Scanning line effect */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg shadow-white/50"
                style={{
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                  opacity: progress < 100 ? 1 : 0,
                }}
              />
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-600">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="font-mono text-xs text-slate-300">
                {progress < 25 && "Initializing development environment..."}
                {progress >= 25 && progress < 50 && "Loading course modules..."}
                {progress >= 50 && progress < 75 && "Setting up workspace..."}
                {progress >= 75 &&
                  progress < 95 &&
                  "Preparing launch sequence..."}
                {progress >= 95 && "Ready to code! 🚀"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          "<html>",
          "</div>",
          ".class",
          "function()",
          "const",
          "=>",
          "{}",
          "[]",
        ].map((code, i) => (
          <div
            key={i}
            className="absolute font-mono text-neon-cyan/30 text-sm animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
