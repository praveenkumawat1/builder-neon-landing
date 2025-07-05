import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react";

interface AnalyticsData {
  total: number;
  demos: number;
  paid: number;
  pending: number;
  last7Days: number;
  last30Days: number;
  conversionRate: number;
  averageValue: number;
  planBreakdown: Record<string, number>;
}

interface AdvancedAnalyticsProps {
  data: AnalyticsData;
  onRefresh: () => void;
}

export function AdvancedAnalytics({ data, onRefresh }: AdvancedAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "all">(
    "7d",
  );

  const getGrowthTrend = () => {
    // Simulate growth calculation
    const growth = data.last7Days > data.last30Days / 4 ? 12 : -5;
    return growth;
  };

  const generateChartData = () => {
    // Simulate chart data for the last 7 days
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      enrollments: Math.floor(Math.random() * 10) + 1,
      demos: Math.floor(Math.random() * 5) + 1,
    }));
  };

  const chartData = generateChartData();
  const growth = getGrowthTrend();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into enrollment performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-background"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-neon-cyan/10 to-neon-cyan/5 border-neon-cyan/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neon-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(data.paid * 199).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`inline-flex items-center ${growth > 0 ? "text-green-400" : "text-red-400"}`}
              >
                {growth > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(growth)}%
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neon-purple/10 to-neon-purple/5 border-neon-purple/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-neon-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Demo to paid conversion
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neon-green/10 to-neon-green/5 border-neon-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <Users className="h-4 w-4 text-neon-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.paid}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neon-pink/10 to-neon-pink/5 border-neon-pink/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Revenue</CardTitle>
            <PieChart className="h-4 w-4 text-neon-pink" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.averageValue}</div>
            <p className="text-xs text-muted-foreground">Per student</p>
          </CardContent>
        </Card>
      </div>

      {/* Time Period Selector */}
      <div className="flex gap-2">
        {[
          { key: "7d", label: "Last 7 Days", value: data.last7Days },
          { key: "30d", label: "Last 30 Days", value: data.last30Days },
          { key: "all", label: "All Time", value: data.total },
        ].map((period) => (
          <Button
            key={period.key}
            variant={selectedPeriod === period.key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period.key as any)}
            className={
              selectedPeriod === period.key
                ? "bg-gradient-to-r from-neon-purple to-neon-pink"
                : "border-border hover:border-neon-purple/50"
            }
          >
            <Calendar className="w-4 h-4 mr-2" />
            {period.label}
            <Badge variant="secondary" className="ml-2">
              {period.value}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend Chart */}
        <Card className="bg-card/80 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-cyan" />
              Enrollment Trend
            </CardTitle>
            <CardDescription>Daily enrollment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                      <span className="text-xs">
                        Enrollments: {item.enrollments}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-neon-cyan to-neon-purple h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(item.enrollments / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium w-8 text-right">
                    {item.enrollments}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card className="bg-card/80 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-neon-purple" />
              Plan Distribution
            </CardTitle>
            <CardDescription>Breakdown by plan type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.planBreakdown).map(([plan, count]) => {
                const total = Object.values(data.planBreakdown).reduce(
                  (a, b) => a + b,
                  0,
                );
                const percentage =
                  total > 0 ? Math.round((count / total) * 100) : 0;
                const colors = {
                  starter: "from-neon-green to-neon-green/70",
                  pro: "from-neon-purple to-neon-purple/70",
                  elite: "from-neon-cyan to-neon-cyan/70",
                };

                return (
                  <div key={plan} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[plan as keyof typeof colors]}`}
                        />
                        <span className="text-sm font-medium capitalize">
                          {plan}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${colors[plan as keyof typeof colors]} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-br from-card/80 to-card/40 border-neon-cyan/30">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Key performance indicators and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">
                {Math.round((data.paid / data.total) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Payment Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">
                {data.demos > 0
                  ? Math.round((data.paid / data.demos) * 100)
                  : 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">
                Demo Conversion
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">
                ₹{Math.round((data.paid * 199) / Math.max(data.demos, 1))}
              </div>
              <div className="text-sm text-muted-foreground">
                Revenue per Demo
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
