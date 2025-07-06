import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
  Smartphone,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatBot } from "@/components/ChatBot";

export default function Enrollment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const enrollmentType = searchParams.get("type") || "join";
  const selectedPlan = searchParams.get("plan") || "starter";
  const formRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
    transactionId: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      console.log("Submission already in progress, preventing duplicate");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      if (isDemo) {
        const enrollmentData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          education: formData.education,
          experience: formData.experience,
          motivation: formData.motivation,
          enrollmentType: "demo" as const,
          selectedPlan: "starter" as const,
        };
        let response;
        let result;
        try {
          response = await fetch("/api/enrollment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollmentData),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          result = await response.json();
        } catch (fetchError) {
          console.error("Demo fetch error:", fetchError);
          setIsSubmitting(false);
          toast({
            title: "Network Error",
            description: "Failed to submit demo request. Please try again.",
            variant: "destructive",
          });
          return;
        }
        if (result.success) {
          toast({
            title: "Demo Booked Successfully! 🎉",
            description: "Your request has been saved. Redirecting...",
          });
          setTimeout(() => {
            navigate(
              `/thanks?type=demo&email=${encodeURIComponent(formData.email)}`,
            );
          }, 1500);
        } else {
          toast({
            title: "Booking Failed",
            description: result.message || "Please try again.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }
      if (showPayment) {
        if (!formData.transactionId) {
          toast({
            title: "Transaction ID Required",
            description:
              "Please enter your payment transaction ID to complete enrollment.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        let response;
        let result;
        try {
          response = await fetch(
            `/api/enrollment/${encodeURIComponent(formData.email)}/transaction`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ transactionId: formData.transactionId }),
            },
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          result = await response.json();
        } catch (fetchError) {
          console.error("Transaction update error:", fetchError);
          setIsSubmitting(false);
          toast({
            title: "Network Error",
            description: "Failed to update transaction. Please try again.",
            variant: "destructive",
          });
          return;
        }
        if (result.success) {
          toast({
            title: "Enrollment Completed! 🚀",
            description: "Your enrollment has been confirmed. Redirecting...",
          });
          setTimeout(() => {
            navigate(
              `/thanks?type=join&email=${encodeURIComponent(formData.email)}`,
            );
          }, 1500);
        } else {
          toast({
            title: "Update Failed",
            description: result.message || "Please try again.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }
      const basicEnrollmentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        experience: formData.experience,
        motivation: formData.motivation,
        enrollmentType: "join" as const,
        selectedPlan: selectedPlan as "starter" | "pro" | "elite",
      };
      let response;
      let result;
      try {
        response = await fetch("/api/enrollment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(basicEnrollmentData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        result = await response.json();
      } catch (fetchError) {
        console.error("Basic enrollment error:", fetchError);
        setIsSubmitting(false);
        toast({
          title: "Network Error",
          description: "Failed to submit enrollment. Please try again.",
          variant: "destructive",
        });
        return;
      }
      if (result.success) {
        setShowPayment(true);
        gsap.to(qrRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
        toast({
          title: "Form Submitted!",
          description:
            "Please make payment and enter transaction ID to complete enrollment.",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText("9772546873@pthdfc");
    toast({
      title: "UPI ID Copied!",
      description: "The UPI ID has been copied to your clipboard.",
    });
  };

  const isDemo = enrollmentType === "demo";

  const planConfig = {
    starter: {
      name: "Starter Plan",
      price: "₹149",
      color: "neon-green",
      features: [
        "21 Days Live Classes",
        "Recorded Sessions Access",
        "3 Guided Projects",
        "WhatsApp Support",
        "Completion Certificate",
        "Community Access",
      ],
    },
    pro: {
      name: "Pro Plan",
      price: "₹199",
      color: "neon-purple",
      features: [
        "Everything in Starter",
        "1-on-1 Doubt Sessions (3x)",
        "Portfolio Review & Feedback",
        "Interview Preparation",
        "Job Referrals Network",
        "Premium Resources & Tools",
        "Priority Support",
      ],
    },
    elite: {
      name: "Elite Plan",
      price: "₹299",
      color: "neon-cyan",
      features: [
        "Everything in Pro",
        "Unlimited 1-on-1 Sessions",
        "Live Portfolio Building",
        "Mock Interviews (5x)",
        "LinkedIn Profile Optimization",
        "Guaranteed Job Referrals",
        "6 Months Career Mentorship",
        "Advanced React/Node.js Bonus",
      ],
    },
  };

  const currentPlan =
    planConfig[selectedPlan as keyof typeof planConfig] || planConfig.starter;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
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
                  : `🚀 Join ${currentPlan.name}`}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isDemo
                ? "Experience our teaching style with a free 1-hour demo session covering HTML basics and live Q&A"
                : `Complete your enrollment for the ${currentPlan.name} and start your frontend development journey`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      placeholder="+91 97725 46873"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-background/50 border-border focus:border-neon-cyan"
                      required
                      minLength={10}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your WhatsApp number for course updates
                    </p>
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
                        <SelectItem value="postgraduate">
                          Postgraduate
                        </SelectItem>
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
                  {!isDemo && showPayment && (
                    <div className="space-y-2 p-4 border border-neon-cyan/30 rounded-lg bg-neon-cyan/5">
                      <Label htmlFor="transactionId">
                        Transaction ID / UPI Reference Number{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="transactionId"
                        placeholder="Enter your payment transaction ID"
                        value={formData.transactionId}
                        onChange={(e) =>
                          handleInputChange("transactionId", e.target.value)
                        }
                        className="bg-background/50 border-border focus:border-neon-cyan"
                        required={showPayment && !isDemo}
                      />
                      <p className="text-xs text-muted-foreground">
                        💡 Enter the transaction ID from your UPI payment to
                        complete enrollment verification
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.email ||
                      !formData.phone
                    }
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      if (isSubmitting) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : isDemo ? (
                      "🎯 Book Free Demo"
                    ) : showPayment && formData.transactionId ? (
                      "✅ Complete Enrollment"
                    ) : (
                      `💰 Proceed to Payment (${currentPlan.price})`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
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
                    : "Secure payment via UPI - Pay ₹149 to complete enrollment"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isDemo ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Free Demo Session
                    </h3>
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
                        <span
                          className={`bg-gradient-to-r from-${currentPlan.color} to-neon-cyan text-transparent bg-clip-text`}
                        >
                          {currentPlan.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {currentPlan.name} • Lifetime access
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg mb-4 mx-auto w-fit">
                     <img
                        src="/qr-code.png" // Assumes image is in public/ folder
                        alt="UPI QR Code"
                        className="w-48 h-48 object-contain"
                      />
                        <div className="text-center mb-4">
                          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-600">
                            Scan QR Code
                          </p>
                          <p className="text-xs text-gray-500">
                            Or use UPI ID below
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${
                                [0, 2, 6, 8].includes(i)
                                  ? "bg-black"
                                  : Math.random() > 0.5
                                    ? "bg-black"
                                    : "bg-white border border-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="font-semibold mb-2">Scan QR Code or</p>
                        <div className="bg-background/50 rounded-lg p-3 border border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              UPI ID: 9772546873@pthdfc
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
                          After payment, enter your transaction ID above to
                          complete enrollment
                        </p>
                        <p>You'll receive course access within 10 minutes</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card/40 to-card/20 border-neon-purple/30 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isDemo ? "What's Included in Demo" : "What You Get"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {(isDemo
                    ? [
                        "1-hour live session",
                        "HTML basics walkthrough",
                        "Q&A with instructor",
                        "Course overview & roadmap",
                        "Special enrollment discount",
                      ]
                    : currentPlan.features
                  ).map((benefit, index) => (
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
      <ChatBot />
    </div>
  );
}
