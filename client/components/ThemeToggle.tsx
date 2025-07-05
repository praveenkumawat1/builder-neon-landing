import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to dark theme
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: "dark" | "light") => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        theme === "dark"
          ? "border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-background"
          : "border-gray-300 text-gray-700 hover:bg-gray-100"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="ml-2 hidden sm:inline">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </Button>
  );
}
