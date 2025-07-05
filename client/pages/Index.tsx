import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AdminLogin } from "@/components/AdminLogin";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  CheckCircle,
  Code,
  Palette,
  Zap,
  Users,
  Calendar,
  Award,
  MessageCircle,
  Play,
  Github,
  Instagram,
  Youtube,
  BookOpen,
  Monitor,
  Smartphone,
  Globe,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Hero animations
    const tl = gsap.timeline();

    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".hero-buttons",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".countdown-container",
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: -20,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    }

    // Section animations on scroll
    gsap.utils.toArray(".animate-section").forEach((section: any) => {
      gsap.from(section, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Feature cards stagger animation
    gsap.utils.toArray(".feature-card").forEach((card: any, index) => {
      gsap.from(card, {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const targetDate = "2024-07-10T23:59:59";

  const handleAdminLogin = () => {
    navigate("/admin");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      {/* Floating Particles Background */}
      <div
        ref={particlesRef}
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 via-gradient-middle/10 to-gradient-end/20" />

        <div className="container max-w-6xl mx-auto text-center relative z-10">
          <div className="hero-title mb-6">
            <div className="mb-4">
              <span className="font-cyber text-lg md:text-xl text-neon-cyan bg-black/20 px-4 py-2 rounded-full border border-neon-cyan/30 backdrop-blur-sm">
                🚀 GenZ Coding School
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="gradient-text font-cyber">Code Like a</span>
              <br />
              <span className="text-neon-yellow glow-yellow font-cyber">
                LEGEND 💻
              </span>
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-neon-pink mb-4">
              ⚡ 21-Day Elite Bootcamp ⚡
            </div>
          </div>

          <div className="hero-subtitle mb-8">
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              <span className="text-neon-cyan">HTML5</span> •
              <span className="text-neon-purple">CSS3</span> •
              <span className="text-neon-pink">JavaScript</span> •
              <span className="text-neon-green">Tailwind</span> •
              <span className="text-neon-yellow">GSAP</span>
            </p>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              From Zero to Hero in 21 Days | Build Epic Projects | Get Job-Ready
              Skills
            </p>
          </div>

          <div className="hero-buttons mb-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/enrollment?type=join&plan=starter")}
              className="btn-genZ glow-purple text-xl px-12 py-6 rounded-2xl bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan hover:scale-110 transform transition-all duration-300 font-cyber"
            >
              🚀 START CODING - ₹99
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/enrollment?type=demo")}
              className="glass neon-border text-neon-cyan hover:bg-neon-cyan/20 font-bold px-10 py-6 text-lg transition-all duration-300 rounded-2xl font-cyber"
            >
              <Play className="w-6 h-6 mr-3" />
              FREE DEMO 🎯
            </Button>
          </div>

          <div className="countdown-container glass rounded-3xl p-8 max-w-2xl mx-auto backdrop-blur-lg border border-neon-cyan/30">
            <p className="text-neon-yellow font-bold mb-4 text-lg font-cyber">
              ⚡ LEGENDARY DEAL EXPIRES SOON ⚡
            </p>
            <CountdownTimer targetDate={targetDate} />
            <p className="text-gray-400 mt-4 text-sm">
              Join 1000+ GenZ Coders who are already building the future! 🌟
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose GenZ Coding School Section */}
      <section className="animate-section py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-cyan/10"></div>
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 font-cyber">
              <span className="gradient-text">WHY GENZ CODES</span>
              <br />
              <span className="text-neon-yellow">DIFFERENTLY? 🔥</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not your typical boring bootcamp. We speak your language and
              build for the future!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-10 h-10" />,
                title: "Code Like TikTok 📱",
                description:
                  "Build viral web apps that your friends will actually use",
                color: "cyan",
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Lightning Fast ⚡",
                description:
                  "Learn at Gen Z speed - no boring lectures, just pure coding",
                color: "yellow",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Squad Goals 👥",
                description:
                  "Join a community of 1000+ young developers crushing it",
                color: "purple",
              },
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: "24/7 Discord Vibes 💬",
                description: "Get help faster than your WiFi loads Instagram",
                color: "pink",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Flex Your Skills 🏆",
                description:
                  "Get certificates that actually look good on LinkedIn",
                color: "green",
              },
              {
                icon: <Smartphone className="w-10 h-10" />,
                title: "Mobile-First Mindset 📱",
                description:
                  "Build for the screens we actually use - phones first!",
                color: "cyan",
              },
            ].map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="card-genZ glow-cyan group-hover:glow-purple transition-all duration-500 hover:scale-105 transform">
                  <div
                    className={`text-neon-${feature.color} mb-6 flex justify-center glow-${feature.color} p-4 rounded-2xl bg-black/20`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-4 font-cyber text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <CheckCircle className="w-6 h-6 text-neon-green mx-auto pulse-glow" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto border border-neon-pink/30">
              <p className="text-2xl font-bold text-neon-pink mb-4 font-cyber">
                🚀 NO CAP - THIS IS THE FUTURE OF CODING EDUCATION!
              </p>
              <p className="text-gray-300">
                Stop watching tutorials. Start building. Start flexing. Start
                earning. 💰
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="animate-section py-20 px-4 bg-card/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
              Course Curriculum
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                week: "Week 1",
                title: "Foundation",
                topics: [
                  "HTML Fundamentals",
                  "CSS Styling",
                  "Tailwind CSS Basics",
                  "Responsive Design",
                ],
                icon: <Code className="w-8 h-8" />,
              },
              {
                week: "Week 2",
                title: "Interactivity",
                topics: [
                  "JavaScript Fundamentals",
                  "DOM Manipulation",
                  "Event Handling",
                  "Dynamic Content",
                ],
                icon: <Zap className="w-8 h-8" />,
              },
              {
                week: "Week 3",
                title: "Animation",
                topics: [
                  "GSAP Basics",
                  "Timeline Animations",
                  "ScrollTrigger",
                  "Project Building",
                ],
                icon: <Palette className="w-8 h-8" />,
              },
            ].map((week, index) => (
              <Card
                key={index}
                className="feature-card bg-card/80 border-border hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10"
              >
                <CardHeader className="text-center">
                  <div className="text-neon-cyan mb-4 flex justify-center">
                    {week.icon}
                  </div>
                  <Badge
                    variant="outline"
                    className="border-neon-purple text-neon-purple mb-2"
                  >
                    {week.week}
                  </Badge>
                  <CardTitle className="text-xl">{week.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {week.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Join Section */}
      <section className="animate-section py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan text-transparent bg-clip-text">
              Who Should Join?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            This bootcamp is perfect for absolute beginners who want to start
            their frontend development journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["College Students", "Job Seekers", "Career Changers"].map(
              (audience, index) => (
                <Card
                  key={index}
                  className="feature-card bg-gradient-to-br from-card/80 to-card/40 border-border hover:border-neon-green/50 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-neon-green mx-auto mb-4" />
                    <h3 className="font-semibold text-lg">{audience}</h3>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="animate-section py-20 px-4 bg-card/20">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-neon-pink to-neon-cyan text-transparent bg-clip-text">
              Projects You'll Build
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personal Portfolio Website",
                description:
                  "A fully responsive portfolio showcasing your skills",
                icon: <Monitor className="w-8 h-8" />,
              },
              {
                title: "Responsive Login Page",
                description: "Modern login interface built with Tailwind CSS",
                icon: <Smartphone className="w-8 h-8" />,
              },
              {
                title: "Animated Landing Page",
                description: "Interactive page with stunning GSAP animations",
                icon: <Zap className="w-8 h-8" />,
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="feature-card bg-card/80 border-border hover:border-neon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/10"
              >
                <CardHeader>
                  <div className="text-neon-pink mb-4">{project.icon}</div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="animate-section py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
              What Students Say
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "College Student",
                content:
                  "Amazing course! I went from zero to building my own websites in just 21 days. Praveen sir explains everything so clearly.",
                rating: 5,
              },
              {
                name: "Priya Patel",
                role: "Job Seeker",
                content:
                  "The hands-on approach and daily doubt support made all the difference. Got my first frontend job after completing this bootcamp!",
                rating: 5,
              },
              {
                name: "Arjun Kumar",
                role: "Working Professional",
                content:
                  "Perfect for beginners! The ₹99 fee is incredibly affordable for the quality of content and support provided.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="feature-card bg-card/80 border-border hover:border-neon-cyan/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-neon-cyan text-neon-cyan"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="animate-section py-20 px-4 bg-card/20">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
              Meet Your Instructor
            </span>
          </h2>

          <Card className="bg-card/80 border-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Avatar className="w-32 h-32 mx-auto mb-6">
                <AvatarImage src="/placeholder.svg" alt="Praveen Kumawat" />
                <AvatarFallback className="bg-gradient-to-r from-neon-purple to-neon-pink text-white text-2xl">
                  PK
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold mb-4">
                Hi, I'm Praveen Kumawat
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I've trained 1000+ students and help beginners become frontend
                developers. My mission is to make web development accessible and
                fun for everyone.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="animate-section py-20 px-4" data-section="pricing">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan text-transparent bg-clip-text">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Select the perfect plan for your learning journey. All plans include
            lifetime access!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-card/80 border-border hover:border-neon-green/50 transition-all duration-300 relative">
              <CardHeader className="text-center">
                <Badge
                  variant="outline"
                  className="border-neon-green text-neon-green mb-2 mx-auto w-fit"
                >
                  Most Popular
                </Badge>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-neon-green to-neon-cyan text-transparent bg-clip-text">
                    ₹99
                  </span>
                </div>
                <CardDescription className="text-base">
                  Perfect for beginners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "21 Days Live Classes",
                  "Recorded Sessions Access",
                  "3 Guided Projects",
                  "WhatsApp Support",
                  "Completion Certificate",
                  "Community Access",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button
                  size="lg"
                  onClick={() => navigate("/enrollment?type=join&plan=starter")}
                  className="w-full bg-gradient-to-r from-neon-green to-neon-cyan hover:from-neon-green/80 hover:to-neon-cyan/80 text-background font-bold py-3 text-base shadow-lg hover:shadow-neon-green/25 transition-all duration-300 mt-6"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 border-neon-purple border-2 hover:border-neon-purple/80 transition-all duration-300 relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-neon-purple to-neon-pink text-white px-4 py-1">
                  RECOMMENDED
                </Badge>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
                    ₹199
                  </span>
                </div>
                <CardDescription className="text-base">
                  Best value for serious learners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Everything in Starter",
                  "1-on-1 Doubt Sessions (3x)",
                  "Portfolio Review & Feedback",
                  "Interview Preparation",
                  "Job Referrals Network",
                  "Premium Resources & Tools",
                  "Priority Support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-neon-purple flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button
                  size="lg"
                  onClick={() => navigate("/enrollment?type=join&plan=pro")}
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-bold py-3 text-base shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 mt-6"
                >
                  Go Pro
                </Button>
              </CardContent>
            </Card>

            {/* Elite Plan */}
            <Card className="bg-card/80 border-border hover:border-neon-cyan/50 transition-all duration-300 relative">
              <CardHeader className="text-center">
                <Badge
                  variant="outline"
                  className="border-neon-cyan text-neon-cyan mb-2 mx-auto w-fit"
                >
                  Premium
                </Badge>
                <CardTitle className="text-2xl">Elite</CardTitle>
                <div className="text-5xl font-bold">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
                    ₹399
                  </span>
                </div>
                <CardDescription className="text-base">
                  Complete career transformation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Everything in Pro",
                  "Unlimited 1-on-1 Sessions",
                  "Live Portfolio Building",
                  "Mock Interviews (5x)",
                  "LinkedIn Profile Optimization",
                  "Guaranteed Job Referrals",
                  "6 Months Career Mentorship",
                  "Advanced React/Node.js Bonus",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button
                  size="lg"
                  onClick={() => navigate("/enrollment?type=join&plan=elite")}
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80 text-background font-bold py-3 text-base shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300 mt-6"
                >
                  Go Elite
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              🔒 All plans include lifetime access • 7-day money-back guarantee
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                Certificate Included
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Community Access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="animate-section py-20 px-4 bg-card/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
              Frequently Asked Questions
            </span>
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Do I need any prior coding experience?",
                answer:
                  "No! This bootcamp is designed for complete beginners. We start from the very basics and build up your skills step by step.",
              },
              {
                question: "Will I get recordings of the live classes?",
                answer:
                  "Yes, all live sessions are recorded and you'll have lifetime access to them. You can watch them anytime at your own pace.",
              },
              {
                question: "What kind of certificate will I receive?",
                answer:
                  "You'll receive a completion certificate after successfully finishing all projects and assessments. This certificate demonstrates your new frontend development skills.",
              },
              {
                question: "How does the WhatsApp doubt support work?",
                answer:
                  "We have a dedicated WhatsApp group where you can ask questions anytime. Our instructors and TAs respond quickly to help you resolve any doubts.",
              },
              {
                question: "Is there any refund policy?",
                answer:
                  "We offer a 7-day money-back guarantee. If you're not satisfied within the first week, we'll refund your full payment.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left hover:text-neon-cyan transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="animate-section py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan text-transparent bg-clip-text">
              Join 100+ Students Now & Become a Frontend Hero!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Don't miss this opportunity to transform your career. Start your
            frontend development journey today!
          </p>

          <Button
            size="lg"
            onClick={() => {
              const pricingSection = document.querySelector(
                '[data-section="pricing"]',
              );
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-neon-purple/25 transition-all duration-300 hover:scale-105"
          >
            Choose Your Plan
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-transparent bg-clip-text">
                Frontend Bootcamp
              </h3>
              <p className="text-muted-foreground">
                Transform your career with our intensive 21-day frontend
                development program.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    Course Content
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex justify-center md:justify-start gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neon-cyan hover:bg-neon-cyan hover:text-background"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neon-purple hover:bg-neon-purple hover:text-background"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neon-pink hover:bg-neon-pink hover:text-background"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    className="hover:text-neon-cyan transition-colors"
                  >
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <div className="flex items-center justify-between">
              <p>&copy; 2024 Frontend Bootcamp. All rights reserved.</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminLogin(true)}
                className="text-muted-foreground hover:text-neon-cyan transition-colors"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      {/* Support ChatBot */}
      <ChatBot />
    </div>
  );
}
