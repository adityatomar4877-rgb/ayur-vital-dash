import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Heart, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-playfair font-bold text-white">AyurDiet</h1>
            <p className="text-white/80 text-sm">Ayurvedic Diet Management Software</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-strong border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-playfair">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your AyurDiet account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="doctor" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Patient
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="doctor" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input
                      id="doctor-email"
                      type="email"
                      placeholder="doctor@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input
                      id="doctor-password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Doctor"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="patient" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Email</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="patient@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-password">Password</Label>
                    <Input
                      id="patient-password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Patient"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center space-y-2">
              <Link to="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-foreground-muted">
                Don't have an account?{" "}
                <Link to="#" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="text-white/80">
            <Leaf className="h-5 w-5 mx-auto mb-1" />
            <p className="text-xs">Ayurvedic</p>
          </div>
          <div className="text-white/80">
            <Heart className="h-5 w-5 mx-auto mb-1" />
            <p className="text-xs">Holistic</p>
          </div>
          <div className="text-white/80">
            <Shield className="h-5 w-5 mx-auto mb-1" />
            <p className="text-xs">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;