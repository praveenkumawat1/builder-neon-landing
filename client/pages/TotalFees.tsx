import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Calculator,
  Percent,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "@/hooks/use-toast";

interface PlanDetails {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  color: string;
}

const planDetails: Record<string, PlanDetails> = {
  starter: {
    id: "starter",
    name: "Starter Plan",
    price: 149,
    features: [
      "21 Days Live Classes",
      "Recorded Sessions Access",
      "3 Guided Projects",
      "WhatsApp Support",
      "Completion Certificate",
      "Community Access",
    ],
    color: "text-neon-green",
  },
  pro: {
    id: "pro",
    name: "Pro Plan",
    price: 199,
    features: [
      "Everything in Starter",
      "1-on-1 Doubt Sessions (3x)",
      "Portfolio Review & Feedback",
      "Interview Preparation",
      "Job Referrals Network",
      "Premium Resources & Tools",
      "Priority Support",
    ],
    color: "text-neon-purple",
  },
  elite: {
    id: "elite",
    name: "Elite Plan",
    price: 299,
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
    color: "text-neon-cyan",
  },
};

export default function TotalFees() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("plan") || "starter";
  const plan = planDetails[planId];

  const GST_RATE = 0.18; // 18%
  const basePrice = plan.price;
  const gstAmount = basePrice * GST_RATE;
  const totalAmount = basePrice + gstAmount;

  const proceedToPayment = () => {
    // Pass the final amount details to enrollment page
    const params = new URLSearchParams({
      type: "join",
      plan: planId,
      finalAmount: totalAmount.toFixed(2),
      baseAmount: basePrice.toString(),
      gstAmount: gstAmount.toFixed(2),
    });

    navigate(`/enrollment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />

      {/* Header */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Fee Calculation</h1>
            <p className="text-muted-foreground">
              Review your order and apply discounts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {plan.name}
                  </CardTitle>
                  <Badge className="bg-neon-purple text-white">
                    Selected Plan
                  </Badge>
                </div>
                <CardDescription>
                  GenZ Coding School - Frontend Development Bootcamp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold">What's Included:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Breakdown */}
          <Card className="h-fit sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Fee Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Course Fee</span>
                  <span>₹{basePrice}</span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    GST (18%)
                  </span>
                  <span>₹{gstAmount.toFixed(0)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className={plan.color}>₹{totalAmount.toFixed(0)}</span>
              </div>

              <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded">
                <p className="font-medium mb-1">Pricing Details:</p>
                <p>• Base Price: ₹{basePrice}</p>
                <p>• GST (18%): ₹{gstAmount.toFixed(0)}</p>
                <p className="font-medium mt-1">
                  Final Total: ₹{totalAmount.toFixed(0)}
                </p>
              </div>

              <Button
                onClick={proceedToPayment}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80 text-white font-bold py-3 text-lg shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
              >
                Proceed to Payment
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment • 7-day money back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
