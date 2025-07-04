import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  BookOpen,
  CreditCard,
  Clock,
  RefreshCw,
  Trash2,
  ArrowLeft,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EnrollmentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  education?: string;
  experience?: string;
  motivation?: string;
  enrollmentType: "demo" | "join";
  selectedPlan: "starter" | "pro" | "elite";
  transactionId?: string;
  paymentStatus: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  demos: number;
  paid: number;
  pending: number;
  planBreakdown: Record<string, number>;
}

export default function Admin() {
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollmentData | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enrollmentsRes, statsRes] = await Promise.all([
        fetch("/api/admin/enrollments"),
        fetch("/api/admin/stats"),
      ]);

      const enrollmentsData = await enrollmentsRes.json();
      const statsData = await statsRes.json();

      if (enrollmentsData.success) {
        setEnrollments(enrollmentsData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch enrollment data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = async () => {
    try {
      const response = await fetch("/api/admin/enrollments", {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setEnrollments([]);
        setStats({
          total: 0,
          demos: 0,
          paid: 0,
          pending: 0,
          planBreakdown: {},
        });
        toast({
          title: "Success",
          description: "All enrollment data cleared",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Failed to clear data:", error);
      toast({
        title: "Error",
        description: "Failed to clear enrollment data",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    if (enrollments.length === 0) {
      toast({
        title: "No Data",
        description: "No enrollments to export",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Type",
      "Plan",
      "Payment Status",
      "Transaction ID",
      "Created At",
    ];
    const csvContent = [
      headers.join(","),
      ...enrollments.map((e) =>
        [
          e.id,
          e.name,
          e.email,
          e.phone,
          e.enrollmentType,
          e.selectedPlan,
          e.paymentStatus,
          e.transactionId || "",
          new Date(e.createdAt).toLocaleString(),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrollments_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Enrollment data exported to CSV",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "starter":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "pro":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "elite":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-transparent bg-clip-text">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all enrollment submissions
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={fetchData}
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-background"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/80 border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Enrollments
                </CardTitle>
                <Users className="h-4 w-4 text-neon-cyan" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Demo Requests
                </CardTitle>
                <BookOpen className="h-4 w-4 text-neon-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.demos}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paid Enrollments
                </CardTitle>
                <CreditCard className="h-4 w-4 text-neon-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.paid}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Payments
                </CardTitle>
                <Clock className="h-4 w-4 text-neon-pink" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plan Breakdown */}
        {stats && Object.keys(stats.planBreakdown).length > 0 && (
          <Card className="bg-card/80 border-border mb-8">
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
              <CardDescription>
                Breakdown of enrollments by plan type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                {Object.entries(stats.planBreakdown).map(([plan, count]) => (
                  <div key={plan} className="text-center">
                    <Badge className={getPlanColor(plan)}>
                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                    </Badge>
                    <div className="text-2xl font-bold mt-2">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enrollments Table */}
        <Card className="bg-card/80 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Enrollments</CardTitle>
              <CardDescription>
                All enrollment submissions ({enrollments.length} total)
              </CardDescription>
            </div>

            {enrollments.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all enrollment data from memory.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAllData}>
                      Delete All Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-neon-cyan" />
                <p className="text-muted-foreground">
                  Loading enrollment data...
                </p>
              </div>
            ) : enrollments.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No enrollments found</p>
                <p className="text-sm text-muted-foreground/70">
                  Enrollment submissions will appear here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Info</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{enrollment.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {enrollment.email}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {enrollment.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              enrollment.enrollmentType === "demo"
                                ? "border-neon-green text-neon-green"
                                : "border-neon-purple text-neon-purple"
                            }
                          >
                            {enrollment.enrollmentType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPlanColor(enrollment.selectedPlan)}
                          >
                            {enrollment.selectedPlan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(enrollment.paymentStatus)}
                          >
                            {enrollment.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-mono">
                            {enrollment.transactionId || "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(
                              enrollment.createdAt,
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(
                              enrollment.createdAt,
                            ).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEnrollment(enrollment)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enrollment Details Modal */}
        {selectedEnrollment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-card border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Enrollment Details</CardTitle>
                <CardDescription>ID: {selectedEnrollment.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.enrollmentType}
                    </p>
                  </div>
                </div>

                {selectedEnrollment.education && (
                  <div>
                    <label className="text-sm font-medium">Education</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.education}
                    </p>
                  </div>
                )}

                {selectedEnrollment.experience && (
                  <div>
                    <label className="text-sm font-medium">Experience</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.experience}
                    </p>
                  </div>
                )}

                {selectedEnrollment.motivation && (
                  <div>
                    <label className="text-sm font-medium">Motivation</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.motivation}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Selected Plan</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.selectedPlan}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Payment Status
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedEnrollment.paymentStatus}
                    </p>
                  </div>
                </div>

                {selectedEnrollment.transactionId && (
                  <div>
                    <label className="text-sm font-medium">
                      Transaction ID
                    </label>
                    <p className="text-sm text-muted-foreground font-mono">
                      {selectedEnrollment.transactionId}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Created At</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedEnrollment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Updated At</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedEnrollment.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setSelectedEnrollment(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
