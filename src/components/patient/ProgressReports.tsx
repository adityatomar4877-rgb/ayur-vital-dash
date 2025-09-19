import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Download, TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', diet: 85, habits: 90, energy: 7, mood: 8 },
  { day: 'Tue', diet: 90, habits: 95, energy: 8, mood: 8 },
  { day: 'Wed', diet: 75, habits: 80, energy: 6, mood: 7 },
  { day: 'Thu', diet: 100, habits: 100, energy: 9, mood: 9 },
  { day: 'Fri', diet: 95, habits: 85, energy: 8, mood: 8 },
  { day: 'Sat', diet: 80, habits: 75, energy: 7, mood: 7 },
  { day: 'Sun', diet: 87, habits: 88, energy: 8, mood: 8 },
];

const doshaBalance = [
  { name: 'Vata', value: 30, color: '#ea580c' },
  { name: 'Pitta', value: 45, color: '#dc2626' },
  { name: 'Kapha', value: 25, color: '#16a34a' },
];

const monthlyStats = {
  dietCompliance: 87,
  habitCompletion: 85,
  averageEnergy: 7.8,
  averageMood: 8.1,
  weightChange: -1.2,
  sleepQuality: 8.5
};

const ProgressReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handleDownloadReport = () => {
    // Mock download functionality
    const reportData = {
      period: selectedPeriod,
      generated: new Date().toLocaleDateString(),
      dietCompliance: monthlyStats.dietCompliance,
      habitCompletion: monthlyStats.habitCompletion,
      weeklyData,
      doshaBalance
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `jeevanamrit-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Progress & Wellness Reports
          </CardTitle>
          <CardDescription>
            Track your Ayurvedic wellness journey with detailed analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <Button 
                variant={selectedPeriod === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                This Week
              </Button>
              <Button 
                variant={selectedPeriod === 'month' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                This Month
              </Button>
            </div>
            <Button onClick={handleDownloadReport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="dosha">Dosha Balance</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Diet Compliance</p>
                      <p className="text-2xl font-bold text-success">{monthlyStats.dietCompliance}%</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <Progress value={monthlyStats.dietCompliance} className="mt-2" />
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Habit Completion</p>
                      <p className="text-2xl font-bold text-primary">{monthlyStats.habitCompletion}%</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <Progress value={monthlyStats.habitCompletion} className="mt-2" />
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Avg Energy</p>
                      <p className="text-2xl font-bold text-accent">{monthlyStats.averageEnergy}/10</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <Progress value={monthlyStats.averageEnergy * 10} className="mt-2" />
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">Weight Change</p>
                      <p className="text-2xl font-bold text-success">{monthlyStats.weightChange} kg</p>
                    </div>
                    <TrendingDown className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-xs text-foreground-muted mt-2">This month</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Progress Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="diet" stroke="#16a34a" strokeWidth={2} name="Diet %" />
                      <Line type="monotone" dataKey="habits" stroke="#2563eb" strokeWidth={2} name="Habits %" />
                      <Line type="monotone" dataKey="energy" stroke="#ea580c" strokeWidth={2} name="Energy (1-10)" />
                      <Line type="monotone" dataKey="mood" stroke="#7c3aed" strokeWidth={2} name="Mood (1-10)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dosha" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Dosha Balance</CardTitle>
                    <CardDescription>Based on your recent lifestyle patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={doshaBalance}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="value"
                        >
                          {doshaBalance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {doshaBalance.map((dosha) => (
                        <div key={dosha.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dosha.color }} />
                          <span className="text-sm">{dosha.name} ({dosha.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dosha Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <h4 className="font-medium text-orange-800">Vata (30%)</h4>
                      <p className="text-sm text-orange-700">Focus on warm, grounding foods and regular routines</p>
                    </div>
                    <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                      <h4 className="font-medium text-red-800">Pitta (45%) - Dominant</h4>
                      <p className="text-sm text-red-700">Cool, calming practices and avoid excessive heat</p>
                    </div>
                    <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                      <h4 className="font-medium text-green-800">Kapha (25%)</h4>
                      <p className="text-sm text-green-700">Increase activity and lighter, warming foods</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      AI-Powered Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                      <h4 className="font-medium text-success mb-2">🎉 Great Progress!</h4>
                      <p className="text-sm text-foreground">
                        Your diet compliance has improved by 15% this month. The consistent morning routine 
                        is showing excellent results in your energy levels.
                      </p>
                    </div>

                    <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                      <h4 className="font-medium text-warning mb-2">⚠️ Areas for Improvement</h4>
                      <p className="text-sm text-foreground">
                        Your sleep time has been inconsistent on weekends. Consider maintaining 
                        the 10 PM bedtime routine for better Kapha balance.
                      </p>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                      <h4 className="font-medium text-primary mb-2">💡 Personalized Recommendations</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Add cooling pranayama (breathing exercises) to balance excess Pitta</li>
                        <li>• Include more bitter and astringent tastes in your diet</li>
                        <li>• Consider coconut oil for your evening massage instead of sesame oil</li>
                        <li>• Practice meditation during Pitta time (10 AM - 2 PM) for better focus</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                      <h4 className="font-medium text-accent mb-2">🎯 Next Week's Goals</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        <li>• Maintain 90%+ diet compliance</li>
                        <li>• Complete oil pulling practice daily</li>
                        <li>• Log mood and energy levels consistently</li>
                        <li>• Try the new cooling tea remedy prescribed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressReports;