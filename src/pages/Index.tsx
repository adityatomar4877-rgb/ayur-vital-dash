import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Heart, 
  Shield, 
  Users, 
  Database, 
  FileText, 
  BookOpen,
  Activity,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient profiles with constitution analysis and health tracking"
    },
    {
      icon: Database,
      title: "Food Database",
      description: "8,000+ foods with complete nutritional and Ayurvedic properties"
    },
    {
      icon: FileText,
      title: "Diet Chart Builder",
      description: "Create personalized diet plans with drag-and-drop functionality"
    },
    {
      icon: Heart,
      title: "Ayurvedic Remedies",
      description: "Extensive library of natural remedies for common acute conditions"
    },
    {
      icon: BookOpen,
      title: "Lifestyle Guidance",
      description: "Daily and seasonal Ayurvedic practices for optimal wellness"
    },
    {
      icon: Activity,
      title: "Reports & Analytics",
      description: "Track patient progress and practice insights with detailed reports"
    }
  ];

  const benefits = [
    "Evidence-based Ayurvedic nutrition",
    "Constitution-specific recommendations",
    "Integrated modern nutritional science",
    "Professional practice management",
    "Patient education resources",
    "Comprehensive health tracking"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-playfair font-bold text-primary">
                AyurDiet
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-white/20 text-white border-white/30">
              Modern Ayurvedic Practice Management
            </Badge>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white leading-tight">
              Revolutionize Your 
              <span className="block text-accent-light">Ayurvedic Practice</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Comprehensive software solution that bridges ancient Ayurvedic wisdom with modern nutritional science for healthcare practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-soft">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Everything You Need for Holistic Care
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Powerful tools designed specifically for Ayurvedic practitioners to deliver personalized, effective healthcare.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-lift border-0 shadow-soft">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
                  Why Choose AyurDiet?
                </h2>
                <p className="text-lg text-foreground-muted leading-relaxed">
                  Built by healthcare professionals, for healthcare professionals. Our platform combines the depth of Ayurvedic knowledge with the precision of modern technology.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/login">
                <Button size="lg" className="font-semibold">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <Card className="shadow-strong">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Patient Constitution</h3>
                      <Badge>Pitta-Kapha</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-muted">Diet Compliance</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div className="bg-success h-2 rounded-full transition-all duration-300" style={{ width: '94%' }} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">8</p>
                        <p className="text-xs text-foreground-muted">Weeks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">85%</p>
                        <p className="text-xs text-foreground-muted">Improvement</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-playfair font-bold text-white">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-white/90">
              Join hundreds of Ayurvedic practitioners who are already using AyurDiet to provide better patient care and grow their practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-playfair font-bold">AyurDiet</span>
              </div>
              <p className="text-white/70 text-sm">
                Modern Ayurvedic practice management software for healthcare professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>© 2024 AyurDiet. All rights reserved. This tool is for informational purposes only. Please consult an Ayurvedic doctor for diagnosis.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;