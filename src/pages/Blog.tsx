import { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, TrendingUp, Target, BookOpen, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Blog = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Blog et Guides IA | Ressources Automatisation | Maia Elange";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez nos guides pratiques sur l\'automatisation IA : calcul de ROI, meilleures pratiques, cas d\'usage concrets. Ressources pour optimiser vos processus.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', 'Découvrez nos guides pratiques sur l\'automatisation IA : calcul de ROI, meilleures pratiques, cas d\'usage concrets. Ressources pour optimiser vos processus.');
      document.head.appendChild(metaDescription);
    }
  }, []);

  const articles = [
    {
      id: 1,
      title: "Comment calculer son ROI avec l'automatisation ?",
      excerpt: "Guide complet pour évaluer le retour sur investissement de vos projets d'automatisation. Méthodes, outils et exemples concrets.",
      author: "Équipe Maia Elange",
      date: "15 Janvier 2025",
      readTime: "8 min",
      category: "ROI & Finance",
      featured: true
    },
    {
      id: 2,
      title: "10 processus à automatiser en priorité dans votre PME",
      excerpt: "Découvrez les processus qui génèrent le plus de gains rapides : facturation, suivi client, gestion des stocks...",
      author: "Équipe Maia Elange",
      date: "10 Janvier 2025",
      readTime: "6 min",
      category: "Guides Pratiques",
      featured: false
    },
    {
      id: 3,
      title: "RGPD et automatisation : ce qu'il faut savoir",
      excerpt: "Guide complet pour automatiser vos processus tout en respectant la réglementation européenne sur les données personnelles.",
      author: "Équipe Maia Elange",
      date: "5 Janvier 2025",
      readTime: "12 min",
      category: "Conformité",
      featured: false
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
                BLOG & GUIDES
              </Badge>
            </div>

            {/* Titre principal H1 */}
            <div className="text-center mb-16">
              <h1 className="text-3xl lg:text-5xl font-bold text-heading mb-6">
                Blog et Guides{" "}
                <span className="text-primary">IA</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                Ressources pratiques, guides détaillés et conseils d'experts pour réussir 
                vos projets d'automatisation et maximiser votre ROI.
              </p>
            </div>

            {/* Article Featured */}
            {articles.filter(article => article.featured).map(article => (
              <Card key={article.id} className="mb-12 bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      Article vedette
                    </Badge>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-heading mb-4 hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-text-secondary mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {article.readTime} de lecture
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate("/calculateur-roi")}
                    variant="cta"
                    size="lg"
                    className="group/cta"
                  >
                    Lire l'article complet
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover/cta:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Grille des autres articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {articles.filter(article => !article.featured).map(article => (
                <Card key={article.id} className="bg-card/80 backdrop-blur-sm border border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-heading mb-3 group-hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </CardTitle>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => navigate("/calculateur-roi")}
                      variant="outline" 
                      className="w-full group/btn border-primary/30 hover:bg-primary/10"
                    >
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Section CTA */}
            <div className="text-center">
              <Card className="bg-gradient-to-br from-cta-primary/10 to-primary/10 backdrop-blur-sm border border-primary/30 p-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold text-heading mb-4">
                    Prêt à passer à l'action ?
                  </h2>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    Vous avez lu nos guides, maintenant calculez concrètement le ROI 
                    de votre projet d'automatisation ou contactez nos experts.
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
                      onClick={() => navigate('/contact')}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg border-primary/30"
                    >
                      Obtenir un plan d'action personnalisé
                      <Target className="ml-3 h-5 w-5" />
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

export default Blog;