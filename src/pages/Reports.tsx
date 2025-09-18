import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, FileText, Download, TrendingUp, Users, Calendar, Activity, PieChart } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedPatient, setSelectedPatient] = useState("all");

  const stats = [
    { label: "Total Patients", value: "142", change: "+12%", icon: Users },
    { label: "Diet Charts Created", value: "89", change: "+8%", icon: FileText },
    { label: "Success Rate", value: "94%", change: "+3%", icon: TrendingUp },
    { label: "Consultations", value: "67", change: "+15%", icon: Calendar },
  ];

  const recentReports = [
    {
      id: 1,
      patient: "Priya Sharma",
      type: "Diet Chart",
      date: "2024-03-15",
      status: "Completed",
      condition: "Digestive Issues"
    },
    {
      id: 2,
      patient: "Rajesh Kumar",
      type: "Lifestyle Plan",
      date: "2024-03-14",
      status: "In Progress",
      condition: "Joint Pain"
    },
    {
      id: 3,
      patient: "Anita Singh",
      type: "Remedy Guide",
      date: "2024-03-13",
      status: "Completed",
      condition: "Stress Management"
    },
  ];

  const constitutionData = [
    { constitution: "Vata", count: 42, percentage: 29.6 },
    { constitution: "Pitta", count: 38, percentage: 26.8 },
    { constitution: "Kapha", count: 35, percentage: 24.6 },
    { constitution: "Vata-Pitta", count: 15, percentage: 10.6 },
    { constitution: "Pitta-Kapha", count: 8, percentage: 5.6 },
    { constitution: "Vata-Kapha", count: 4, percentage: 2.8 },
  ];

  const conditionTrends = [
    { condition: "Digestive Issues", count: 34, trend: "+15%" },
    { condition: "Joint Pain", count: 28, trend: "+8%" },
    { condition: "Stress & Anxiety", count: 25, trend: "+22%" },
    { condition: "Sleep Disorders", count: 18, trend: "+5%" },
    { condition: "Skin Issues", count: 15, trend: "-3%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-success/10 text-success";
      case "in progress": return "bg-warning/10 text-warning";
      case "pending": return "bg-foreground-muted/10 text-foreground-muted";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
              Reports & Analytics
            </h1>
            <p className="text-foreground-muted">
              Comprehensive insights into your practice and patient outcomes
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
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
                    {stat.change} from last {selectedPeriod}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="treatments">Treatments</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Constitution Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Patient Constitution Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of patient constitutions in your practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {constitutionData.map((item) => (
                    <div key={item.constitution} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="text-sm font-medium">{item.constitution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground-muted">{item.count} patients</span>
                        <Badge variant="secondary" className="text-xs">
                          {item.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Condition Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Common Conditions
                  </CardTitle>
                  <CardDescription>
                    Most frequent health conditions in your practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conditionTrends.map((item) => (
                    <div key={item.condition} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.condition}</p>
                        <div className="w-full bg-secondary h-2 rounded-full mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(item.count / 34) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-sm text-foreground-muted">{item.count}</span>
                        <Badge 
                          className={`text-xs ${
                            item.trend.startsWith('+') 
                              ? 'bg-success/10 text-success' 
                              : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Reports Generated
                </CardTitle>
                <CardDescription>
                  Latest diet charts, plans, and reports created
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-background-soft rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{report.patient}</p>
                          <p className="text-sm text-foreground-muted">{report.type} - {report.condition}</p>
                          <p className="text-xs text-foreground-light">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Analytics</CardTitle>
                <CardDescription>
                  Detailed insights about your patient demographics and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-foreground-light mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Patient Analytics</h3>
                  <p className="text-foreground-muted">
                    Detailed patient analytics and demographics will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Effectiveness</CardTitle>
                <CardDescription>
                  Analysis of treatment outcomes and success rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-foreground-light mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Treatment Analysis</h3>
                  <p className="text-foreground-muted">
                    Treatment effectiveness metrics and outcome analysis will be shown here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Generate and download various reports and charts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Patient Diet Charts</h3>
                      <p className="text-sm text-foreground-muted mb-4">
                        Export diet charts for selected patients
                      </p>
                      <Button variant="outline" className="w-full">
                        Export PDF
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <BarChart className="h-8 w-8 text-accent mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Practice Analytics</h3>
                      <p className="text-sm text-foreground-muted mb-4">
                        Export detailed practice statistics
                      </p>
                      <Button variant="outline" className="w-full">
                        Export Excel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-success mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Patient Records</h3>
                      <p className="text-sm text-foreground-muted mb-4">
                        Export complete patient database
                      </p>
                      <Button variant="outline" className="w-full">
                        Export CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-warning mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Appointment Reports</h3>
                      <p className="text-sm text-foreground-muted mb-4">
                        Export consultation schedules
                      </p>
                      <Button variant="outline" className="w-full">
                        Export PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;