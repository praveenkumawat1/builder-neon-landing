import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff } from "lucide-react";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials (in production, this should be on the server)
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "Praveen2004@",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      credentials.username === ADMIN_CREDENTIALS.username &&
      credentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Store auth in sessionStorage (expires when browser closes)
      sessionStorage.setItem("adminAuthenticated", "true");
      sessionStorage.setItem("adminLoginTime", Date.now().toString());

      toast({
        title: "Login Successful! 🎉",
        description: "Welcome to the admin dashboard",
      });

      onLogin();
      onClose();
      resetForm();
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setCredentials({ username: "", password: "" });
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neon-cyan" />
            Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter your credentials to access the admin dashboard
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="bg-background/50 border-border focus:border-neon-cyan"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="bg-background/50 border-border focus:border-neon-cyan pr-10"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading || !credentials.username || !credentials.password
              }
              className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground text-center pt-2">
          <p>🔒 Secure admin access</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
