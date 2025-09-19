import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Heart, Clock, CheckCircle2 } from 'lucide-react';

interface Remedy {
  id: string;
  title: string;
  condition: string;
  ingredients: string[];
  instructions: string;
  timing: string;
  duration: string;
  benefits: string[];
}

const mockRemedies: Remedy[] = [
  {
    id: "remedy1",
    title: "Morning Digestive Tea",
    condition: "Weak Digestion",
    ingredients: ["1 tsp Ginger powder", "1/2 tsp Cumin", "Pinch of Rock salt", "1 cup Water"],
    instructions: "Boil all ingredients in water for 5 minutes. Strain and drink warm on empty stomach. Add honey if needed after cooling slightly.",
    timing: "Every morning before breakfast",
    duration: "2 weeks",
    benefits: ["Improves Agni (digestive fire)", "Reduces bloating", "Enhances appetite"]
  },
  {
    id: "remedy2", 
    title: "Joint Care Oil Massage",
    condition: "Joint Stiffness",
    ingredients: ["2 tbsp Sesame oil", "3-4 drops Eucalyptus oil", "1 tsp Turmeric powder"],
    instructions: "Warm the sesame oil slightly. Mix in turmeric powder and eucalyptus oil. Massage affected joints in circular motions for 10 minutes. Leave for 30 minutes before bathing.",
    timing: "Evening before bath",
    duration: "Daily for 3 weeks",
    benefits: ["Reduces inflammation", "Improves joint mobility", "Nourishes tissues"]
  },
  {
    id: "remedy3",
    title: "Cooling Pitta Tea",
    condition: "Excess Heat/Acidity",
    ingredients: ["1 tsp Coriander seeds", "1/2 tsp Fennel seeds", "Few Mint leaves", "1 cup Water"],
    instructions: "Boil coriander and fennel seeds for 3 minutes. Add mint leaves and steep for 2 minutes. Strain and drink at room temperature.",
    timing: "After lunch and dinner",
    duration: "1 week",
    benefits: ["Cools excess Pitta", "Reduces acidity", "Aids digestion"]
  }
];

const RemediesSection = () => {
  const [completedRemedies, setCompletedRemedies] = useState<Set<string>>(new Set());

  const toggleRemedy = (remedyId: string) => {
    const newCompleted = new Set(completedRemedies);
    if (newCompleted.has(remedyId)) {
      newCompleted.delete(remedyId);
    } else {
      newCompleted.add(remedyId);
    }
    setCompletedRemedies(newCompleted);
  };

  const completedCount = completedRemedies.size;
  const totalCount = mockRemedies.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Your Personalized Remedies
        </CardTitle>
        <CardDescription>
          Ayurvedic remedies prescribed by your doctor • {completedCount}/{totalCount} completed today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRemedies.map((remedy) => {
          const isCompleted = completedRemedies.has(remedy.id);
          return (
            <div key={remedy.id} className={`border rounded-lg p-4 transition-all ${
              isCompleted ? 'bg-success/5 border-success/30' : 'bg-background-soft hover:shadow-soft'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={`font-semibold ${isCompleted ? 'line-through text-foreground-muted' : ''}`}>
                    {remedy.title}
                  </h3>
                  <Badge variant="outline" className="mt-1">
                    For {remedy.condition}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle2 className="h-4 w-4 text-success" />}
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => toggleRemedy(remedy.id)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground-muted mb-1">Ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {remedy.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-foreground-muted mb-1">Instructions:</p>
                  <p className="text-sm leading-relaxed">{remedy.instructions}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground-muted mb-1">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {remedy.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-success border-success/30">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-foreground-muted pt-2 border-t">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {remedy.timing}
                  </span>
                  <span>Duration: {remedy.duration}</span>
                </div>
              </div>
            </div>
          );
        })}

        {completedCount === totalCount && (
          <div className="text-center py-6 bg-success/10 rounded-lg border border-success/30">
            <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-success font-medium">All remedies completed for today!</p>
            <p className="text-sm text-foreground-muted">Great job maintaining your Ayurvedic routine.</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gradient-secondary rounded-lg">
          <h4 className="font-semibold mb-2 text-foreground">Remedy Tips</h4>
          <ul className="text-sm text-foreground-muted space-y-1">
            <li>• Take remedies consistently for best results</li>
            <li>• Always use fresh, quality ingredients</li>
            <li>• Consult your doctor if you experience any discomfort</li>
            <li>• Maintain proper timing as prescribed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemediesSection;