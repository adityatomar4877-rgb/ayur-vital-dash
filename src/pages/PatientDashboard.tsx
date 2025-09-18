import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  Clock,
  Droplets,
  Heart,
  Leaf,
  CheckCircle,
  TrendingUp,
  Coffee,
  Utensils,
  Moon,
  Sun,
  Activity,
  MessageCircle,
  Download,
  Flame,
  Snowflake,
  Star
} from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

const PatientDashboard = () => {
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(new Set());
  const [completedRemedies, setCompletedRemedies] = useState<Set<string>>(new Set());

  const todayMeals = [
    {
      time: "7:00 AM",
      type: "Breakfast",
      icon: Coffee,
      foods: [
        { name: "Warm Lemon Water", calories: 5, properties: ["Hot", "Easy"], rasa: ["Sour"] },
        { name: "Oatmeal with Almonds", calories: 320, properties: ["Warm", "Moderate"], rasa: ["Sweet"] },
      ],
      doctorNote: "Start your day with warm foods to kindle digestive fire (Agni)"
    },
    {
      time: "12:30 PM",
      type: "Lunch",
      icon: Utensils,
      foods: [
        { name: "Basmati Rice", calories: 200, properties: ["Neutral", "Easy"], rasa: ["Sweet"] },
        { name: "Dal with Turmeric", calories: 180, properties: ["Warm", "Easy"], rasa: ["Sweet", "Astringent"] },
        { name: "Steamed Vegetables", calories: 80, properties: ["Cool", "Easy"], rasa: ["Sweet", "Bitter"] },
      ],
      doctorNote: "Largest meal of the day when Agni is strongest"
    },
    {
      time: "6:00 PM",
      type: "Dinner",
      icon: Moon,
      foods: [
        { name: "Light Vegetable Soup", calories: 120, properties: ["Warm", "Easy"], rasa: ["Sweet", "Salty"] },
        { name: "Chapati", calories: 80, properties: ["Neutral", "Moderate"], rasa: ["Sweet"] },
      ],
      doctorNote: "Light dinner for better sleep and digestion"
    },
    {
      time: "9:00 PM",
      type: "Evening Snack",
      icon: Star,
      foods: [
        { name: "Warm Milk with Turmeric", calories: 150, properties: ["Hot", "Easy"], rasa: ["Sweet"] },
      ],
      doctorNote: "Promotes restful sleep and tissue repair"
    }
  ];

  const personalizedRemedies = [
    {
      id: "remedy1",
      title: "Morning Digestive Tea",
      condition: "Weak Digestion",
      ingredients: ["1 tsp Ginger powder", "1/2 tsp Cumin", "Pinch of Rock salt"],
      instructions: "Boil ingredients in 1 cup water for 5 minutes. Drink warm on empty stomach.",
      timing: "Every morning before breakfast",
      duration: "2 weeks"
    },
    {
      id: "remedy2", 
      title: "Joint Care Oil Massage",
      condition: "Joint Stiffness",
      ingredients: ["Sesame oil", "Few drops Eucalyptus oil"],
      instructions: "Warm the oil slightly and massage affected joints in circular motions.",
      timing: "Evening before bath",
      duration: "Daily"
    }
  ];

  const lifestyleHabits = [
    {
      id: "habit1",
      name: "Wake up before sunrise",
      category: "Morning Routine",
      streak: 12,
      icon: Sun
    },
    {
      id: "habit2", 
      name: "Drink warm water",
      category: "Hydration",
      streak: 8,
      icon: Droplets
    },
    {
      id: "habit3",
      name: "15-min morning yoga",
      category: "Exercise",
      streak: 5,
      icon: Heart
    },
    {
      id: "habit4",
      name: "Evening meditation",
      category: "Mental Health",
      streak: 15,
      icon: Leaf
    },
    {
      id: "habit5",
      name: "Oil pulling",
      category: "Oral Care", 
      streak: 3,
      icon: Droplets
    },
    {
      id: "habit6",
      name: "Sleep by 10 PM",
      category: "Sleep",
      streak: 7,
      icon: Moon
    }
  ];

  const progressStats = {
    dietCompliance: 87,
    habitCompletion: 78,
    weeklyProgress: [65, 72, 78, 85, 87, 89, 87]
  };

  const toggleHabit = (habitId: string) => {
    const newCompleted = new Set(completedHabits);
    if (newCompleted.has(habitId)) {
      newCompleted.delete(habitId);
    } else {
      newCompleted.add(habitId);
    }
    setCompletedHabits(newCompleted);
  };

  const toggleRemedy = (remedyId: string) => {
    const newCompleted = new Set(completedRemedies);
    if (newCompleted.has(remedyId)) {
      newCompleted.delete(remedyId);
    } else {
      newCompleted.add(remedyId);
    }
    setCompletedRemedies(newCompleted);
  };

  const getPropertyIcon = (property: string) => {
    if (property.includes("Hot") || property.includes("Warm")) return <Flame className="h-3 w-3 text-orange-500" />;
    if (property.includes("Cool") || property.includes("Cold")) return <Snowflake className="h-3 w-3 text-blue-500" />;
    return null;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
            Welcome Back, Priya
          </h1>
          <p className="text-foreground-muted">
            Your personalized Ayurvedic wellness journey continues today.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground-muted">Diet Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{progressStats.dietCompliance}%</div>
              <Progress value={progressStats.dietCompliance} className="mt-2" />
              <p className="text-xs text-foreground-muted mt-1">This week</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground-muted">Habit Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{progressStats.habitCompletion}%</div>
              <Progress value={progressStats.habitCompletion} className="mt-2" />
              <p className="text-xs text-foreground-muted mt-1">Today</p>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground-muted">Weekly Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">15 days</div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+2 from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Daily Diet Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Diet Chart
                </CardTitle>
                <CardDescription>
                  Your personalized meal plan for optimal health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {todayMeals.map((meal, index) => {
                  const MealIcon = meal.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 bg-background-soft">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MealIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{meal.type}</h3>
                          <p className="text-sm text-foreground-muted flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {meal.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {meal.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                            <div className="flex-1">
                              <span className="font-medium text-sm">{food.name}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-foreground-muted">{food.calories} cal</span>
                                <div className="flex items-center gap-1">
                                  {food.properties.map((prop, propIndex) => (
                                    <div key={propIndex} className="flex items-center gap-1">
                                      {getPropertyIcon(prop)}
                                      <Badge variant="outline" className="text-xs px-1 py-0">
                                        {prop}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {food.rasa.map((taste, tasteIndex) => (
                                <Badge key={tasteIndex} variant="secondary" className="text-xs">
                                  {taste}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {meal.doctorNote && (
                        <div className="bg-accent/10 p-3 rounded border-l-4 border-accent">
                          <p className="text-sm text-foreground-muted italic">
                            💡 {meal.doctorNote}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Lifestyle Habits Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Daily Habits
              </CardTitle>
              <CardDescription>
                Track your Ayurvedic lifestyle practices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lifestyleHabits.map((habit) => {
                const HabitIcon = habit.icon;
                const isCompleted = completedHabits.has(habit.id);
                return (
                  <div key={habit.id} className="flex items-center space-x-3 p-2 rounded hover:bg-background-soft">
                    <Checkbox
                      id={habit.id}
                      checked={isCompleted}
                      onCheckedChange={() => toggleHabit(habit.id)}
                    />
                    <div className="flex-1 flex items-center gap-2">
                      <HabitIcon className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isCompleted ? 'line-through text-foreground-muted' : ''}`}>
                          {habit.name}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {habit.streak} day streak
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {habit.category}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Remedies Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your Personalized Remedies
            </CardTitle>
            <CardDescription>
              Ayurvedic remedies prescribed by your doctor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalizedRemedies.map((remedy) => {
              const isCompleted = completedRemedies.has(remedy.id);
              return (
                <div key={remedy.id} className="border rounded-lg p-4 bg-background-soft">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{remedy.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        For {remedy.condition}
                      </Badge>
                    </div>
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => toggleRemedy(remedy.id)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-foreground-muted">Ingredients:</p>
                      <ul className="text-sm list-disc list-inside ml-2">
                        {remedy.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground-muted">Instructions:</p>
                      <p className="text-sm">{remedy.instructions}</p>
                    </div>
                    
                    <div className="flex justify-between text-xs text-foreground-muted">
                      <span>Timing: {remedy.timing}</span>
                      <span>Duration: {remedy.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Progress & Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Progress & Reports
            </CardTitle>
            <CardDescription>
              Track your wellness journey and download reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold">Weekly Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Diet Compliance</span>
                    <span className="font-medium">{progressStats.dietCompliance}%</span>
                  </div>
                  <Progress value={progressStats.dietCompliance} />
                  
                  <div className="flex justify-between text-sm">
                    <span>Habit Completion</span>
                    <span className="font-medium">{progressStats.habitCompletion}%</span>
                  </div>
                  <Progress value={progressStats.habitCompletion} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Download Weekly Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Your Doctor
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientDashboard;