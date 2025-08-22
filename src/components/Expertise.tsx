import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award, Target } from "lucide-react";

const Expertise = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Clients industriels",
      description: "Font confiance à nos solutions"
    },
    {
      icon: Award,
      value: "25 ans",
      label: "D'expertise",
      description: "Dans l'automatisation industrielle"
    },
    {
      icon: Target,
      value: "99.9%",
      label: "De fiabilité",
      description: "Sur nos systèmes déployés"
    },
    {
      icon: Star,
      value: "24/7",
      label: "Support technique",
      description: "Assistance continue garantie"
    }
  ];

  const testimonials = [
    {
      company: "Renault Group",
      sector: "Automobile",
      quote: "AutomaTech a révolutionné notre chaîne de production. 40% d'augmentation de productivité en 6 mois.",
      author: "Marie Dubois, Directrice Production"
    },
    {
      company: "Airbus",
      sector: "Aérospatiale", 
      quote: "Leur expertise en robotisation nous a permis d'atteindre une précision jamais vue auparavant.",
      author: "Jean Martin, Ingénieur en Chef"
    },
    {
      company: "Danone",
      sector: "Agroalimentaire",
      quote: "Solutions d'automatisation parfaitement adaptées aux contraintes sanitaires de notre secteur.",
      author: "Sophie Laurent, Responsable Qualité"
    }
  ];

  const certifications = [
    "ISO 27001", "IEC 61508", "ATEX", "CE Marking", "UL Listed", "Industry 4.0"
  ];

  return (
    <section id="expertise" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4">
            Une Expertise Reconnue
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Leader français de l'automatisation industrielle, nous accompagnons les 
            plus grandes entreprises dans leur transformation technologique.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-semibold text-heading mb-1">{stat.label}</div>
              <div className="text-sm text-text-secondary">{stat.description}</div>
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
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-text-secondary mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-heading">{testimonial.company}</div>
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