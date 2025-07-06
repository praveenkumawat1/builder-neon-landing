import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Phone,
  Mail,
  Clock,
  DollarSign,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
}

const FAQ_RESPONSES = {
  pricing: {
    text: "Our bootcamp has 3 plans:\n\n💎 **Starter Plan** - ₹99\n• 21-day access\n• All course materials\n• Community support\n\n🚀 **Pro Plan** - ₹199\n• Everything in Starter\n• 2 One-on-one sessions\n• Portfolio review\n\n⭐ **Elite Plan** - ₹399\n• Everything in Pro\n• Unlimited mentorship\n• Job referral support\n• Premium community access",
    suggestions: [
      "Tell me about curriculum",
      "How to enroll?",
      "Schedule details",
    ],
  },
  curriculum: {
    text: "Our 21-day curriculum covers:\n\n**Week 1: Foundations**\n• HTML5 & Semantic markup\n• CSS3 & Advanced styling\n• JavaScript fundamentals\n\n**Week 2: Modern Tools**\n• Tailwind CSS framework\n• Responsive design\n• CSS Grid & Flexbox\n\n**Week 3: Animations**\n• GSAP animations\n• Interactive effects\n• Portfolio projects\n\nEach day includes hands-on projects! 💻",
    suggestions: [
      "What are the pricing plans?",
      "When does it start?",
      "Prerequisites?",
    ],
  },
  schedule: {
    text: "📅 **Bootcamp Schedule:**\n\n• **Start Date:** July 10, 2024\n• **Duration:** 21 days\n• **Format:** Online live sessions\n• **Timing:** 7 PM - 9 PM IST\n• **Weekend:** Extra practice sessions\n• **Recordings:** Available for 90 days\n\nPerfect for working professionals! ⏰",
    suggestions: [
      "How much does it cost?",
      "What will I learn?",
      "How to join?",
    ],
  },
  enrollment: {
    text: "🎯 **Easy Enrollment Process:**\n\n1. Choose your plan (Starter/Pro/Elite)\n2. Fill the enrollment form\n3. Make payment via UPI\n4. Enter transaction ID\n5. Get instant access!\n\n**Payment Methods:**\n• UPI: praveenkumawat734@paytm\n• Phone Pay, Google Pay accepted\n\nNeed help? Call +91 97725 36873 📞",
    suggestions: [
      "Tell me about pricing",
      "What's the curriculum?",
      "Demo available?",
    ],
  },
  prerequisites: {
    text: "✅ **No Prerequisites Required!**\n\nThis bootcamp is designed for:\n• Complete beginners\n• Students wanting to upskill\n• Professionals switching careers\n• Anyone passionate about coding\n\n**What you need:**\n• A computer/laptop\n• Internet connection\n• Enthusiasm to learn! 🚀\n\nWe'll teach you everything from scratch!",
    suggestions: [
      "Show me the schedule",
      "How much does it cost?",
      "Book a demo",
    ],
  },
  demo: {
    text: "🎬 **Free Demo Available!**\n\nGet a taste of our teaching style:\n• 30-minute live session\n• Sample project walkthrough\n• Q&A with instructor Praveen\n�� No commitment required\n\n**Book Your Free Demo:**\nClick 'Book Demo' on our homepage or call us directly!\n\n📞 +91 97725 36873",
    suggestions: ["How to enroll?", "What's included?", "Pricing details"],
  },
  contact: {
    text: "📞 **Get in Touch:**\n\n**GenZ Coding School**\n• Phone: +91 97725 46873\n• WhatsApp: https://chat.whatsapp.com/L3lEfMTKBm4JeTdxG8CU0U\n• Email: genzcodingschool@gmail.com\n• Response time: Within 2 hours\n\n**Follow Us:**\n• Instagram: https://www.instagram.com/genz_coding_school/\n• YouTube: https://www.youtube.com/@genzcodingschool\n• LinkedIn: www.linkedin.com/in/genz-coding-school-571078348\n\nWe're here to help! 💬",
    suggestions: ["Book a demo", "Tell me about courses", "Pricing plans"],
  },
};

const QUICK_RESPONSES = [
  { text: "What are the pricing plans?", key: "pricing", icon: DollarSign },
  { text: "Tell me about curriculum", key: "curriculum", icon: BookOpen },
  { text: "When does it start?", key: "schedule", icon: Calendar },
  { text: "How to enroll?", key: "enrollment", icon: Sparkles },
  { text: "Prerequisites?", key: "prerequisites", icon: User },
  { text: "Book a demo", key: "demo", icon: Phone },
  { text: "Contact support", key: "contact", icon: Mail },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 I'm your Frontend Bootcamp assistant. I can help you with:\n\n• Course details & pricing\n• Enrollment process\n• Schedule information\n• Technical support\n\nWhat would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Pricing plans", "Course curriculum", "How to enroll?"],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
      );
    }
  }, [isOpen]);

  const handleQuickResponse = (responseKey: string, userText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = FAQ_RESPONSES[responseKey as keyof typeof FAQ_RESPONSES];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: isOpen ? 1 : 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-16 right-0 w-96 h-[500px] mb-4"
        >
          <Card className="w-full h-full bg-gray-900/95 border-cyan-500/30 backdrop-blur-sm shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">
                      Support Bot
                    </CardTitle>
                    <p className="text-cyan-300 text-sm">Online now</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                            : "bg-gray-800 text-gray-100 border border-gray-700"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && (
                            <Bot className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          )}
                          {message.sender === "user" && (
                            <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          )}
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.text}
                          </div>
                        </div>

                        {message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQuickResponse(
                                    suggestion.toLowerCase().includes("pricing")
                                      ? "pricing"
                                      : suggestion
                                            .toLowerCase()
                                            .includes("curriculum")
                                        ? "curriculum"
                                        : suggestion
                                              .toLowerCase()
                                              .includes("enroll")
                                          ? "enrollment"
                                          : suggestion
                                                .toLowerCase()
                                                .includes("demo")
                                            ? "demo"
                                            : suggestion
                                                  .toLowerCase()
                                                  .includes("schedule")
                                              ? "schedule"
                                              : suggestion
                                                    .toLowerCase()
                                                    .includes("contact")
                                                ? "contact"
                                                : "prerequisites",
                                    suggestion,
                                  )
                                }
                                className="text-xs h-7 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-cyan-400" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="border-t border-gray-700 p-4">
                <div className="mb-3">
                  <p className="text-gray-400 text-xs mb-2">Quick actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_RESPONSES.slice(0, 4).map((response) => (
                      <Button
                        key={response.key}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleQuickResponse(response.key, response.text)
                        }
                        className="justify-start text-xs h-8 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <response.icon className="w-3 h-3 mr-1" />
                        {response.text.length > 15
                          ? `${response.text.slice(0, 12)}...`
                          : response.text}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Badge
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Response time: &lt; 2 hours
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Button */}
      <Button
        ref={buttonRef}
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-800 hover:bg-gray-700 border-2 border-cyan-500"
            : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-cyan-500/25"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>

      {/* Notification Dot */}
      {!isOpen && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      )}
    </div>
  );
}
