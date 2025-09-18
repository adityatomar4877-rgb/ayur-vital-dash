import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  Plus, 
  FileText, 
  Heart, 
  Leaf, 
  TrendingUp,
  Calendar,
  BookOpen,
  Activity
} from "lucide-react";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const stats = [
    { label: "Total Patients", value: "142", change: "+12%", icon: Users },
    { label: "Diet Charts Created", value: "89", change: "+8%", icon: FileText },
    { label: "Active Remedies", value: "67", change: "+15%", icon: Heart },
    { label: "Success Rate", value: "94%", change: "+3%", icon: TrendingUp },
  ];

  const recentPatients = [
    { name: "Priya Sharma", age: 32, condition: "Digestive Issues", lastVisit: "2 days ago" },
    { name: "Rajesh Kumar", age: 45, condition: "Joint Pain", lastVisit: "1 week ago" },
    { name: "Anita Singh", age: 28, condition: "Stress Management", lastVisit: "3 days ago" },
  ];

  const quickActions = [
    {
      title: "New Patient",
      description: "Add a new patient profile",
      icon: Plus,
      href: "/patients",
      color: "bg-primary"
    },
    {
      title: "Generate Diet Chart",
      description: "Create personalized diet plan",
      icon: FileText,
      href: "/diet-builder",
      color: "bg-accent"
    },
    {
      title: "Remedies & Tips",
      description: "Browse Ayurvedic remedies",
      icon: Leaf,
      href: "/remedies",
      color: "bg-success"
    },
    {
      title: "Reports",
      description: "View analytics and reports",
      icon: Activity,
      href: "/reports",
      color: "bg-warning"
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
            Dashboard
          </h1>
          <p className="text-foreground-muted">
            Welcome back, Dr. Ayurveda. Here's your practice overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground-muted">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks and shortcuts for your practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.title} to={action.href}>
                        <Card className="hover-lift cursor-pointer h-full">
                          <CardContent className="flex items-start space-x-4 p-6">
                            <div className={`p-2 rounded-lg ${action.color} text-white`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <h3 className="font-semibold">{action.title}</h3>
                              <p className="text-sm text-foreground-muted">
                                {action.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Recent Patients
              </CardTitle>
              <CardDescription>
                Latest patient consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{patient.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Age {patient.age}
                      </Badge>
                      <span className="text-xs text-foreground-muted">
                        {patient.lastVisit}
                      </span>
                    </div>
                    <p className="text-xs text-foreground-muted">
                      {patient.condition}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/patients">View All Patients</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your appointments and tasks for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background-soft rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Morning Consultation</p>
                    <p className="text-sm text-foreground-muted">9:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-background-soft rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Diet Chart Review</p>
                    <p className="text-sm text-foreground-muted">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;