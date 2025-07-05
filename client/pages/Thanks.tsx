import { useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  MessageCircle,
  Mail,
  Instagram,
  Youtube,
  Github,
  Phone,
  Calendar,
  BookOpen,
  Users,
  Award,
  Clock,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Thanks() {
  const [searchParams] = useSearchParams();
  const enrollmentType = searchParams.get("type") || "join";
  const successRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Celebration animation
    const tl = gsap.timeline();

    tl.from(".success-header", {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1,
      ease: "back.out(2)",
    })
      .from(
        ".success-content",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".contact-cards",
        {
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".next-steps",
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );

    // Floating celebration particles
    const particles = document.querySelectorAll(".celebration-particle");
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -100,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        scale: 0,
        duration: 2 + Math.random() * 2,
        delay: index * 0.1,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 3,
      });
    });
  }, []);

  const isDemo = enrollmentType === "demo";

  const userEmail = searchParams.get("email") || "user@example.com";
  const selectedPlan = searchParams.get("plan") || "starter";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      {/* Celebration particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="celebration-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-neon-cyan opacity-60" />
          </div>
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Success Header */}
        <div className="success-header text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <Badge
            variant="outline"
            className="border-neon-green text-neon-green mb-4"
          >
            {isDemo ? "Demo Booked Successfully!" : "Enrollment Complete!"}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple text-transparent bg-clip-text">
              {isDemo ? "🎯 Demo Confirmed!" : "🎉 Welcome to the Bootcamp!"}
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isDemo
              ? "Thank you for booking your free demo session! We're excited to show you what our bootcamp is all about."
              : "Congratulations! You've taken the first step towards becoming a frontend developer. Your journey starts now!"}
          </p>
        </div>

        {/* Success Content */}
        <div className="success-content mb-12">
          <Card className="bg-gradient-to-br from-card/80 to-card/40 border-neon-cyan/30 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isDemo ? "What Happens Next?" : "Course Access Information"}
              </CardTitle>
              <CardDescription className="text-lg">
                {isDemo
                  ? "Here's what you can expect for your demo session"
                  : "Everything you need to know about accessing your course"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {isDemo ? "Demo Timing" : "Course Access"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isDemo
                          ? "You'll receive the demo session link within 2 hours via WhatsApp"
                          : "Course materials and class links will be shared within 10 minutes"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-6 h-6 text-neon-purple flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp Group</h4>
                      <p className="text-sm text-muted-foreground">
                        {isDemo
                          ? "Demo attendees group for Q&A and updates"
                          : "You'll be added to the main bootcamp WhatsApp group"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-neon-pink flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">
                        {isDemo ? "Demo Content" : "Learning Materials"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {isDemo
                          ? "HTML basics, course overview, and Q&A session"
                          : "Complete course materials, projects, and assignments"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-neon-green flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Community Support</h4>
                      <p className="text-sm text-muted-foreground">
                        {isDemo
                          ? "Connect with other demo attendees and current students"
                          : "24/7 community support and peer learning"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="contact-cards mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text">
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <Card className="bg-card/80 border-border hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed queries & support
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
                >
                  <a href="mailto:praveen@frontendbootcamp.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Instagram */}
            <Card className="bg-card/80 border-border hover:border-neon-pink/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/10">
              <CardContent className="p-6 text-center">
                <Instagram className="w-12 h-12 text-neon-pink mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instagram</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tips & behind the scenes
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background"
                >
                  <a
                    href="https://instagram.com/praveenkumawat_dev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Follow
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card className="bg-card/80 border-border hover:border-neon-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/10">
              <CardContent className="p-6 text-center">
                <Youtube className="w-12 h-12 text-neon-purple mx-auto mb-4" />
                <h3 className="font-semibold mb-2">YouTube</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Free tutorials & content
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-background"
                >
                  <a
                    href="https://youtube.com/@praveenkumawat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Subscribe
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <Card className="bg-gradient-to-br from-card/80 to-card/40 border-neon-cyan/30 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isDemo ? "Prepare for Your Demo" : "Next Steps"}
              </CardTitle>
              <CardDescription>
                {isDemo
                  ? "Get the most out of your demo session"
                  : "What to do while waiting for course access"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-4">
                    {isDemo ? "Demo Preparation" : "Immediate Actions"}
                  </h4>
                  <ul className="space-y-3">
                    {(isDemo
                      ? [
                          "Prepare any questions about web development",
                          "Have a notepad ready for taking notes",
                          "Ensure stable internet connection",
                          "Join from a quiet environment",
                        ]
                      : [
                          "Check your WhatsApp for course group invite",
                          "Set up your development environment",
                          "Download recommended code editor (VS Code)",
                          "Join our Discord community for extra support",
                        ]
                    ).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg mb-4">
                    {isDemo ? "After Demo" : "Course Resources"}
                  </h4>
                  <ul className="space-y-3">
                    {(isDemo
                      ? [
                          "Receive special enrollment discount",
                          "Get course roadmap and timeline",
                          "Access to beginner resources",
                          "Priority support for enrollment",
                        ]
                      : [
                          "Access to course portal and materials",
                          "Live class schedule and recordings",
                          "Project assignments and guidelines",
                          "Certificate upon completion",
                        ]
                    ).map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-neon-purple flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions? Contact us via email or phone!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80"
                  >
                    <a href="mailto:praveen@frontendbootcamp.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-background"
                  >
                    <Link to="/">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-center">
          <Card className="bg-card/40 border-border/30 max-w-md mx-auto">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Support Contact</h4>
              <p className="text-sm text-muted-foreground mb-3">
                For any questions or technical support
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
              >
                <a href="mailto:praveen@frontendbootcamp.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
