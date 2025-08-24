import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirection automatique vers la page contact
    navigate("/contact", { replace: true });
  }, [navigate]);

  return null;
};

export default Appointment;