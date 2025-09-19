import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Clock, 
  Coffee, 
  Droplets, 
  Heart, 
  Utensils, 
  Moon, 
  Quote,
  Settings,
  Check,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'meal' | 'water' | 'remedy' | 'habit' | 'quote';
  title: string;
  message: string;
  time: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
}

interface NotificationSettings {
  meals: boolean;
  water: boolean;
  remedies: boolean;
  habits: boolean;
  quotes: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'meal',
    title: 'Breakfast Time',
    message: 'Time for your warm oatmeal with almonds. Don\'t forget to eat mindfully!',
    time: '7:00 AM',
    icon: Coffee,
    priority: 'high',
    isRead: false
  },
  {
    id: '2',
    type: 'water',
    title: 'Hydration Reminder',
    message: 'Drink a glass of warm water to support your digestion.',
    time: '9:30 AM',
    icon: Droplets,
    priority: 'medium',
    isRead: false
  },
  {
    id: '3',
    type: 'remedy',
    title: 'Morning Digestive Tea',
    message: 'Time to prepare and drink your ginger-cumin digestive tea.',
    time: '6:30 AM',
    icon: Heart,
    priority: 'high',
    isRead: true
  },
  {
    id: '4',
    type: 'habit',
    title: 'Morning Yoga',
    message: 'Your 15-minute yoga session awaits. Honor your body with gentle movement.',
    time: '6:00 AM',
    icon: Heart,
    priority: 'medium',
    isRead: true
  },
  {
    id: '5',
    type: 'quote',
    title: 'Daily Wisdom',
    message: '"When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need." - Ayurvedic Proverb',
    time: '8:00 AM',
    icon: Quote,
    priority: 'low',
    isRead: false
  }
];

const ayurvedicQuotes = [
  "The body benefits from movement, and the mind benefits from stillness.",
  "Perfect health is the perfect balance between Vata, Pitta, and Kapha.",
  "Food is medicine when chosen and prepared with awareness.",
  "Early to bed and early to rise makes a person healthy, wealthy, and wise.",
  "Happiness is the highest form of health in Ayurveda.",
  "Like increases like, opposites create balance.",
  "Prevention is better than cure - this is the essence of Ayurveda."
];

const NotificationsReminders = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>({
    meals: true,
    water: true,
    remedies: true,
    habits: true,
    quotes: true
  });
  const [currentQuote] = useState(
    ayurvedicQuotes[Math.floor(Math.random() * ayurvedicQuotes.length)]
  );

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive bg-destructive/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-muted bg-muted/5';
      default: return 'border-border bg-background';
    }
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications & Reminders
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Stay on track with your Ayurvedic wellness routine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-foreground-muted">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications at the moment</p>
              <p className="text-sm">You're all caught up with your wellness routine!</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const NotificationIcon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${
                    getPriorityColor(notification.priority)
                  } ${!notification.isRead ? 'shadow-soft' : 'opacity-70'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notification.priority === 'high' ? 'bg-destructive/20' :
                      notification.priority === 'medium' ? 'bg-warning/20' :
                      'bg-primary/20'
                    }`}>
                      <NotificationIcon className={`h-4 w-4 ${
                        notification.priority === 'high' ? 'text-destructive' :
                        notification.priority === 'medium' ? 'text-warning' :
                        'text-primary'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-foreground-muted'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-foreground-muted flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className={`text-sm leading-relaxed ${
                        !notification.isRead ? 'text-foreground' : 'text-foreground-muted'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissNotification(notification.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            Daily Ayurvedic Wisdom
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-primary/30 bg-primary/5">
            <Quote className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground italic">
              "{currentQuote}"
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Customize your reminder preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {key === 'meals' && <Utensils className="h-4 w-4 text-primary" />}
                    {key === 'water' && <Droplets className="h-4 w-4 text-primary" />}
                    {key === 'remedies' && <Heart className="h-4 w-4 text-primary" />}
                    {key === 'habits' && <Clock className="h-4 w-4 text-primary" />}
                    {key === 'quotes' && <Quote className="h-4 w-4 text-primary" />}
                  </div>
                  <div>
                    <Label htmlFor={key} className="capitalize font-medium">
                      {key} Reminders
                    </Label>
                    <p className="text-xs text-foreground-muted">
                      {key === 'meals' && 'Meal time notifications'}
                      {key === 'water' && 'Hydration reminders'}
                      {key === 'remedies' && 'Medicine & remedy alerts'}
                      {key === 'habits' && 'Lifestyle practice reminders'}
                      {key === 'quotes' && 'Daily wisdom and motivation'}
                    </p>
                  </div>
                </div>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => updateSetting(key as keyof NotificationSettings, checked)}
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-foreground-muted">
              💡 <strong>Tip:</strong> Consistent reminders help establish healthy Ayurvedic routines. 
              We recommend keeping all notifications enabled for the first month.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsReminders;