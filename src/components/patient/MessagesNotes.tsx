import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Send, 
  User, 
  Clock, 
  Heart,
  Stethoscope,
  PlusCircle,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'doctor' | 'patient';
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority?: 'high' | 'normal';
}

interface DailyLog {
  id: string;
  date: string;
  content: string;
  mood: number;
  energy: number;
  digestion: number;
  symptoms?: string[];
}

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'doctor',
    sender: 'Dr. Priya Sharma',
    content: 'Good morning! I reviewed your progress this week. Your diet compliance has improved significantly. Please continue with the morning digestive tea and let me know how you feel after meals.',
    timestamp: '2024-01-15 09:30 AM',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'patient',
    sender: 'You',
    content: 'Thank you doctor. The digestive tea is really helping. I feel less bloated after meals now. Should I continue with the same dosage?',
    timestamp: '2024-01-15 02:15 PM',
    isRead: true
  },
  {
    id: '3',
    type: 'doctor',
    sender: 'Dr. Priya Sharma',
    content: 'Excellent progress! Yes, continue with the same dosage for another week. I\'ve also added a new cooling remedy for the evening to help with your Pitta balance. Check your remedies section.',
    timestamp: '2024-01-15 04:30 PM',
    isRead: false
  },
  {
    id: '4',
    type: 'doctor',
    sender: 'Dr. Priya Sharma',
    content: 'I noticed you missed your evening meditation yesterday. Remember, consistency in lifestyle practices is key to balancing your doshas. Try setting a gentle reminder.',
    timestamp: '2024-01-14 08:00 AM',
    isRead: true
  }
];

const mockDailyLogs: DailyLog[] = [
  {
    id: '1',
    date: '2024-01-15',
    content: 'Felt much better today. The morning tea helped with digestion. Had good energy throughout the day. Slight headache in the evening, possibly due to screen time.',
    mood: 8,
    energy: 8,
    digestion: 9,
    symptoms: ['Mild headache', 'Eye strain']
  },
  {
    id: '2',
    date: '2024-01-14',
    content: 'Started the day well but felt tired after lunch. Might have eaten too much. Evening meditation was very relaxing.',
    mood: 7,
    energy: 6,
    digestion: 6,
    symptoms: ['Post-meal fatigue']
  },
  {
    id: '3',
    date: '2024-01-13',
    content: 'Great day overall! The new oil massage routine is working well for my joints. Feeling more flexible.',
    mood: 9,
    energy: 8,
    digestion: 8,
    symptoms: []
  }
];

const MessagesNotes = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [dailyLogs, setDailyLogs] = useState(mockDailyLogs);
  const [newMessage, setNewMessage] = useState('');
  const [newLogContent, setNewLogContent] = useState('');
  const [currentMood, setCurrentMood] = useState(7);
  const [currentEnergy, setCurrentEnergy] = useState(7);
  const [currentDigestion, setCurrentDigestion] = useState(7);

  const unreadMessages = messages.filter(m => m.type === 'doctor' && !m.isRead).length;

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'patient',
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      isRead: true
    };

    setMessages(prev => [message, ...prev]);
    setNewMessage('');
  };

  const saveDailyLog = () => {
    if (!newLogContent.trim()) return;

    const log: DailyLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      content: newLogContent,
      mood: currentMood,
      energy: currentEnergy,
      digestion: currentDigestion,
      symptoms: []
    };

    setDailyLogs(prev => [log, ...prev]);
    setNewLogContent('');
  };

  const markAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Doctor Messages
              {unreadMessages > 0 && (
                <Badge variant="destructive">{unreadMessages} new</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Communication with your Ayurvedic practitioner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* New Message Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Ask your doctor a question or share an update..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>

            {/* Messages List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg border ${
                    message.type === 'doctor' 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-secondary/5 border-secondary/20'
                  } ${!message.isRead && message.type === 'doctor' ? 'shadow-soft' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.type === 'doctor' ? (
                          <Stethoscope className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <div className="flex items-center gap-2">
                          {message.priority === 'high' && (
                            <AlertCircle className="h-3 w-3 text-destructive" />
                          )}
                          <span className="text-xs text-foreground-muted flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {!message.isRead && message.type === 'doctor' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(message.id)}
                          className="mt-2"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Log Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Daily Health Log
            </CardTitle>
            <CardDescription>
              Track your daily health observations and symptoms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* New Log Input */}
            <div className="space-y-4">
              <Textarea
                placeholder="How are you feeling today? Note any changes in energy, digestion, mood, or symptoms..."
                value={newLogContent}
                onChange={(e) => setNewLogContent(e.target.value)}
                rows={3}
              />
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-foreground-muted">Mood (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentMood}
                    onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-medium">{currentMood}</div>
                </div>
                
                <div>
                  <label className="text-xs text-foreground-muted">Energy (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentEnergy}
                    onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-medium">{currentEnergy}</div>
                </div>
                
                <div>
                  <label className="text-xs text-foreground-muted">Digestion (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentDigestion}
                    onChange={(e) => setCurrentDigestion(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm font-medium">{currentDigestion}</div>
                </div>
              </div>
              
              <Button onClick={saveDailyLog} disabled={!newLogContent.trim()}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Save Today's Log
              </Button>
            </div>

            {/* Previous Logs */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {dailyLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg border bg-background-soft">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        😊 {log.mood}/10
                      </span>
                      <span className="flex items-center gap-1">
                        ⚡ {log.energy}/10
                      </span>
                      <span className="flex items-center gap-1">
                        🍽️ {log.digestion}/10
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {log.content}
                  </p>
                  
                  {log.symptoms && log.symptoms.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {log.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Health Patterns & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertDescription>
                <strong>Weekly Average:</strong> Your mood has improved by 15% this week. 
                The consistent morning routine and digestive tea seem to be having a positive effect.
              </AlertDescription>
            </Alert>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Pattern Noticed:</strong> Energy levels tend to drop after lunch. 
                Consider a lighter midday meal or a short walk post-meal.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesNotes;