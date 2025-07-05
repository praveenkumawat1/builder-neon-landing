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
  Tag,
  CheckCircle,
  AlertCircle,
  Calculator,
  Percent,
  Gift,
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

const coupons = {
  STUDENT50: { discount: 50, type: "amount", description: "Student Discount" },
  FIRST20: {
    discount: 20,
    type: "percentage",
    description: "First Time Buyer",
  },
  SAVE30: { discount: 30, type: "amount", description: "Special Offer" },
  WELCOME15: { discount: 15, type: "percentage", description: "Welcome Bonus" },
};

export default function TotalFees() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("plan") || "starter";
  const plan = planDetails[planId];

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");

  const GST_RATE = 0.18; // 18%
  const basePrice = plan.price;

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = (basePrice * appliedCoupon.discount) / 100;
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }

  const discountedPrice = Math.max(0, basePrice - discountAmount);
  const gstAmount = discountedPrice * GST_RATE;
  const totalAmount = discountedPrice + gstAmount;

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase() as keyof typeof coupons];
    if (coupon) {
      setAppliedCoupon({ ...coupon, code: couponCode.toUpperCase() });
      setCouponError("");
      toast({
        title: "Coupon Applied!",
        description: `${coupon.description} - ₹${coupon.type === "percentage" ? Math.round((basePrice * coupon.discount) / 100) : coupon.discount} off`,
      });
    } else {
      setCouponError("Invalid coupon code");
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    toast({
      title: "Coupon Removed",
      description: "Coupon discount has been removed",
    });
  };

  const proceedToPayment = () => {
    // Pass the final amount and coupon details to enrollment page
    const params = new URLSearchParams({
      type: "join",
      plan: planId,
      finalAmount: totalAmount.toFixed(2),
      baseAmount: basePrice.toString(),
      gstAmount: gstAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      ...(appliedCoupon && { couponCode: appliedCoupon.code }),
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

            {/* Coupon Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Promo Code
                </CardTitle>
                <CardDescription>
                  Have a discount code? Apply it here to save money!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter coupon code (e.g., STUDENT50)"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError("");
                        }}
                        className={couponError ? "border-red-500" : ""}
                      />
                      {couponError && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="bg-gradient-to-r from-neon-purple to-neon-pink"
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">
                            {appliedCoupon.code} Applied
                          </p>
                          <p className="text-sm text-green-600">
                            {appliedCoupon.description} - ₹
                            {discountAmount.toFixed(0)} off
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                {/* Available Coupons */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-3">Available Offers:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(coupons).map(([code, coupon]) => (
                      <div
                        key={code}
                        className="text-xs bg-gray-50 rounded p-2 border cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setCouponCode(code);
                          applyCoupon();
                        }}
                      >
                        <span className="font-mono font-bold text-neon-purple">
                          {code}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {coupon.type === "percentage"
                            ? `${coupon.discount}% off`
                            : `₹${coupon.discount} off`}
                        </span>
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

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{discountedPrice.toFixed(0)}</span>
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
                {appliedCoupon && (
                  <p>• Discount: -₹{discountAmount.toFixed(0)}</p>
                )}
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
