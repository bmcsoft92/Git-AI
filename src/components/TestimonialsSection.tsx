import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Target, Shield } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const TestimonialsSection = () => {
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
      icon: Shield,
      value: "24/7",
      label: "Support IA",
      description: "Monitoring intelligent continu"
    }
  ];

  const testimonials = [
    {
      company: "BNP Paribas",
      sector: "Services Financiers",
      logo: "🏛️", // Placeholder - en production, utiliser une vraie image
      quote: "L'IA conversationnelle de Maia Elange a transformé notre service client. 70% de réduction du temps de traitement des demandes.",
      author: "Claire Martin",
      position: "DSI",
      results: "+70% efficacité"
    },
    {
      company: "Orange Business",
      sector: "Télécommunications",
      logo: "🟠", // Placeholder - en production, utiliser une vraie image
      quote: "Leurs solutions d'automatisation des workflows nous ont permis d'optimiser nos opérations avec une efficacité remarquable.",
      author: "Thomas Dubois",
      position: "Directeur Opérations",
      results: "+45% productivité"
    },
    {
      company: "Société Générale",
      sector: "Banking",
      logo: "🔴", // Placeholder - en production, utiliser une vraie image
      quote: "L'IA décisionnelle a révolutionné notre processus d'analyse de risques. Des décisions plus rapides et plus précises.",
      author: "Sophie Chen",
      position: "Risk Manager",
      results: "+60% rapidité"
    }
  ];

  const certifications = [
    { name: "ISO 27001", icon: Shield },
    { name: "SOC 2", icon: Shield },
    { name: "GDPR Compliant", icon: Shield },
    { name: "AI Ethics", icon: Award },
    { name: "Cloud Security", icon: Shield },
    { name: "Enterprise AI", icon: Target }
  ];

  return (
    <section id="expertise" className="py-20 bg-muted/30">
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

        {/* Statistiques animées */}
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
              <div className="font-semibold text-heading mb-1 group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </div>
              <div className="text-sm text-text-secondary group-hover:text-heading transition-colors duration-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Témoignages avec logos */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-heading text-center mb-12">
            Ils Nous Font Confiance
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-l-4 border-l-primary group hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Header avec logo et entreprise */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{testimonial.logo}</div>
                    <div>
                      <div className="font-bold text-heading group-hover:text-primary transition-colors duration-300">
                        {testimonial.company}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {testimonial.sector}
                      </div>
                    </div>
                  </div>

                  {/* Étoiles */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform duration-200" 
                        style={{ animationDelay: `${i * 100}ms` }} 
                      />
                    ))}
                  </div>

                  {/* Citation */}
                  <blockquote className="text-text-secondary mb-4 italic group-hover:text-heading transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Résultat */}
                  <div className="mb-4">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      {testimonial.results}
                    </Badge>
                  </div>

                  {/* Auteur */}
                  <div className="border-t pt-4">
                    <div className="text-sm">
                      <div className="font-semibold text-heading group-hover:text-primary transition-colors duration-300">
                        {testimonial.author}
                      </div>
                      <div className="text-text-secondary">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications & Conformités */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-heading mb-6">
            Certifications & Conformités
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-default"
              >
                <cert.icon className="h-4 w-4 mr-2 text-primary" />
                {cert.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;