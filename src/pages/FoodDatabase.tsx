import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Database, Flame, Snowflake, Plus, Filter } from "lucide-react";
import Layout from "@/components/Layout";

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTaste, setSelectedTaste] = useState("all");

  const foodItems = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      ayurvedicProps: {
        nature: "Cool",
        digestion: "Easy",
        tastes: ["Sweet"],
        doshaEffect: "Balances Pitta, increases Kapha"
      }
    },
    {
      id: 2,
      name: "Turmeric",
      category: "Spices",
      calories: 24,
      protein: 0.9,
      carbs: 4.4,
      fat: 0.7,
      fiber: 1.4,
      ayurvedicProps: {
        nature: "Hot",
        digestion: "Medium",
        tastes: ["Bitter", "Pungent"],
        doshaEffect: "Balances Kapha, may aggravate Pitta"
      }
    },
    {
      id: 3,
      name: "Almonds",
      category: "Nuts & Seeds",
      calories: 161,
      protein: 6,
      carbs: 6.1,
      fat: 14,
      fiber: 3.5,
      ayurvedicProps: {
        nature: "Hot",
        digestion: "Heavy",
        tastes: ["Sweet"],
        doshaEffect: "Increases Pitta and Kapha, balances Vata"
      }
    },
    {
      id: 4,
      name: "Cucumber",
      category: "Vegetables",
      calories: 16,
      protein: 0.7,
      carbs: 4,
      fat: 0.1,
      fiber: 0.5,
      ayurvedicProps: {
        nature: "Cool",
        digestion: "Easy",
        tastes: ["Sweet", "Astringent"],
        doshaEffect: "Balances Pitta, may increase Vata and Kapha"
      }
    },
    {
      id: 5,
      name: "Ginger",
      category: "Spices",
      calories: 80,
      protein: 1.8,
      carbs: 18,
      fat: 0.8,
      fiber: 2,
      ayurvedicProps: {
        nature: "Hot",
        digestion: "Light",
        tastes: ["Pungent", "Sweet"],
        doshaEffect: "Balances Vata and Kapha, may increase Pitta"
      }
    },
    {
      id: 6,
      name: "Mung Dal",
      category: "Legumes",
      calories: 347,
      protein: 24,
      carbs: 59,
      fat: 1.2,
      fiber: 16,
      ayurvedicProps: {
        nature: "Cool",
        digestion: "Easy",
        tastes: ["Sweet", "Astringent"],
        doshaEffect: "Tridoshic - balances all doshas"
      }
    }
  ];

  const categories = ["all", "Grains", "Vegetables", "Fruits", "Legumes", "Nuts & Seeds", "Spices", "Dairy"];
  const tastes = ["all", "Sweet", "Sour", "Salty", "Pungent", "Bitter", "Astringent"];

  const filteredFoods = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    const matchesTaste = selectedTaste === "all" || food.ayurvedicProps.tastes.includes(selectedTaste);
    
    return matchesSearch && matchesCategory && matchesTaste;
  });

  const getNatureIcon = (nature: string) => {
    return nature === "Hot" ? <Flame className="h-4 w-4 text-orange-500" /> : <Snowflake className="h-4 w-4 text-blue-500" />;
  };

  const getNatureBadgeColor = (nature: string) => {
    return nature === "Hot" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800";
  };

  const getDigestionBadgeColor = (digestion: string) => {
    switch (digestion) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Heavy": return "bg-red-100 text-red-800";
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
              Food Database
            </h1>
            <p className="text-foreground-muted">
              Comprehensive database of foods with nutritional and Ayurvedic properties
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Food
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-muted h-4 w-4" />
                  <Input
                    placeholder="Search foods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTaste} onValueChange={setSelectedTaste}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Taste" />
                </SelectTrigger>
                <SelectContent>
                  {tastes.map((taste) => (
                    <SelectItem key={taste} value={taste}>
                      {taste === "all" ? "All Tastes" : taste}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-foreground-muted">
            Showing {filteredFoods.length} of {foodItems.length} foods
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Food Items Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((food) => (
            <Card key={food.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{food.name}</CardTitle>
                    <CardDescription>{food.category}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {food.calories} cal/100g
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="nutrition" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                    <TabsTrigger value="ayurveda">Ayurveda</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="nutrition" className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Protein:</span>
                        <span className="font-medium">{food.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Carbs:</span>
                        <span className="font-medium">{food.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Fat:</span>
                        <span className="font-medium">{food.fat}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground-muted">Fiber:</span>
                        <span className="font-medium">{food.fiber}g</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ayurveda" className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground-muted">Nature:</span>
                        <div className="flex items-center gap-1">
                          {getNatureIcon(food.ayurvedicProps.nature)}
                          <Badge className={`text-xs ${getNatureBadgeColor(food.ayurvedicProps.nature)}`}>
                            {food.ayurvedicProps.nature}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground-muted">Digestion:</span>
                        <Badge className={`text-xs ${getDigestionBadgeColor(food.ayurvedicProps.digestion)}`}>
                          {food.ayurvedicProps.digestion}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm text-foreground-muted">Tastes:</span>
                        <div className="flex flex-wrap gap-1">
                          {food.ayurvedicProps.tastes.map((taste) => (
                            <Badge key={taste} variant="outline" className="text-xs">
                              {taste}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-foreground-muted">
                          {food.ayurvedicProps.doshaEffect}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button variant="outline" className="w-full text-xs">
                  Add to Diet Chart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Database className="h-12 w-12 text-foreground-light mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No foods found</h3>
              <p className="text-foreground-muted">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default FoodDatabase;