import { useEffect, useState } from "react";
import { gsap } from "gsap";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress with smooth animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      // Animate out the loading screen
      gsap.to(".loading-screen", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
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
    <div className="loading-screen fixed inset-0 bg-gradient-to-br from-background via-background/95 to-background/90 z-[9999] flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-full animate-spin opacity-75"></div>
            <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
                FB
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-transparent bg-clip-text">
              Frontend Bootcamp
            </span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Loading your learning experience...
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative mb-4">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading tips */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="animate-pulse">
            {progress < 30 && "🚀 Initializing bootcamp experience..."}
            {progress >= 30 && progress < 60 && "📚 Loading course content..."}
            {progress >= 60 && progress < 90 && "⚡ Setting up animations..."}
            {progress >= 90 && "✨ Almost ready!"}
          </p>
        </div>
      </div>
    </div>
  );
}
