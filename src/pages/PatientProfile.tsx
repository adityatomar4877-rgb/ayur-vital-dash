import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, Activity, Calendar, Save } from "lucide-react";
import Layout from "@/components/Layout";

const PatientProfile = () => {
  const { id } = useParams();
  const isNewPatient = !id;
  const [isEditing, setIsEditing] = useState(isNewPatient);

  const [patientData, setPatientData] = useState({
    name: isNewPatient ? "" : "Priya Sharma",
    age: isNewPatient ? "" : "32",
    gender: isNewPatient ? "" : "female",
    email: isNewPatient ? "" : "priya.sharma@email.com",
    phone: isNewPatient ? "" : "+91 98765 43210",
    address: isNewPatient ? "" : "Mumbai, Maharashtra",
    constitution: isNewPatient ? "" : "pitta-kapha",
    currentCondition: isNewPatient ? "" : "Digestive Issues",
    symptoms: isNewPatient ? "" : "Bloating, acidity, irregular bowel movements",
    dietaryHabits: isNewPatient ? "" : "Vegetarian, prefers spicy food",
    waterIntake: isNewPatient ? "" : "2-3 liters daily",
    sleepPattern: isNewPatient ? "" : "6-7 hours, irregular",
    exerciseRoutine: isNewPatient ? "" : "Light yoga, 3 times a week",
    medicalHistory: isNewPatient ? "" : "Mild hypertension, no major surgeries",
  });

  const handleSave = () => {
    // Save patient data logic here
    setIsEditing(false);
    console.log("Patient data saved:", patientData);
  };

  const constitutionTypes = [
    { value: "vata", label: "Vata" },
    { value: "pitta", label: "Pitta" },
    { value: "kapha", label: "Kapha" },
    { value: "vata-pitta", label: "Vata-Pitta" },
    { value: "pitta-kapha", label: "Pitta-Kapha" },
    { value: "vata-kapha", label: "Vata-Kapha" },
    { value: "tridosha", label: "Tridosha" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
              {isNewPatient ? "New Patient" : "Patient Profile"}
            </h1>
            <p className="text-foreground-muted">
              {isNewPatient 
                ? "Create a comprehensive patient profile"
                : "Manage patient information and health history"
              }
            </p>
          </div>
          {!isNewPatient && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="constitution">Constitution</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Basic demographic and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={patientData.name}
                      onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={patientData.gender} 
                      onValueChange={(value) => setPatientData({...patientData, gender: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientData.email}
                      onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={patientData.phone}
                      onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={patientData.address}
                      onChange={(e) => setPatientData({...patientData, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="constitution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Ayurvedic Constitution & Current Condition
                </CardTitle>
                <CardDescription>
                  Dosha analysis and current health status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="constitution">Constitution (Prakriti)</Label>
                    <Select 
                      value={patientData.constitution} 
                      onValueChange={(value) => setPatientData({...patientData, constitution: value})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select constitution type" />
                      </SelectTrigger>
                      <SelectContent>
                        {constitutionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCondition">Current Condition</Label>
                    <Input
                      id="currentCondition"
                      value={patientData.currentCondition}
                      onChange={(e) => setPatientData({...patientData, currentCondition: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Primary health concern"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Current Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    value={patientData.symptoms}
                    onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Describe current symptoms in detail"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Lifestyle & Daily Routine
                </CardTitle>
                <CardDescription>
                  Diet, exercise, sleep, and daily habits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dietaryHabits">Dietary Habits</Label>
                  <Textarea
                    id="dietaryHabits"
                    value={patientData.dietaryHabits}
                    onChange={(e) => setPatientData({...patientData, dietaryHabits: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Describe food preferences, restrictions, and eating patterns"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="waterIntake">Water Intake</Label>
                    <Input
                      id="waterIntake"
                      value={patientData.waterIntake}
                      onChange={(e) => setPatientData({...patientData, waterIntake: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Daily water consumption"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleepPattern">Sleep Pattern</Label>
                    <Input
                      id="sleepPattern"
                      value={patientData.sleepPattern}
                      onChange={(e) => setPatientData({...patientData, sleepPattern: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Sleep duration and quality"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exerciseRoutine">Exercise Routine</Label>
                  <Textarea
                    id="exerciseRoutine"
                    value={patientData.exerciseRoutine}
                    onChange={(e) => setPatientData({...patientData, exerciseRoutine: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Physical activity and exercise habits"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Medical History
                </CardTitle>
                <CardDescription>
                  Past medical conditions, treatments, and family history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical History</Label>
                  <Textarea
                    id="medicalHistory"
                    value={patientData.medicalHistory}
                    onChange={(e) => setPatientData({...patientData, medicalHistory: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Previous illnesses, surgeries, medications, allergies, family history"
                    className="min-h-[120px]"
                  />
                </div>
                
                {!isNewPatient && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Treatment History</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-background-soft rounded-lg">
                        <div>
                          <p className="font-medium">Digestive Support Program</p>
                          <p className="text-sm text-foreground-muted">Started: March 2024</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-background-soft rounded-lg">
                        <div>
                          <p className="font-medium">Stress Management Plan</p>
                          <p className="text-sm text-foreground-muted">Completed: January 2024</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isNewPatient && (
          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Create Patient Profile
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PatientProfile;