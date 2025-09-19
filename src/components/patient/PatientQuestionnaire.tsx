import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Info, PieChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuestionnaireData {
  age: number;
  height_cm: number;
  weight_kg: number;
  allergies: string[];
  medical_conditions: string[];
  food_preferences: string[];
  dosha_scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

const doshaQuestions = [
  {
    question: "How would you describe your body build?",
    options: [
      { text: "Thin, lean frame", dosha: "vata", score: 2 },
      { text: "Medium, athletic build", dosha: "pitta", score: 2 },
      { text: "Large, heavy frame", dosha: "kapha", score: 2 },
    ]
  },
  {
    question: "How is your digestion?",
    options: [
      { text: "Variable, sometimes good, sometimes poor", dosha: "vata", score: 2 },
      { text: "Strong, I can eat anything", dosha: "pitta", score: 2 },
      { text: "Slow but steady", dosha: "kapha", score: 2 },
    ]
  },
  {
    question: "How do you handle stress?",
    options: [
      { text: "I get anxious and worried easily", dosha: "vata", score: 2 },
      { text: "I get irritated and angry", dosha: "pitta", score: 2 },
      { text: "I remain calm and composed", dosha: "kapha", score: 2 },
    ]
  },
  {
    question: "What's your energy pattern?",
    options: [
      { text: "High bursts followed by fatigue", dosha: "vata", score: 2 },
      { text: "Intense and focused energy", dosha: "pitta", score: 2 },
      { text: "Steady, enduring energy", dosha: "kapha", score: 2 },
    ]
  },
  {
    question: "How do you sleep?",
    options: [
      { text: "Light sleeper, difficulty falling asleep", dosha: "vata", score: 2 },
      { text: "Moderate sleep, wake up refreshed", dosha: "pitta", score: 2 },
      { text: "Deep, long sleep", dosha: "kapha", score: 2 },
    ]
  }
];

const PatientQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    age: 0,
    height_cm: 0,
    weight_kg: 0,
    allergies: [],
    medical_conditions: [],
    food_preferences: [],
    dosha_scores: { vata: 0, pitta: 0, kapha: 0 }
  });
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 4; // Basic info, Health info, Dosha questions, Results
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleDoshaAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);

    // Update dosha scores
    const option = doshaQuestions[questionIndex].options[optionIndex];
    const newScores = { ...formData.dosha_scores };
    newScores[option.dosha as keyof typeof newScores] += option.score;
    
    setFormData(prev => ({
      ...prev,
      dosha_scores: newScores
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Calculate dominant dosha
    const { vata, pitta, kapha } = formData.dosha_scores;
    let dominant_dosha = 'tridoshic';
    
    if (vata > pitta && vata > kapha) {
      dominant_dosha = 'vata';
    } else if (pitta > vata && pitta > kapha) {
      dominant_dosha = 'pitta';
    } else if (kapha > vata && kapha > pitta) {
      dominant_dosha = 'kapha';
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          dominant_dosha,
          questionnaire_completed: true
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Questionnaire Completed!",
        description: "Your Ayurvedic profile has been created successfully.",
      });

      navigate('/patient-dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height_cm || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, height_cm: parseInt(e.target.value) || 0 }))}
                    placeholder="Height in cm"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight_kg || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight_kg: parseInt(e.target.value) || 0 }))}
                    placeholder="Weight in kg"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Health Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="allergies">Food Allergies (separate with commas)</Label>
                  <Input
                    id="allergies"
                    value={formData.allergies.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }))}
                    placeholder="e.g., Nuts, Dairy, Gluten"
                  />
                </div>
                <div>
                  <Label htmlFor="conditions">Medical Conditions (separate with commas)</Label>
                  <Input
                    id="conditions"
                    value={formData.medical_conditions.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      medical_conditions: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }))}
                    placeholder="e.g., Diabetes, Hypertension"
                  />
                </div>
                <div>
                  <Label htmlFor="preferences">Food Preferences (separate with commas)</Label>
                  <Input
                    id="preferences"
                    value={formData.food_preferences.join(', ')}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      food_preferences: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }))}
                    placeholder="e.g., Vegetarian, Spicy food, Sweet foods"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Dosha Assessment</h3>
              <p className="text-foreground-muted mb-6">
                Answer these questions to determine your dominant dosha (body type).
              </p>
              
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>The Three Doshas:</strong><br/>
                  <span className="font-medium text-orange-600">Vata</span> - Air & Space (Movement, creativity, anxiety when imbalanced)<br/>
                  <span className="font-medium text-red-600">Pitta</span> - Fire & Water (Transformation, focus, anger when imbalanced)<br/>
                  <span className="font-medium text-green-600">Kapha</span> - Earth & Water (Structure, stability, lethargy when imbalanced)
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {doshaQuestions.map((q, questionIndex) => (
                  <Card key={questionIndex} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{q.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {q.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-background-soft">
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            checked={selectedAnswers[questionIndex] === optionIndex}
                            onChange={() => handleDoshaAnswer(questionIndex, optionIndex)}
                            className="text-primary"
                          />
                          <span className="flex-1">{option.text}</span>
                          <Badge variant="outline" className={
                            option.dosha === 'vata' ? 'border-orange-300 text-orange-600' :
                            option.dosha === 'pitta' ? 'border-red-300 text-red-600' :
                            'border-green-300 text-green-600'
                          }>
                            {option.dosha}
                          </Badge>
                        </label>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        const { vata, pitta, kapha } = formData.dosha_scores;
        const total = vata + pitta + kapha;
        const vataPct = total > 0 ? (vata / total) * 100 : 0;
        const pittaPct = total > 0 ? (pitta / total) * 100 : 0;
        const kaphaPct = total > 0 ? (kapha / total) * 100 : 0;

        return (
          <div className="space-y-6">
            <div className="text-center">
              <PieChart className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Dosha Profile</h3>
              <p className="text-foreground-muted">Based on your responses, here's your Ayurvedic constitution:</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-orange-600">Vata</span>
                  <span>{vataPct.toFixed(0)}%</span>
                </div>
                <Progress value={vataPct} className="h-3" />
                <p className="text-sm text-foreground-muted">Air & Space - Governs movement, breathing, circulation</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-600">Pitta</span>
                  <span>{pittaPct.toFixed(0)}%</span>
                </div>
                <Progress value={pittaPct} className="h-3" />
                <p className="text-sm text-foreground-muted">Fire & Water - Governs digestion, metabolism, transformation</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-600">Kapha</span>
                  <span>{kaphaPct.toFixed(0)}%</span>
                </div>
                <Progress value={kaphaPct} className="h-3" />
                <p className="text-sm text-foreground-muted">Earth & Water - Governs structure, immunity, stability</p>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your personalized diet and lifestyle recommendations will be based on this dosha profile. 
                A balanced approach incorporating all three doshas leads to optimal health.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background-soft p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gradient-primary mb-2">
            Welcome to Jeevanamrit
          </h1>
          <p className="text-foreground-muted">Complete this questionnaire to create your personalized Ayurvedic profile</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-foreground-muted mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card className="shadow-medium">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={() => setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1))}
              disabled={
                (currentStep === 0 && (!formData.age || !formData.height_cm || !formData.weight_kg)) ||
                (currentStep === 2 && selectedAnswers.length < doshaQuestions.length)
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientQuestionnaire;