-- Create profiles table for patient information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  age INTEGER,
  height_cm INTEGER,
  weight_kg INTEGER,
  allergies TEXT[],
  medical_conditions TEXT[],
  food_preferences TEXT[],
  dominant_dosha TEXT CHECK (dominant_dosha IN ('vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'tridoshic')),
  dosha_scores JSONB, -- Store vata, pitta, kapha scores
  questionnaire_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Create diet_entries table for daily meals
CREATE TABLE public.diet_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name TEXT NOT NULL,
  calories INTEGER,
  properties JSONB, -- hot/cold, digestibility, etc.
  rasa TEXT[], -- taste categories
  doctor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create remedies table for prescribed remedies
CREATE TABLE public.remedies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  condition TEXT,
  ingredients TEXT[],
  instructions TEXT NOT NULL,
  timing TEXT,
  duration TEXT,
  completed_today BOOLEAN DEFAULT FALSE,
  last_completed DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lifestyle_habits table
CREATE TABLE public.lifestyle_habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_name TEXT NOT NULL,
  category TEXT,
  completed_today BOOLEAN DEFAULT FALSE,
  streak_count INTEGER DEFAULT 0,
  last_completed DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_logs table for patient feedback
CREATE TABLE public.daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg DECIMAL(5,2),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
  digestion_rating INTEGER CHECK (digestion_rating BETWEEN 1 AND 10),
  mood_rating INTEGER CHECK (mood_rating BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, date)
);

-- Create doctor_messages table
CREATE TABLE public.doctor_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.remedies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lifestyle_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for diet_entries
CREATE POLICY "Users can view their own diet entries" ON public.diet_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diet entries" ON public.diet_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for remedies
CREATE POLICY "Users can view their own remedies" ON public.remedies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own remedies" ON public.remedies
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for lifestyle_habits
CREATE POLICY "Users can view their own habits" ON public.lifestyle_habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits" ON public.lifestyle_habits
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for daily_logs
CREATE POLICY "Users can view their own logs" ON public.daily_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs" ON public.daily_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own logs" ON public.daily_logs
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for doctor_messages
CREATE POLICY "Patients can view their messages" ON public.doctor_messages
  FOR SELECT USING (auth.uid() = patient_id);

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();