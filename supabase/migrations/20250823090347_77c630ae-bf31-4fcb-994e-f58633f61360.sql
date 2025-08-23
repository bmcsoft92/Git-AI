-- Create table for ROI calculations
CREATE TABLE public.roi_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  user_phone TEXT,
  
  -- ROI Calculator data
  hours_per_week NUMERIC NOT NULL,
  hourly_rate NUMERIC NOT NULL,
  employees INTEGER NOT NULL,
  investment NUMERIC NOT NULL,
  annual_savings NUMERIC NOT NULL,
  roi_percentage NUMERIC NOT NULL,
  
  -- Diagnostic form data
  team_size TEXT,
  business_type TEXT,
  main_activities TEXT[],
  repetitive_tasks TEXT[],
  current_tools TEXT[],
  pain_points TEXT[],
  automation_goals TEXT[],
  timeline TEXT,
  budget_range TEXT,
  technical_level TEXT,
  priority_processes TEXT[],
  success_metrics TEXT[],
  
  -- Recommendations (will be populated by AI analysis)
  priority_projects JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.roi_calculations ENABLE ROW LEVEL SECURITY;

-- Create policies (public access for this use case as it's a lead generation tool)
CREATE POLICY "Anyone can create ROI calculations" 
ON public.roi_calculations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view ROI calculations" 
ON public.roi_calculations 
FOR SELECT 
USING (true);

-- Create table for appointment bookings
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  roi_calculation_id UUID REFERENCES public.roi_calculations(id),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  appointment_type TEXT DEFAULT 'consultation',
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for appointments
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view appointments" 
ON public.appointments 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_roi_calculations_updated_at
  BEFORE UPDATE ON public.roi_calculations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();