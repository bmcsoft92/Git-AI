import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Euro, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "FAQ – Vos questions sur l'automatisation et l'IA | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Toutes vos questions sur l\'automatisation IA : RGPD, sécurité, coût, ROI. Réponses d\'experts pour vous aider à prendre les bonnes décisions.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Toutes vos questions sur l\'automatisation IA : RGPD, sécurité, coût, ROI. Réponses d\'experts pour vous aider à prendre les bonnes décisions.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const faqData = [
    {
      icon: Shield,
      question: "Nos données sont-elles en sécurité avec vos solutions d'automatisation ?",
      answer: "Absolument. Toutes nos solutions respectent le RGPD et les standards européens de sécurité. Nous utilisons des hébergeurs certifiés ISO 27001, chiffrement des données en transit et au repos, et mise en place de politiques d'accès strictes. Vos données restent sous votre contrôle total."
    },
    {
      icon: Euro,
      question: "Quel est le coût d'une solution d'automatisation sur-mesure ?",
      answer: "Le coût varie selon la complexité de vos processus et le périmètre d'automatisation. Pour une PME, comptez entre 5 000€ et 25 000€. Pour une ETI, entre 15 000€ et 75 000€. Nous proposons systématiquement un diagnostic gratuit avec estimation budgétaire précise avant tout engagement."
    },
    {
      icon: TrendingUp,
      question: "Quel ROI puis-je attendre de l'automatisation ?",
      answer: "Nos clients observent généralement un ROI positif en 3 à 6 mois. Les gains moyens : +30% d'efficacité opérationnelle, -50% de temps sur les tâches répétitives, +20% de satisfaction client. Notre simulateur ROI vous donne une estimation personnalisée en quelques minutes."
    },
    {
      icon: Clock,
      question: "Combien de temps faut-il pour déployer une solution ?",
      answer: "Le délai dépend de la complexité : 2-4 semaines pour des automatisations simples, 6-12 semaines pour des projets complexes multi-systèmes. Nous privilégions une approche progressive avec des gains rapides dès les premières semaines, puis optimisation continue."
    },
    {
      icon: Shield,
      question: "Comment garantissez-vous la conformité RGPD de vos solutions ?",
      answer: "Nous intégrons le RGPD dès la conception : privacy by design, minimisation des données, pseudonymisation automatique, gestion des consentements, et documentation complète des traitements. Audit de conformité inclus dans chaque projet avec certification à la clé."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary">
                FAQ
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                FAQ – Vos questions sur{" "}
                <span className="text-primary">l'automatisation et l'IA</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Nous répondons aux questions les plus fréquentes sur l'automatisation, 
                la sécurité, les coûts et le retour sur investissement.
              </p>
            </div>

            {/* Accordion FAQ */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-card/80 backdrop-blur-sm border border-primary/20 p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => {
                    const Icon = faq.icon;
                    return (
                      <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                        <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-semibold text-heading text-left">
                              {faq.question}
                            </h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                          <p className="text-text-secondary leading-relaxed pl-12">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>
            </div>

            {/* Section CTA */}
            <div className="text-center">
              <Card className="bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30 p-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-heading mb-4">
                    Vous avez d'autres questions ?
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    Notre équipe d'experts est là pour répondre à toutes vos questions 
                    et vous accompagner dans votre projet d'automatisation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate("/calculateur-roi")}
                      variant="cta"
                      size="lg"
                      className="px-8 py-4 text-lg group/cta"
                    >
                      Calculer mon ROI
                      <TrendingUp className="ml-3 h-5 w-5 transition-transform group-hover/cta:scale-110" />
                    </Button>
                    <Button 
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg border-primary/30"
                    >
                      Poser une question
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="relative bg-gradient-to-br from-card to-card/80 border-t border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">
              Besoin d'informations supplémentaires ?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Contactez-nous directement pour obtenir des réponses personnalisées 
              à vos questions spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-text-secondary">
                <span className="font-semibold text-primary">📧</span>
                <a href="mailto:contact@maiaelange.fr" className="hover:text-primary transition-colors">
                  contact@maiaelange.fr
                </a>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-text-secondary/50 rounded-full"></div>
              <div className="text-sm text-text-secondary">
                Réponse sous 24h • Consultation gratuite
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;