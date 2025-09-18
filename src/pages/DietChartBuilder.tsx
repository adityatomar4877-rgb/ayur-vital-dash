import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, FileText, Download, Users } from "lucide-react";
import Layout from "@/components/Layout";

const DietChartBuilder = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mealPlan, setMealPlan] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });

  const patients = [
    { id: "1", name: "Priya Sharma", age: 32, constitution: "Pitta-Kapha" },
    { id: "2", name: "Rajesh Kumar", age: 45, constitution: "Vata-Pitta" },
    { id: "3", name: "Anita Singh", age: 28, constitution: "Kapha" },
  ];

  const suggestedFoods = [
    { name: "Quinoa Porridge", category: "Breakfast", calories: 222, constitution: "Tridoshic" },
    { name: "Mung Dal Khichdi", category: "Lunch", calories: 180, constitution: "Tridoshic" },
    { name: "Steamed Vegetables", category: "Dinner", calories: 95, constitution: "Pitta-Kapha" },
    { name: "Herbal Tea", category: "Snacks", calories: 5, constitution: "Vata" },
    { name: "Fresh Fruit Salad", category: "Snacks", calories: 89, constitution: "Pitta" },
  ];

  const addFoodToMeal = (mealType: string, food: any) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: [...prev[mealType], { ...food, id: Date.now() }]
    }));
  };

  const removeFoodFromMeal = (mealType: string, foodId: number) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }));
  };

  const getTotalCalories = (meal: any[]) => {
    return meal.reduce((total, food) => total + food.calories, 0);
  };

  const getTotalDayCalories = () => {
    return Object.values(mealPlan).flat().reduce((total: number, food: any) => total + food.calories, 0);
  };

  const MealSection = ({ title, mealType, foods }: { title: string, mealType: string, foods: any[] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary">
            {getTotalCalories(foods)} calories
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {foods.length === 0 ? (
          <p className="text-foreground-muted text-sm text-center py-4">
            No items added yet. Add foods from suggestions below.
          </p>
        ) : (
          foods.map((food) => (
            <div key={food.id} className="flex items-center justify-between p-3 bg-background-soft rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{food.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {food.calories} cal
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {food.constitution}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFoodFromMeal(mealType, food.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
              Diet Chart Builder
            </h1>
            <p className="text-foreground-muted">
              Create personalized Ayurvedic diet plans for your patients
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Select Patient
            </CardTitle>
            <CardDescription>
              Choose the patient for whom you want to create a diet chart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Select a patient..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{patient.name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="outline" className="text-xs">
                          Age {patient.age}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {patient.constitution}
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Meal Planning */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-playfair font-semibold">Daily Meal Plan</h2>
              <Badge className="bg-primary/10 text-primary">
                Total: {getTotalDayCalories()} calories
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <MealSection 
                title="Breakfast" 
                mealType="breakfast" 
                foods={mealPlan.breakfast} 
              />
              <MealSection 
                title="Lunch" 
                mealType="lunch" 
                foods={mealPlan.lunch} 
              />
              <MealSection 
                title="Dinner" 
                mealType="dinner" 
                foods={mealPlan.dinner} 
              />
              <MealSection 
                title="Snacks" 
                mealType="snacks" 
                foods={mealPlan.snacks} 
              />
            </div>
          </div>

          {/* Food Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Foods</CardTitle>
              <CardDescription>
                Foods suitable for the selected patient's constitution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedFoods.map((food, index) => (
                <div key={index} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{food.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {food.calories} cal
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {food.constitution}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1"
                      onClick={() => addFoodToMeal('breakfast', food)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Breakfast
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1"
                      onClick={() => addFoodToMeal('lunch', food)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Lunch
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1"
                      onClick={() => addFoodToMeal('dinner', food)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Dinner
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs flex-1"
                      onClick={() => addFoodToMeal('snacks', food)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Snacks
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Ayurvedic Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Ayurvedic Guidelines & Notes</CardTitle>
            <CardDescription>
              Additional recommendations based on patient's constitution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="guidelines" className="w-full">
              <TabsList>
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="timing">Meal Timing</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              </TabsList>
              
              <TabsContent value="guidelines" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Foods to Favor</h4>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      <li>• Warm, cooked foods</li>
                      <li>• Fresh, seasonal vegetables</li>
                      <li>• Whole grains and legumes</li>
                      <li>• Moderate amounts of healthy fats</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Foods to Avoid</h4>
                    <ul className="text-sm text-foreground-muted space-y-1">
                      <li>• Cold, raw foods in excess</li>
                      <li>• Processed and packaged foods</li>
                      <li>• Excessive spicy or oily foods</li>
                      <li>• Late night heavy meals</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timing" className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-background-soft rounded-lg">
                    <h4 className="font-semibold text-sm">Morning (6-10 AM)</h4>
                    <p className="text-sm text-foreground-muted">Light, warm breakfast. Kapha time - avoid heavy foods.</p>
                  </div>
                  <div className="p-3 bg-background-soft rounded-lg">
                    <h4 className="font-semibold text-sm">Midday (10 AM-2 PM)</h4>
                    <p className="text-sm text-foreground-muted">Largest meal of the day. Pitta time - digestive fire is strongest.</p>
                  </div>
                  <div className="p-3 bg-background-soft rounded-lg">
                    <h4 className="font-semibold text-sm">Evening (6-10 PM)</h4>
                    <p className="text-sm text-foreground-muted">Light, warm dinner. Finish eating 3 hours before sleep.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="lifestyle" className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-background-soft rounded-lg">
                    <h4 className="font-semibold text-sm">Eating Practices</h4>
                    <p className="text-sm text-foreground-muted">Eat in a calm environment, chew thoroughly, avoid distractions like TV or phones.</p>
                  </div>
                  <div className="p-3 bg-background-soft rounded-lg">
                    <h4 className="font-semibold text-sm">Hydration</h4>
                    <p className="text-sm text-foreground-muted">Drink warm water throughout the day. Avoid ice-cold drinks with meals.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DietChartBuilder;