import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Euro, TrendingUp, Clock, ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const FAQ = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "FAQ Automatisation IA | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Toutes les réponses claires sur l\'automatisation IA : sécurité, coûts, délais, outils compatibles, support après déploiement.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Toutes les réponses claires sur l\'automatisation IA : sécurité, coûts, délais, outils compatibles, support après déploiement.');
      document.head.appendChild(metaDescription);
    }

    // Add JSON-LD structured data for FAQ
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "C'est quoi une agence d'IA & d'automatisation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Une agence d'IA & d'automatisation conçoit et déploie des systèmes qui permettent de réduire les tâches répétitives, d'améliorer la productivité et d'optimiser la croissance des organisations."
          }
        },
        {
          "@type": "Question",
          "name": "Qu'est-ce que l'automatisation IA exactement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Il s'agit de l'utilisation d'outils et d'intelligence artificielle pour automatiser des processus métiers comme la gestion des emails, la facturation, le CRM ou encore le suivi des projets."
          }
        },
        {
          "@type": "Question",
          "name": "Devons-nous changer d'outils ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pas nécessairement. Nous nous adaptons aux outils existants (ex: CRM, ERP, messageries) et connectons vos systèmes pour maximiser leur efficacité sans rupture opérationnelle."
          }
        },
        {
          "@type": "Question",
          "name": "Combien de temps pour une première mise en production ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un premier système peut être mis en place en 2 à 4 semaines selon la complexité du projet."
          }
        },
        {
          "@type": "Question",
          "name": "Et la sécurité/RGPD ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toutes nos solutions sont alignées avec les standards européens en matière de protection des données (RGPD) et intègrent des bonnes pratiques de sécurité."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est l'impact pour les équipes ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L'automatisation réduit les tâches répétitives, libère du temps pour des missions à forte valeur ajoutée et améliore le confort de travail."
          }
        },
        {
          "@type": "Question",
          "name": "Combien ça coûte ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le coût dépend de la complexité et du périmètre du projet. Nous proposons toujours un plan d'action personnalisé avec une estimation claire du ROI."
          }
        },
        {
          "@type": "Question",
          "name": "Support après le déploiement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, un support est prévu après la mise en place. Ensuite, le client peut choisir de nous confier de nouvelles automatisations selon ses besoins."
          }
        }
      ]
    });
    document.head.appendChild(script);
  }, []);

  const faqData = [
    {
      icon: Shield,
      question: "C'est quoi une agence d'IA & d'automatisation ?",
      answer: "Une agence comme Maia Elange accompagne les organisations (PME, ETI, grandes structures, associations) dans l'identification et la mise en place d'automatisations concrètes. L'objectif est simple : réduire les tâches répétitives, améliorer la productivité et libérer du temps pour des missions à forte valeur ajoutée."
    },
    {
      icon: TrendingUp,
      question: "Qu'est-ce que l'automatisation IA exactement ?",
      answer: "C'est l'utilisation combinée de logiciels et d'intelligence artificielle pour exécuter automatiquement des tâches répétitives (emails, suivi clients, reporting, etc.). L'IA ne remplace pas l'humain : elle agit comme un assistant intelligent qui accélère vos processus."
    },
    {
      icon: Euro,
      question: "Devons-nous changer d'outils ?",
      answer: "Pas nécessairement. Nous privilégions toujours l'intégration à vos outils existants (CRM, ERP, logiciels métiers…). Nous connectons vos systèmes actuels grâce à des solutions comme Make, Zapier ou n8n. Si un changement d'outil est conseillé, nous vous accompagnons dans la décision."
    },
    {
      icon: Clock,
      question: "Combien de temps pour une première mise en production ?",
      answer: "En moyenne, entre 2 et 6 semaines selon la complexité. Un premier prototype peut être opérationnel très rapidement (souvent sous 15 jours) pour vous permettre de mesurer l'impact sans attendre."
    },
    {
      icon: Shield,
      question: "Et la sécurité / RGPD ?",
      answer: "Tous nos déploiements respectent les standards européens (RGPD). Nous privilégions des solutions sécurisées et conformes, hébergées dans l'UE lorsque c'est possible. La confidentialité de vos données reste une priorité."
    },
    {
      icon: TrendingUp,
      question: "Quel est l'impact pour les équipes ?",
      answer: "L'automatisation ne remplace pas vos collaborateurs : elle les soulage des tâches chronophages. Cela améliore leur efficacité, réduit le stress et libère du temps pour des activités stratégiques. Nous incluons toujours vos équipes dans la phase de conception et de formation."
    },
    {
      icon: Euro,
      question: "Combien ça coûte ?",
      answer: "Le coût dépend du périmètre du projet. Nous travaillons avec un modèle flexible : diagnostic et prototype accessible, puis extension progressive selon vos besoins et budget. Cela permet d'obtenir rapidement des résultats mesurables sans investissement lourd initial."
    },
    {
      icon: TrendingUp,
      question: "Comment mesurez-vous le succès ?",
      answer: "Nous définissons avec vous des indicateurs clairs (ex. temps gagné, coût réduit, taux de conversion augmenté). Chaque projet inclut un tableau de bord pour suivre le ROI et les gains obtenus."
    },
    {
      icon: Shield,
      question: "Y a-t-il un support après le déploiement ?",
      answer: "Oui, nous proposons un suivi post-projet pour sécuriser la mise en place et ajuster si nécessaire. Ensuite, vous choisissez : soit garder l'autonomie complète, soit nous solliciter ponctuellement pour de nouvelles optimisations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Home className="h-4 w-4" />
                Accueil
              </Button>
            </div>

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
                      Tester mon ROI
                      <TrendingUp className="ml-3 h-5 w-5 transition-transform group-hover/cta:scale-110" />
                    </Button>
                    <Button
                      onClick={() => navigate('/contact')}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg border-primary/30"
                    >
                      Obtenir un plan d'action personnalisé
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;