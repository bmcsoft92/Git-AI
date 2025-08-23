import React from 'react';

const AIBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient de base élégant */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90"></div>
      
      {/* Effets de lueur lumineux et visibles */}
      <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-cta-primary/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-cta-primary/35 to-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-[350px] h-[350px] bg-gradient-to-t from-primary/25 to-cta-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 left-1/6 w-[300px] h-[300px] bg-gradient-to-br from-cta-primary/25 to-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Circuits lumineux stylisés */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lignes de circuit principales */}
        <path 
          d="M0 400 Q200 380 400 400 T800 400 Q1000 420 1200 400 T1600 400 Q1800 380 1920 400" 
          stroke="url(#circuitGlow)" 
          strokeWidth="3" 
          className="animate-pulse"
        />
        <path 
          d="M0 600 Q300 580 600 600 T1200 600 Q1500 620 1920 600" 
          stroke="url(#circuitGlow2)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path 
          d="M400 0 Q420 200 400 400 T400 800 Q380 1000 400 1080" 
          stroke="url(#circuitGlow)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <path 
          d="M1200 0 Q1180 300 1200 600 T1200 1080" 
          stroke="url(#circuitGlow2)" 
          strokeWidth="2" 
          className="animate-pulse" 
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Nœuds de connexion lumineux */}
        <circle cx="400" cy="400" r="10" fill="url(#nodeGlow)" className="animate-pulse" />
        <circle cx="800" cy="400" r="8" fill="url(#nodeGlow2)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="1200" cy="400" r="9" fill="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="600" cy="600" r="7" fill="url(#nodeGlow2)" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
        <circle cx="1200" cy="300" r="6" fill="url(#nodeGlow)" className="animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Définitions des gradients lumineux */}
        <defs>
          <linearGradient id="circuitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="circuitGlow2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.7" />
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
        </defs>
      </svg>
      
      {/* Particules flottantes visibles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 4 + 2;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.3) 70%, transparent 100%)'
                  : 'radial-gradient(circle, hsl(var(--cta-primary)) 0%, hsl(var(--cta-primary) / 0.3) 70%, transparent 100%)',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          );
        })}
      </div>
      
      {/* Rayons lumineux élégants */}
      <div className="absolute inset-0 opacity-50">
        <div 
          className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/70 to-transparent transform rotate-12 animate-pulse"
        ></div>
        <div 
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-cta-primary/60 to-transparent transform -rotate-12 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent transform rotate-6 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
      
      {/* Grille technique subtile mais visible */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* Éléments décoratifs tech visibles */}
      <div className="absolute top-1/4 left-1/8 opacity-40 animate-pulse">
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
      
      <div className="absolute bottom-1/3 right-1/8 opacity-35 animate-pulse" style={{ animationDelay: '1s' }}>
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
      
      {/* Overlay avec un léger gradient pour l'élégance */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20"></div>
    </div>
  );
};

export default AIBackground;