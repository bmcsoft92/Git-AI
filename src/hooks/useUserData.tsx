import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  lastROICalculation?: {
    id: string;
    team_size: string;
    business_type: string;
    created_at: string;
  };
}

export const useUserData = (email?: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async (userEmail: string) => {
    setIsLoading(true);
    try {
      console.log("🔍 Searching for user data with email:", userEmail);

      // Récupérer les données depuis roi_calculations (plus récent)
      const { data: roiData, error: roiError } = await supabase
        .from('roi_calculations')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false })
        .limit(1);

      if (roiError) {
        console.error("Error fetching ROI data:", roiError);
        return;
      }

      console.log("📊 ROI calculations found:", roiData);

      // Récupérer les données depuis leads si disponible
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false })
        .limit(1);

      if (leadError) {
        console.error("Error fetching lead data:", leadError);
      }

      console.log("👤 Lead data found:", leadData);

      // Combiner les données en priorisant roi_calculations puis leads
      if (roiData && roiData.length > 0) {
        const roi = roiData[0];
        const lead = leadData && leadData.length > 0 ? leadData[0] : null;

        setUserData({
          name: roi.user_name || lead?.name || '',
          email: roi.user_email || lead?.email || userEmail,
          phone: roi.user_phone || lead?.phone || '',
          company: lead?.company || '', // Les leads ont plus souvent le nom d'entreprise
          lastROICalculation: {
            id: roi.id,
            team_size: roi.team_size || '',
            business_type: roi.business_type || '',
            created_at: roi.created_at
          }
        });

        console.log("✅ User data compiled successfully");
      } else if (leadData && leadData.length > 0) {
        const lead = leadData[0];
        setUserData({
          name: lead.name || '',
          email: lead.email || userEmail,
          phone: lead.phone || '',
          company: lead.company || '',
          lastROICalculation: undefined
        });

        console.log("✅ User data from leads only");
      } else {
        console.log("❌ No user data found");
        setUserData(null);
      }

    } catch (error) {
      console.error("Error in fetchUserData:", error);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch when email is provided
  useEffect(() => {
    if (email && email.includes('@')) {
      fetchUserData(email);
    }
  }, [email]);

  return {
    userData,
    isLoading,
    fetchUserData,
    setUserData
  };
};