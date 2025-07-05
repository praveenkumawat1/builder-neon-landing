import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Download,
  MessageCircle,
  User,
} from "lucide-react";

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

interface UserManagementProps {
  enrollments: EnrollmentData[];
  onRefresh: () => void;
}

export function UserManagement({
  enrollments,
  onRefresh,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "demo" | "join">("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "plan">("date");
  const [selectedUser, setSelectedUser] = useState<EnrollmentData | null>(null);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = enrollments.filter((enrollment) => {
      const matchesSearch =
        enrollment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.phone.includes(searchTerm);

      const matchesType =
        filterType === "all" || enrollment.enrollmentType === filterType;
      const matchesStatus =
        filterStatus === "all" || enrollment.paymentStatus === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "plan":
          return a.selectedPlan.localeCompare(b.selectedPlan);
        case "date":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [enrollments, searchTerm, filterType, filterStatus, sortBy]);

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

  const exportUserData = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Type",
        "Plan",
        "Status",
        "Transaction ID",
        "Created Date",
      ].join(","),
      ...filteredAndSortedUsers.map((user) =>
        [
          user.name,
          user.email,
          user.phone,
          user.enrollmentType,
          user.selectedPlan,
          user.paymentStatus,
          user.transactionId || "",
          new Date(user.createdAt).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Manage and view detailed user profiles
          </p>
        </div>
        <Button
          onClick={exportUserData}
          className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-purple/80 hover:to-neon-pink/80"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Users
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Users</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border focus:border-neon-cyan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Enrollment Type</label>
              <Select
                value={filterType}
                onValueChange={(value: any) => setFilterType(value)}
              >
                <SelectTrigger className="bg-background/50 border-border focus:border-neon-cyan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="demo">Demo</SelectItem>
                  <SelectItem value="join">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Status</label>
              <Select
                value={filterStatus}
                onValueChange={(value: any) => setFilterStatus(value)}
              >
                <SelectTrigger className="bg-background/50 border-border focus:border-neon-cyan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="bg-background/50 border-border focus:border-neon-cyan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="plan">Plan Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAndSortedUsers.length} of {enrollments.length}{" "}
              users
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterStatus("all");
                setSortBy("date");
              }}
              className="border-border hover:border-neon-cyan/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-card/80 border-border">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Detailed view of all enrolled and demo users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAndSortedUsers.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                No users found matching your criteria
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Info</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {user.id.slice(-8)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.enrollmentType === "demo"
                              ? "border-neon-green text-neon-green"
                              : "border-neon-purple text-neon-purple"
                          }
                        >
                          {user.enrollmentType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(user.selectedPlan)}>
                          {user.selectedPlan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.paymentStatus)}>
                          {user.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>User Details</DialogTitle>
                                <DialogDescription>
                                  Complete profile for {user.name}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Name
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.name}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Email
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.email}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Phone
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.phone}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Plan
                                      </label>
                                      <p className="text-sm text-muted-foreground capitalize">
                                        {selectedUser.selectedPlan}
                                      </p>
                                    </div>
                                  </div>

                                  {selectedUser.education && (
                                    <div>
                                      <label className="text-sm font-medium">
                                        Education
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.education}
                                      </p>
                                    </div>
                                  )}

                                  {selectedUser.experience && (
                                    <div>
                                      <label className="text-sm font-medium">
                                        Experience
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.experience}
                                      </p>
                                    </div>
                                  )}

                                  {selectedUser.motivation && (
                                    <div>
                                      <label className="text-sm font-medium">
                                        Motivation
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedUser.motivation}
                                      </p>
                                    </div>
                                  )}

                                  {selectedUser.transactionId && (
                                    <div>
                                      <label className="text-sm font-medium">
                                        Transaction ID
                                      </label>
                                      <p className="text-sm text-muted-foreground font-mono">
                                        {selectedUser.transactionId}
                                      </p>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Created
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(
                                          selectedUser.createdAt,
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">
                                        Updated
                                      </label>
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(
                                          selectedUser.updatedAt,
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(`mailto:${user.email}`, "_blank")
                            }
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
