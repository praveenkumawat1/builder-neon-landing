import { useEffect, useRef, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  CheckCircle,
  Copy,
  QrCode,
  Smartphone,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Enrollment() {
  const [searchParams] = useSearchParams();
  const enrollmentType = searchParams.get("type") || "join";
  const formRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
  });
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    // Animate form entrance
    const tl = gsap.timeline();

    tl.from(".form-header", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".form-content",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        ".payment-section",
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Show payment section
    setShowPayment(true);

    // Animate to payment section
    gsap.to(qrRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    toast({
      title: "Form Submitted!",
      description: "Please proceed with payment to complete enrollment.",
    });
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("praveenkumawat@paytm");
    toast({
      title: "UPI ID Copied!",
      description: "The UPI ID has been copied to your clipboard.",
    });
  };

  const isDemo = enrollmentType === "demo";

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="form-header mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center">
            <Badge
              variant="outline"
              className="border-neon-purple text-neon-purple mb-4"
            >
              {isDemo ? "Free Demo Session" : "Full Bootcamp Enrollment"}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-transparent bg-clip-text">
                {isDemo
                  ? "🎯 Get Your Free Demo"
                  : "🚀 Join the Bootcamp"}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isDemo
                ? "Experience our teaching style with a free 1-hour demo session covering HTML basics and live Q&A"
                : "Complete your enrollment to secure your spot in the 21-day Frontend Bootcamp"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrollment Form */}
          <div className="form-content">
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  {isDemo ? "Demo Registration" : "Enrollment Details"}
                </CardTitle>
                <CardDescription>
                  {isDemo
                    ? "Fill in your details to book your free demo session"
                    : "Complete the form below to start your frontend journey"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-background/50 border-border focus:border-neon-cyan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-background/50 border-border focus:border-neon-cyan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-background/50 border-border focus:border-neon-cyan"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Background</Label>
                    <Select
                      value={formData.education}
                      onValueChange={(value) =>
                        handleInputChange("education", value)
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border focus:border-neon-cyan">
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="undergraduate">
                          Undergraduate
                        </SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Programming Experience (Optional)
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) =>
                        handleInputChange("experience", value)
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border focus:border-neon-cyan">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Complete Beginner</SelectItem>
                        <SelectItem value="basic">
                          Basic (HTML/CSS only)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate (Some JavaScript)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced (Multiple Languages)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      Why do you want to join? (Optional)
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Tell us about your goals and what you hope to achieve..."
                      value={formData.motivation}
                      onChange={(e) =>
                        handleInputChange("motivation", e.target.value)
                      }
                      className="bg-background/50 border-border focus:border-neon-cyan min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
                  >
                    {isDemo
                      ? "🎯 Book Free Demo"
                      : "💰 Proceed to Payment (₹99)"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="payment-section">
            <Card className="bg-card/80 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-neon-green" />
                  {isDemo ? "Demo Access" : "Payment Information"}
                </CardTitle>
                <CardDescription>
                  {isDemo
                    ? "Your demo session is completely free!"
                    : "Secure payment via UPI - Pay ₹99 to complete enrollment"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isDemo ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Free Demo Session</h3>
                    <p className="text-muted-foreground mb-4">
                      No payment required for the demo!
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 justify-center">
                        <Clock className="w-4 h-4 text-neon-cyan" />
                        <span>Duration: 1 hour</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <Smartphone className="w-4 h-4 text-neon-cyan" />
                        <span>Join link sent via WhatsApp</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={qrRef}
                    className={`transition-all duration-500 ${
                      showPayment
                        ? "opacity-100 scale-100"
                        : "opacity-50 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-neon-green to-neon-cyan text-transparent bg-clip-text">
                          ₹99
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        One-time payment • Lifetime access
                      </p>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="bg-white p-4 rounded-lg mb-4 mx-auto w-fit">
                      <div className="w-48 h-48 bg-black relative">
                        <div className="absolute inset-2 bg-white flex items-center justify-center">
                          <QrCode className="w-20 h-20 text-black" />
                        </div>
                        {/* Simple QR pattern simulation */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-black"></div>
                        <div className="absolute top-2 right-2 w-8 h-8 bg-black"></div>
                        <div className="absolute bottom-2 left-2 w-8 h-8 bg-black"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="font-semibold mb-2">Scan QR Code or</p>
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              UPI ID: praveenkumawat@paytm
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={copyUpiId}
                              className="text-neon-cyan hover:bg-neon-cyan hover:text-background"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                        <Shield className="w-4 h-4 text-neon-green" />
                        <span>Secure payment via UPI</span>
                      </div>

                      <div className="text-xs text-muted-foreground text-center space-y-1">
                        <p>
                          After payment, send screenshot to{" "}
                          <span className="text-neon-cyan">+91 98765 43210</span>
                        </p>
                        <p>You'll receive course access within 10 minutes</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Benefits Reminder */}
            <Card className="bg-gradient-to-br from-card/40 to-card/20 border-neon-purple/30 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isDemo ? "What's Included in Demo" : "What You Get"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {isDemo
                    ? [
                        "1-hour live session",
                        "HTML basics walkthrough",
                        "Q&A with instructor",
                        "Course overview & roadmap",
                        "Special enrollment discount",
                      ]
                    : [
                        "21 days live + recorded classes",
                        "3 real-world projects",
                        "Completion certificate",
                        "WhatsApp doubt support",
                        "Community access",
                        "Lifetime course updates",
                      ]
                  }.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}