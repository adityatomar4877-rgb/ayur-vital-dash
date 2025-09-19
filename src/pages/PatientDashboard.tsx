import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import DietChart from '@/components/patient/DietChart';
import RemediesSection from '@/components/patient/RemediesSection';
import LifestyleTracker from '@/components/patient/LifestyleTracker';
import ProgressReports from '@/components/patient/ProgressReports';
import NotificationsReminders from '@/components/patient/NotificationsReminders';
import MessagesNotes from '@/components/patient/MessagesNotes';
import { Calendar, Heart, Activity, Bell, MessageCircle, CheckCircle } from 'lucide-react';

const PatientDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/patient-auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-playfair font-bold text-gradient-primary">
            Welcome Back, {user.email?.split('@')[0] || 'Wellness Seeker'}
          </h1>
          <p className="text-foreground-muted">
            Your personalized Ayurvedic wellness journey continues today.
          </p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="diet" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="diet" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Diet
            </TabsTrigger>
            <TabsTrigger value="remedies" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Remedies
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diet" className="mt-6">
            <DietChart />
          </TabsContent>

          <TabsContent value="remedies" className="mt-6">
            <RemediesSection />
          </TabsContent>

          <TabsContent value="lifestyle" className="mt-6">
            <LifestyleTracker />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressReports />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationsReminders />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessagesNotes />
          </TabsContent>
        </Tabs>

      </div>
    </Layout>
  );
};

export default PatientDashboard;