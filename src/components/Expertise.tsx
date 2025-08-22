import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Target } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const Expertise = () => {
  const stats = [
    {
      icon: Users,
      value: "300+",
      label: "Organisations clientes",
      description: "Automatisées par nos solutions IA"
    },
    {
      icon: Award,
      value: "15 ans",
      label: "D'expertise IA",
      description: "Dans l'automatisation organisationnelle"
    },
    {
      icon: Target,
      value: "95%",
      label: "Taux de succès",
      description: "Sur nos projets d'automatisation IA"
    },
    {
      icon: Star,
      value: "24/7",
      label: "Support IA",
      description: "Monitoring intelligent continu"
    }
  ];

  const testimonials = [
    {
      company: "BNP Paribas",
      sector: "Services Financiers",
      quote: "L'IA conversationnelle d'AutomaTech a transformé notre service client. 70% de réduction du temps de traitement des demandes.",
      author: "Claire Martin, DSI"
    },
    {
      company: "Orange Business",
      sector: "Télécommunications", 
      quote: "Leurs solutions d'automatisation des workflows nous ont permis d'optimiser nos opérations avec une efficacité remarquable.",
      author: "Thomas Dubois, Directeur Opérations"
    },
    {
      company: "Société Générale",
      sector: "Banking",
      quote: "L'IA décisionnelle a révolutionné notre processus d'analyse de risques. Des décisions plus rapides et plus précises.",
      author: "Sophie Chen, Risk Manager"
    }
  ];

  const certifications = [
    "ISO 27001", "SOC 2", "GDPR Compliant", "AI Ethics", "Cloud Security", "Enterprise AI"
  ];

  return (
    <section id="expertise" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Partenaire Stratégique Évident en Automatisation IA
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            <strong className="text-primary">Leader français</strong> de l'automatisation organisationnelle par IA. 
            Nous transformons vos contraintes en avantages concurrentiels avec des résultats mesurables et un ROI garanti.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <stat.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <AnimatedCounter 
                value={stat.value}
                className="text-3xl font-bold text-primary mb-2"
              />
              <div className="font-semibold text-heading mb-1 group-hover:text-primary transition-colors duration-300">{stat.label}</div>
              <div className="text-sm text-text-secondary group-hover:text-heading transition-colors duration-300">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Témoignages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-heading text-center mb-12">
            Ils Nous Font Confiance
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-primary group hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-200" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <blockquote className="text-text-secondary mb-4 italic group-hover:text-heading transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-heading group-hover:text-primary transition-colors duration-300">{testimonial.company}</div>
                    <div className="text-sm text-text-secondary mb-2">{testimonial.sector}</div>
                    <div className="text-sm text-text-secondary">{testimonial.author}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-heading mb-6">
            Certifications & Conformités
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;