import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, Clock, AlertCircle, BookOpen, Plus } from "lucide-react";
import Layout from "@/components/Layout";

const Remedies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedDosha, setSelectedDosha] = useState("all");

  const remedies = [
    {
      id: 1,
      title: "Ginger Tea for Cold & Cough",
      condition: "Cold & Cough",
      doshas: ["Vata", "Kapha"],
      severity: "Mild",
      duration: "3-5 days",
      ingredients: ["Fresh ginger root (1 inch)", "Honey (1 tsp)", "Lemon juice (1 tsp)", "Hot water (1 cup)"],
      preparation: "Boil ginger in water for 5 minutes. Add honey and lemon juice. Drink warm 2-3 times daily.",
      benefits: "Reduces congestion, soothes throat, boosts immunity",
      precautions: "Avoid if you have high Pitta. Reduce ginger quantity for sensitive stomachs."
    },
    {
      id: 2,
      title: "Turmeric Milk for Joint Pain",
      condition: "Joint Pain",
      doshas: ["Vata", "Kapha"],
      severity: "Moderate",
      duration: "1-2 weeks",
      ingredients: ["Turmeric powder (1/2 tsp)", "Warm milk (1 cup)", "Ghee (1/2 tsp)", "Black pepper (pinch)"],
      preparation: "Heat milk, add turmeric, ghee, and black pepper. Drink before bedtime.",
      benefits: "Reduces inflammation, relieves joint stiffness, promotes better sleep",
      precautions: "Avoid if lactose intolerant. Use plant-based milk as alternative."
    },
    {
      id: 3,
      title: "Fennel Water for Digestive Issues",
      condition: "Digestive Issues",
      doshas: ["Pitta", "Vata"],
      severity: "Mild",
      duration: "1-3 days",
      ingredients: ["Fennel seeds (1 tsp)", "Hot water (1 cup)"],
      preparation: "Soak fennel seeds in hot water for 10 minutes. Strain and drink after meals.",
      benefits: "Improves digestion, reduces bloating, freshens breath",
      precautions: "Generally safe for all constitutions. Avoid excessive consumption."
    },
    {
      id: 4,
      title: "Ashwagandha for Stress & Anxiety",
      condition: "Stress & Anxiety",
      doshas: ["Vata"],
      severity: "Moderate",
      duration: "2-4 weeks",
      ingredients: ["Ashwagandha powder (1/2 tsp)", "Warm milk (1 cup)", "Honey (1 tsp)"],
      preparation: "Mix ashwagandha powder in warm milk. Add honey to taste. Consume before sleep.",
      benefits: "Reduces stress, improves sleep quality, balances hormones",
      precautions: "Consult doctor if pregnant or on medication. Start with smaller doses."
    },
    {
      id: 5,
      title: "Triphala for Constipation",
      condition: "Constipation",
      doshas: ["Vata"],
      severity: "Mild to Moderate",
      duration: "1-2 weeks",
      ingredients: ["Triphala powder (1/2 tsp)", "Warm water (1 cup)"],
      preparation: "Mix triphala powder in warm water. Drink on empty stomach before bed.",
      benefits: "Gentle laxative, cleanses colon, improves digestion",
      precautions: "Start with smaller doses. Avoid during pregnancy and severe digestive disorders."
    },
    {
      id: 6,
      title: "Cucumber-Mint for Acidity",
      condition: "Acidity",
      doshas: ["Pitta"],
      severity: "Mild",
      duration: "Immediate relief",
      ingredients: ["Cucumber (1 medium)", "Fresh mint leaves (10-12)", "Water (1 cup)", "Rock salt (pinch)"],
      preparation: "Blend cucumber, mint, and water. Add rock salt. Drink fresh immediately.",
      benefits: "Cools the system, reduces acidity, soothes stomach lining",
      precautions: "Best consumed fresh. Avoid if you have Kapha imbalance."
    }
  ];

  const conditions = ["all", "Cold & Cough", "Joint Pain", "Digestive Issues", "Stress & Anxiety", "Constipation", "Acidity", "Headache", "Insomnia"];
  const doshas = ["all", "Vata", "Pitta", "Kapha"];

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         remedy.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCondition = selectedCondition === "all" || remedy.condition === selectedCondition;
    const matchesDosha = selectedDosha === "all" || remedy.doshas.includes(selectedDosha);
    
    return matchesSearch && matchesCondition && matchesDosha;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild": return "bg-green-100 text-green-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "severe": return "bg-red-100 text-red-800";
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
              Ayurvedic Remedies
            </h1>
            <p className="text-foreground-muted">
              Natural remedies for common acute conditions and health concerns
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Remedy
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
                    placeholder="Search remedies or conditions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition === "all" ? "All Conditions" : condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Dosha" />
                </SelectTrigger>
                <SelectContent>
                  {doshas.map((dosha) => (
                    <SelectItem key={dosha} value={dosha}>
                      {dosha === "all" ? "All Doshas" : dosha}
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
            Showing {filteredRemedies.length} of {remedies.length} remedies
          </p>
        </div>

        {/* Remedies Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredRemedies.map((remedy) => (
            <Card key={remedy.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{remedy.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {remedy.condition}
                      </Badge>
                      <Badge className={`text-xs ${getSeverityColor(remedy.severity)}`}>
                        {remedy.severity}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-foreground-muted">
                        <Clock className="h-3 w-3" />
                        {remedy.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {remedy.doshas.map((dosha) => (
                        <Badge key={dosha} variant="secondary" className="text-xs">
                          {dosha}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="ingredients" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="method">Method</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ingredients" className="space-y-3">
                    <ul className="space-y-1 text-sm">
                      {remedy.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="method" className="space-y-3">
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {remedy.preparation}
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="benefits" className="space-y-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                          <Heart className="h-3 w-3 text-success" />
                          Benefits
                        </h4>
                        <p className="text-sm text-foreground-muted">
                          {remedy.benefits}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-warning" />
                          Precautions
                        </h4>
                        <p className="text-sm text-foreground-muted">
                          {remedy.precautions}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="pt-3 border-t border-border">
                  <Button variant="outline" className="w-full text-sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Add to Patient Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRemedies.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-12 w-12 text-foreground-light mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No remedies found</h3>
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

export default Remedies;