import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Target,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  BookOpen,
  Code,
  Zap,
  Award,
  BarChart3,
} from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  status: "not-started" | "in-progress" | "completed";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const learningModules: LearningModule[] = [
  {
    id: "1",
    title: "HTML Fundamentals",
    description: "Master the building blocks of the web",
    progress: 100,
    totalLessons: 12,
    completedLessons: 12,
    estimatedTime: "8 hours",
    difficulty: "Beginner",
    skills: ["HTML5", "Semantic HTML", "Accessibility"],
    status: "completed",
  },
  {
    id: "2",
    title: "CSS Mastery",
    description: "Style your web pages like a pro",
    progress: 75,
    totalLessons: 15,
    completedLessons: 11,
    estimatedTime: "12 hours",
    difficulty: "Intermediate",
    skills: ["CSS3", "Flexbox", "Grid", "Animations"],
    status: "in-progress",
  },
  {
    id: "3",
    title: "JavaScript Essentials",
    description: "Add interactivity to your websites",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    estimatedTime: "16 hours",
    difficulty: "Intermediate",
    skills: ["ES6+", "DOM Manipulation", "Events", "APIs"],
    status: "in-progress",
  },
  {
    id: "4",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework",
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    estimatedTime: "6 hours",
    difficulty: "Beginner",
    skills: ["Utility Classes", "Responsive Design", "Customization"],
    status: "not-started",
  },
  {
    id: "5",
    title: "GSAP Animations",
    description: "Professional web animations",
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    estimatedTime: "10 hours",
    difficulty: "Advanced",
    skills: ["Timeline", "ScrollTrigger", "Morphing", "Physics"],
    status: "not-started",
  },
];

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: <CheckCircle className="w-6 h-6" />,
    unlocked: true,
    date: "2024-01-15",
    rarity: "common",
  },
  {
    id: "2",
    title: "HTML Master",
    description: "Complete all HTML lessons",
    icon: <Trophy className="w-6 h-6" />,
    unlocked: true,
    date: "2024-01-20",
    rarity: "rare",
  },
  {
    id: "3",
    title: "Speed Demon",
    description: "Complete 5 lessons in one day",
    icon: <Zap className="w-6 h-6" />,
    unlocked: true,
    date: "2024-01-18",
    rarity: "epic",
  },
  {
    id: "4",
    title: "Code Warrior",
    description: "Write your first 1000 lines of code",
    icon: <Code className="w-6 h-6" />,
    unlocked: false,
    rarity: "epic",
  },
  {
    id: "5",
    title: "Legend",
    description: "Complete the entire bootcamp",
    icon: <Award className="w-6 h-6" />,
    unlocked: false,
    rarity: "legendary",
  },
];

export function ProgressDashboard() {
  const [selectedModule, setSelectedModule] = useState(learningModules[0]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [streakDays, setStreakDays] = useState(7);
  const [totalHours, setTotalHours] = useState(28);

  useEffect(() => {
    const totalLessons = learningModules.reduce(
      (sum, module) => sum + module.totalLessons,
      0,
    );
    const completedLessons = learningModules.reduce(
      (sum, module) => sum + module.completedLessons,
      0,
    );
    setOverallProgress((completedLessons / totalLessons) * 100);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-50";
      case "rare":
        return "border-blue-400 bg-blue-50";
      case "epic":
        return "border-purple-400 bg-purple-50";
      case "legendary":
        return "border-yellow-400 bg-yellow-50";
      default:
        return "border-gray-400 bg-gray-50";
    }
  };

  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
            Learning Progress Dashboard
          </span>
        </h2>
        <p className="text-muted-foreground">
          Track your learning journey and celebrate achievements
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-purple/10 rounded-lg">
                <Target className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Progress
                </p>
                <p className="text-2xl font-bold">
                  {Math.round(overallProgress)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-cyan/10 rounded-lg">
                <Zap className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold">{streakDays} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-green/10 rounded-lg">
                <Clock className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">{totalHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neon-yellow/10 rounded-lg">
                <Trophy className="w-6 h-6 text-neon-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">
                  {unlockedAchievements.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Learning Modules Tab */}
        <TabsContent value="modules" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module List */}
            <div className="lg:col-span-2 space-y-4">
              {learningModules.map((module) => (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedModule.id === module.id
                      ? "border-neon-cyan bg-card/80"
                      : "hover:border-neon-cyan/50"
                  }`}
                  onClick={() => setSelectedModule(module)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(module.status)}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{module.difficulty}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {module.completedLessons}/{module.totalLessons}{" "}
                          lessons
                        </span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {module.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Module Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(selectedModule.status)}
                  {selectedModule.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedModule.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">
                      {selectedModule.progress}%
                    </span>
                  </div>
                  <Progress value={selectedModule.progress} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Lessons</span>
                    <p className="font-medium">
                      {selectedModule.completedLessons}/
                      {selectedModule.totalLessons}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time</span>
                    <p className="font-medium">
                      {selectedModule.estimatedTime}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Skills</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedModule.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink">
                  {selectedModule.status === "not-started"
                    ? "Start Module"
                    : selectedModule.status === "completed"
                      ? "Review Module"
                      : "Continue Learning"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${getRarityColor(achievement.rarity)} ${
                  achievement.unlocked ? "opacity-100" : "opacity-50 grayscale"
                } transition-all duration-300`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-4 rounded-full mb-4 ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {achievement.rarity}
                    </Badge>
                    {achievement.unlocked && achievement.date && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: "Monday", hours: 2.5, completed: 3 },
                    { day: "Tuesday", hours: 1.5, completed: 2 },
                    { day: "Wednesday", hours: 3.0, completed: 4 },
                    { day: "Thursday", hours: 2.0, completed: 2 },
                    { day: "Friday", hours: 4.0, completed: 5 },
                    { day: "Saturday", hours: 3.5, completed: 4 },
                    { day: "Sunday", hours: 1.0, completed: 1 },
                  ].map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{day.day}</span>
                        <span>
                          {day.hours}h • {day.completed} lessons
                        </span>
                      </div>
                      <Progress value={day.hours * 20} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Learning Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-purple">85%</div>
                  <p className="text-sm text-muted-foreground">
                    Completion Rate
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Session</span>
                    <span className="font-medium">2.4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Best Learning Day</span>
                    <span className="font-medium">Friday</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Favorite Topic</span>
                    <span className="font-medium">CSS Animations</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Next Milestone
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Complete JavaScript Module</span>
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
