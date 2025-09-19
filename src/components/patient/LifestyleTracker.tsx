import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Sun, 
  Droplets, 
  Heart, 
  Leaf, 
  Moon, 
  Activity,
  Award,
  Sunrise,
  Sunset
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
  icon: React.ComponentType<any>;
  description: string;
  ayurvedicBenefit: string;
}

const mockHabits: Habit[] = [
  {
    id: "habit1",
    name: "Wake up before sunrise",
    category: "Morning Routine",
    streak: 12,
    icon: Sunrise,
    description: "Rise early to align with natural rhythms",
    ayurvedicBenefit: "Balances Vata, increases Ojas (vital energy)"
  },
  {
    id: "habit2", 
    name: "Drink warm water",
    category: "Hydration",
    streak: 8,
    icon: Droplets,
    description: "Start day with warm water to kindle Agni",
    ayurvedicBenefit: "Improves digestion, flushes toxins"
  },
  {
    id: "habit3",
    name: "15-min morning yoga",
    category: "Exercise",
    streak: 5,
    icon: Heart,
    description: "Gentle yoga to awaken the body",
    ayurvedicBenefit: "Balances all doshas, improves flexibility"
  },
  {
    id: "habit4",
    name: "Evening meditation",
    category: "Mental Health",
    streak: 15,
    icon: Leaf,
    description: "10 minutes of mindful meditation",
    ayurvedicBenefit: "Calms Vata, reduces stress and anxiety"
  },
  {
    id: "habit5",
    name: "Oil pulling",
    category: "Oral Care", 
    streak: 3,
    icon: Droplets,
    description: "Swish sesame oil for 10 minutes",
    ayurvedicBenefit: "Detoxifies, strengthens teeth and gums"
  },
  {
    id: "habit6",
    name: "Sleep by 10 PM",
    category: "Sleep",
    streak: 7,
    icon: Moon,
    description: "Early bedtime for optimal rest",
    ayurvedicBenefit: "Aligns with Kapha time, deeper sleep"
  }
];

const seasonalTips = [
  "🍂 Autumn (Vata Season): Focus on warm, grounding foods and routines",
  "❄️ Winter (Kapha Season): Increase activity and eat lighter, warming foods",
  "🌸 Spring (Kapha Season): Detox with bitter and astringent tastes",
  "☀️ Summer (Pitta Season): Stay cool with sweet, cooling foods and activities"
];

const LifestyleTracker = () => {
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(new Set());

  const toggleHabit = (habitId: string) => {
    const newCompleted = new Set(completedHabits);
    if (newCompleted.has(habitId)) {
      newCompleted.delete(habitId);
    } else {
      newCompleted.add(habitId);
    }
    setCompletedHabits(newCompleted);
  };

  const completedCount = completedHabits.size;
  const totalCount = mockHabits.length;
  const completionPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Daily Lifestyle Practices
          </CardTitle>
          <CardDescription>
            Track your Ayurvedic lifestyle habits • {completedCount}/{totalCount} completed
          </CardDescription>
          <div className="mt-2">
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockHabits.map((habit) => {
            const HabitIcon = habit.icon;
            const isCompleted = completedHabits.has(habit.id);
            return (
              <div key={habit.id} className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                isCompleted ? 'bg-success/10 border-success/30' : 'hover:bg-background-soft border-border'
              }`}>
                <Checkbox
                  id={habit.id}
                  checked={isCompleted}
                  onCheckedChange={() => toggleHabit(habit.id)}
                />
                <div className="flex-1 flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isCompleted ? 'bg-success/20' : 'bg-primary/10'}`}>
                    <HabitIcon className={`h-4 w-4 ${isCompleted ? 'text-success' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isCompleted ? 'line-through text-foreground-muted' : ''}`}>
                      {habit.name}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {habit.description}
                    </p>
                    <p className="text-xs text-accent font-medium">
                      {habit.ayurvedicBenefit}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      {habit.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <Award className="h-3 w-3" />
                      {habit.streak} day streak
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {completionPercentage === 100 && (
        <Alert className="border-success/30 bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">
            🎉 Excellent! You've completed all your daily practices. Your dedication to Ayurvedic living is commendable!
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sunset className="h-5 w-5 text-primary" />
            Ritucharya - Seasonal Wisdom
          </CardTitle>
          <CardDescription>
            Ayurvedic guidance for living in harmony with seasons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seasonalTips.map((tip, index) => (
              <div key={index} className="p-3 bg-background-soft rounded-lg border-l-4 border-primary">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-accent rounded-lg">
            <h4 className="font-semibold mb-2 text-accent-foreground">Today's Focus</h4>
            <p className="text-sm text-accent-foreground">
              🌿 Autumn season: Focus on warm, nourishing foods and maintaining regular routines 
              to balance increasing Vata energy. Consider warming spices like ginger and cinnamon.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const progress = [85, 90, 75, 100, 95, 80, completionPercentage][index];
              return (
                <div key={day} className="text-center">
                  <div className="text-xs text-foreground-muted mb-1">{day}</div>
                  <div className={`h-16 w-full rounded-lg flex items-end justify-center text-xs font-medium text-white ${
                    progress >= 80 ? 'bg-success' : progress >= 60 ? 'bg-warning' : 'bg-destructive'
                  }`} style={{ background: `linear-gradient(to top, currentColor ${progress}%, transparent ${progress}%)` }}>
                    {progress}%
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-foreground-muted text-center">
            Your weekly habit completion rate. Aim for 80%+ consistency for optimal results.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifestyleTracker;