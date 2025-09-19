import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Coffee, Utensils, Moon, Star, Flame, Snowflake } from 'lucide-react';

interface FoodItem {
  name: string;
  calories: number;
  properties: string[];
  rasa: string[];
}

interface Meal {
  time: string;
  type: string;
  icon: React.ComponentType<any>;
  foods: FoodItem[];
  doctorNote?: string;
}

const mockMeals: Meal[] = [
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

const getPropertyIcon = (property: string) => {
  if (property.includes("Hot") || property.includes("Warm")) return <Flame className="h-3 w-3 text-orange-500" />;
  if (property.includes("Cool") || property.includes("Cold")) return <Snowflake className="h-3 w-3 text-blue-500" />;
  return null;
};

const DietChart = () => {
  const totalCalories = mockMeals.reduce((total, meal) => 
    total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0), 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Today's Diet Chart
        </CardTitle>
        <CardDescription>
          Your personalized meal plan for optimal health • Total: {totalCalories} calories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockMeals.map((meal, index) => {
          const MealIcon = meal.icon;
          return (
            <div key={index} className="border rounded-lg p-4 bg-background-soft hover-lift">
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
                  <div key={foodIndex} className="flex items-center justify-between bg-card p-3 rounded border hover:shadow-soft transition-shadow">
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

        <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-white">
          <h4 className="font-semibold mb-2">Six Rasas (Tastes) in Your Diet</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div>Sweet - Nourishing</div>
            <div>Sour - Digestive</div>
            <div>Salty - Hydrating</div>
            <div>Bitter - Detoxifying</div>
            <div>Pungent - Warming</div>
            <div>Astringent - Binding</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DietChart;