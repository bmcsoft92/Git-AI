import React from 'react';
import heroAiBg from "@/assets/hero-ai-brain-bg.jpg";

const AIBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Image de l'humain connecté avec effet lumineux */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroAiBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.8) contrast(1.2)'
          }}
        />
        {/* Overlay lumineux sur l'humain */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cta-primary/20 animate-pulse"></div>
      </div>
      
      {/* Gradient de base élégant */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      
      {/* Effets de lueur lumineux autour de l'humain */}
      <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-gradient-to-r from-primary/40 to-cta-primary/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-cta-primary/45 to-primary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-[350px] h-[350px] bg-gradient-to-t from-primary/35 to-cta-primary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 left-1/6 w-[300px] h-[300px] bg-gradient-to-br from-cta-primary/35 to-primary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Circuits lumineux connectés au cerveau */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lignes de circuit connectées au cerveau humain */}
        <path 
          d="M960 300 Q800 320 600 350 Q400 380 200 400 Q100 420 0 440" 
          stroke="url(#brainCircuit)" 
          strokeWidth="3" 
          className="animate-pulse"
        />
        <path 
          d="M960 300 Q1120 320 1320 350 Q1520 380 1720 400 Q1820 420 1920 440" 
          stroke="url(#brainCircuit2)" 
          strokeWidth="3" 
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path 
          d="M960 300 Q940 500 920 700 Q900 900 880 1080" 
          stroke="url(#brainCircuit)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <path 
          d="M960 300 Q980 500 1000 700 Q1020 900 1040 1080" 
          stroke="url(#brainCircuit2)" 
          strokeWidth="2" 
          className="animate-pulse" 
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Nœuds de connexion cerveau-IA */}
        <circle cx="960" cy="300" r="15" fill="url(#brainCore)" className="animate-pulse" />
        <circle cx="600" cy="350" r="10" fill="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="1320" cy="350" r="10" fill="url(#nodeGlow2)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="920" cy="700" r="8" fill="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
        <circle cx="1000" cy="700" r="8" fill="url(#nodeGlow2)" className="animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Synapses et connexions neurales */}
        <circle cx="800" cy="250" r="4" fill="url(#synapseGlow)" className="animate-pulse" />
        <circle cx="1120" cy="250" r="4" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="900" cy="200" r="3" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
        <circle cx="1020" cy="200" r="3" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
        
        {/* Définitions des gradients pour cerveau-IA */}
        <defs>
          <radialGradient id="brainCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </radialGradient>
          <linearGradient id="brainCircuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="brainCircuit2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="nodeGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="synapseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Particules de connexion cerveau-IA */}
      <div className="absolute inset-0">
        {[...Array(35)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          const isNearBrain = i < 15;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: isNearBrain ? `${45 + Math.random() * 30}%` : `${Math.random() * 100}%`,
                top: isNearBrain ? `${20 + Math.random() * 40}%` : `${Math.random() * 100}%`,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.4) 70%, transparent 100%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, hsl(var(--cta-primary)) 0%, hsl(var(--cta-primary) / 0.4) 70%, transparent 100%)'
                  : 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--cta-primary) / 0.3) 70%, transparent 100%)',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Rayons énergétiques émanant du cerveau */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute top-1/4 left-1/2 w-1 h-full bg-gradient-to-b from-primary/80 via-cta-primary/60 to-transparent transform -translate-x-1/2 rotate-15 animate-pulse"
        ></div>
        <div 
          className="absolute top-1/4 left-1/2 w-1 h-full bg-gradient-to-b from-cta-primary/70 via-primary/50 to-transparent transform -translate-x-1/2 -rotate-15 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-1/4 left-1/2 w-0.5 h-full bg-gradient-to-b from-primary/60 via-cta-primary/40 to-transparent transform -translate-x-1/2 rotate-30 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div 
          className="absolute top-1/4 left-1/2 w-0.5 h-full bg-gradient-to-b from-cta-primary/50 via-primary/30 to-transparent transform -translate-x-1/2 -rotate-30 animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>
      
      {/* Grille technique de l'IA */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Éléments tech autour du cerveau */}
      <div className="absolute top-1/6 left-1/3 opacity-50 animate-pulse">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <polygon 
            points="40,10 60,25 60,55 40,70 20,55 20,25" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="2"
          />
          <circle cx="40" cy="40" r="12" fill="none" stroke="hsl(var(--cta-primary))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute top-1/6 right-1/3 opacity-45 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon 
            points="30,7.5 45,18.75 45,41.25 30,52.5 15,41.25 15,18.75" 
            fill="none" 
            stroke="hsl(var(--cta-primary))" 
            strokeWidth="2"
          />
          <rect x="22" y="22" width="16" height="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Aura lumineuse autour du cerveau */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[600px] h-[400px] bg-gradient-radial from-primary/25 via-cta-primary/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
      
      {/* Overlay final pour équilibrer */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/30"></div>
    </div>
  );
};

export default AIBackground;