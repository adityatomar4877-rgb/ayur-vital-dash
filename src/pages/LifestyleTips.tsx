import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Sun, Moon, Droplets, Activity, Brain, Heart, Leaf, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

const LifestyleTips = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleTask = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const dinacharya = [
    {
      id: 1,
      time: "5:00 - 6:00 AM",
      title: "Wake Up Early",
      description: "Rise before sunrise to align with natural rhythms",
      icon: Sun,
      category: "Morning"
    },
    {
      id: 2,
      time: "6:00 - 6:30 AM",
      title: "Oral Hygiene",
      description: "Brush teeth, scrape tongue, oil pulling with sesame oil",
      icon: Droplets,
      category: "Morning"
    },
    {
      id: 3,
      time: "6:30 - 7:30 AM",
      title: "Morning Movement",
      description: "Yoga, pranayama, or light exercise based on constitution",
      icon: Activity,
      category: "Morning"
    },
    {
      id: 4,
      time: "7:30 - 8:30 AM",
      title: "Meditation & Prayer",
      description: "10-20 minutes of mindfulness or spiritual practice",
      icon: Brain,
      category: "Morning"
    },
    {
      id: 5,
      time: "12:00 - 1:00 PM",
      title: "Main Meal",
      description: "Largest meal when digestive fire is strongest",
      icon: Sun,
      category: "Afternoon"
    },
    {
      id: 6,
      time: "6:00 - 7:00 PM",
      title: "Light Dinner",
      description: "Warm, easily digestible foods",
      icon: Moon,
      category: "Evening"
    },
    {
      id: 7,
      time: "9:00 - 10:00 PM",
      title: "Wind Down",
      description: "Gentle activities, avoid screens, prepare for sleep",
      icon: Moon,
      category: "Evening"
    },
    {
      id: 8,
      time: "10:00 PM",
      title: "Sleep Time",
      description: "Early sleep for optimal rest and rejuvenation",
      icon: Moon,
      category: "Evening"
    }
  ];

  const ritucharya = [
    {
      season: "Spring (Vasant)",
      duration: "March - May",
      focus: "Reduce Kapha",
      activities: [
        "Light, warm, spicy foods",
        "Vigorous exercise",
        "Detoxification practices",
        "Wake up earlier"
      ],
      avoid: [
        "Heavy, oily foods",
        "Excessive sweet foods",
        "Daytime sleeping",
        "Cold foods"
      ]
    },
    {
      season: "Summer (Grishma)",
      duration: "June - August",
      focus: "Cool Pitta",
      activities: [
        "Sweet, cooling foods",
        "Gentle exercise",
        "Swimming",
        "Meditation in cool places"
      ],
      avoid: [
        "Spicy, hot foods",
        "Excessive sun exposure",
        "Intense exercise",
        "Alcohol"
      ]
    },
    {
      season: "Monsoon (Varsha)",
      duration: "September - October",
      focus: "Balance all Doshas",
      activities: [
        "Warm, cooked foods",
        "Indoor activities",
        "Immunity boosting herbs",
        "Maintain hygiene"
      ],
      avoid: [
        "Street food",
        "Raw foods",
        "Getting wet in rain",
        "Heavy foods"
      ]
    },
    {
      season: "Winter (Shishir)",
      duration: "November - February",
      focus: "Warm Vata",
      activities: [
        "Warm, nourishing foods",
        "Oil massage",
        "Moderate exercise",
        "Adequate sleep"
      ],
      avoid: [
        "Cold foods",
        "Excessive raw foods",
        "Cold exposure",
        "Fasting"
      ]
    }
  ];

  const wellnessPractices = [
    {
      id: 9,
      title: "Abhyanga (Oil Massage)",
      description: "Daily self-massage with warm oil before bathing",
      benefits: "Improves circulation, nourishes skin, calms nervous system",
      frequency: "Daily",
      icon: Droplets
    },
    {
      id: 10,
      title: "Pranayama",
      description: "Controlled breathing exercises",
      benefits: "Balances nervous system, improves lung capacity",
      frequency: "2x daily",
      icon: Activity
    },
    {
      id: 11,
      title: "Mindful Eating",
      description: "Eat in peaceful environment, chew thoroughly",
      benefits: "Improves digestion, increases satisfaction",
      frequency: "Every meal",
      icon: Heart
    },
    {
      id: 12,
      title: "Digital Detox",
      description: "Limit screen time, especially before sleep",
      benefits: "Better sleep, reduced stress, improved focus",
      frequency: "Daily",
      icon: Brain
    }
  ];

  const getProgressPercentage = () => {
    const totalTasks = dinacharya.length + wellnessPractices.length;
    return (completedTasks.length / totalTasks) * 100;
  };

  const TaskCard = ({ task, showTime = true }: { task: any, showTime?: boolean }) => {
    const Icon = task.icon;
    const isCompleted = completedTasks.includes(task.id);
    
    return (
      <Card className={`transition-all duration-200 ${isCompleted ? 'bg-success/5 border-success/20' : 'hover-lift'}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${isCompleted ? 'text-success' : 'text-primary'}`} />
                  <h3 className={`font-semibold ${isCompleted ? 'line-through text-foreground-muted' : ''}`}>
                    {task.title}
                  </h3>
                </div>
                {showTime && (
                  <Badge variant="outline" className="text-xs">
                    {task.time}
                  </Badge>
                )}
              </div>
              <p className={`text-sm ${isCompleted ? 'line-through text-foreground-muted' : 'text-foreground-muted'}`}>
                {task.description}
              </p>
              {task.benefits && (
                <p className="text-xs text-success">
                  Benefits: {task.benefits}
                </p>
              )}
              {task.frequency && (
                <Badge variant="secondary" className="text-xs">
                  {task.frequency}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
              Lifestyle Tips
            </h1>
            <p className="text-foreground-muted">
              Daily and seasonal Ayurvedic practices for optimal health
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Today's Progress
            </CardTitle>
            <CardDescription>
              Track your daily Ayurvedic practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground-muted">
                  Completed: {completedTasks.length} of {dinacharya.length + wellnessPractices.length} practices
                </span>
                <span className="text-sm font-semibold">
                  {Math.round(getProgressPercentage())}%
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dinacharya" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dinacharya">Daily Routine</TabsTrigger>
            <TabsTrigger value="ritucharya">Seasonal Practices</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="dinacharya" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  Dinacharya - Daily Routine
                </CardTitle>
                <CardDescription>
                  Follow this daily schedule aligned with natural rhythms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dinacharya.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ritucharya" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Ritucharya - Seasonal Practices
                </CardTitle>
                <CardDescription>
                  Adapt your lifestyle according to the seasons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {ritucharya.map((season, index) => (
                  <Card key={index} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{season.season}</CardTitle>
                        <Badge variant="outline">{season.duration}</Badge>
                      </div>
                      <CardDescription>
                        Focus: {season.focus}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-1">
                            <Leaf className="h-3 w-3 text-success" />
                            Recommended Activities
                          </h4>
                          <ul className="space-y-1">
                            {season.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-foreground-muted flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm flex items-center gap-1">
                            <Sun className="h-3 w-3 text-warning" />
                            Things to Avoid
                          </h4>
                          <ul className="space-y-1">
                            {season.avoid.map((item, idx) => (
                              <li key={idx} className="text-sm text-foreground-muted flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Wellness Practices
                </CardTitle>
                <CardDescription>
                  Additional practices for holistic well-being
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {wellnessPractices.map((practice) => (
                  <TaskCard key={practice.id} task={practice} showTime={false} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Motivational Footer */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6 text-center">
            <h3 className="font-playfair font-semibold text-lg mb-2">
              "Health is not just the absence of disease, but a state of complete physical, mental, and social well-being."
            </h3>
            <p className="text-white/80 text-sm">
              - Ayurvedic Philosophy
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LifestyleTips;