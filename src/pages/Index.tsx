import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ROICalculator from "@/components/ROICalculator";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <ProcessSection />
        <TestimonialsSection />
        <ROICalculator />
        <FinalCTA />
      </main>
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-heading">Maia Elange</h3>
              <p className="text-text-secondary">Excellence en Automatisation IA • Design Premium</p>
            </div>
            <div className="text-sm text-text-secondary">
              © 2024 Maia Elange. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;