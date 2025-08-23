import React from 'react';

const AIBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient de base sophistiqué */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"></div>
      
      {/* Circuits et lignes connectées animées */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lignes de circuit principales avec animation */}
        <path 
          d="M0 400 Q200 380 400 400 T800 400 Q1000 420 1200 400 T1600 400 Q1800 380 1920 400" 
          stroke="url(#circuitGradient)" 
          strokeWidth="2" 
          strokeDasharray="10 5"
          className="animate-pulse"
          style={{ animation: 'aiCircuit 4s ease-in-out infinite' }}
        />
        <path 
          d="M0 600 Q300 580 600 600 T1200 600 Q1500 620 1920 600" 
          stroke="url(#circuitGradient)" 
          strokeWidth="1.5" 
          strokeDasharray="8 4"
          style={{ animation: 'aiCircuit 6s ease-in-out infinite 1s' }}
        />
        <path 
          d="M400 0 Q420 200 400 400 T400 800 Q380 1000 400 1080" 
          stroke="url(#circuitGradient)" 
          strokeWidth="1" 
          strokeDasharray="6 3"
          style={{ animation: 'aiCircuit 5s ease-in-out infinite 2s' }}
        />
        <path 
          d="M1200 0 Q1180 300 1200 600 T1200 1080" 
          stroke="url(#circuitGradient2)" 
          strokeWidth="1.5" 
          strokeDasharray="12 6"
          style={{ animation: 'aiCircuit 7s ease-in-out infinite 0.5s' }}
        />
        
        {/* Nœuds de connexion avec effets de glow */}
        <circle cx="400" cy="400" r="8" fill="url(#nodeGradient)" className="opacity-80" style={{ animation: 'aiPulseGlow 3s ease-in-out infinite' }} />
        <circle cx="800" cy="400" r="6" fill="url(#nodeGradient)" className="opacity-70" style={{ animation: 'aiPulseGlow 4s ease-in-out infinite 0.5s' }} />
        <circle cx="1200" cy="400" r="7" fill="url(#nodeGradient2)" className="opacity-75" style={{ animation: 'aiPulseGlow 3.5s ease-in-out infinite 1.5s' }} />
        <circle cx="600" cy="600" r="5" fill="url(#nodeGradient)" className="opacity-60" style={{ animation: 'aiPulseGlow 5s ease-in-out infinite 2.5s' }} />
        <circle cx="1200" cy="300" r="4" fill="url(#nodeGradient2)" className="opacity-65" style={{ animation: 'aiPulseGlow 4.5s ease-in-out infinite 1s' }} />
        
        {/* Hexagones connectés pour un look tech */}
        <polygon 
          points="300,200 320,190 340,200 340,220 320,230 300,220" 
          fill="none" 
          stroke="url(#circuitGradient)" 
          strokeWidth="1"
          className="opacity-50"
          style={{ animation: 'aiFloat 6s ease-in-out infinite' }}
        />
        <polygon 
          points="1400,500 1425,490 1450,500 1450,525 1425,535 1400,525" 
          fill="none" 
          stroke="url(#circuitGradient2)" 
          strokeWidth="1"
          className="opacity-40"
          style={{ animation: 'aiFloat 8s ease-in-out infinite 2s' }}
        />
        
        {/* Définitions des gradients sophistiqués */}
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="circuitGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.5" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.9" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="nodeGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="70%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.2" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Particules flottantes intelligentes */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/60 to-cta-primary/40"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `aiFloat ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Effets de lueur sophistiqués et lumineux */}
      <div className="absolute top-1/6 left-1/5 w-[400px] h-[400px] bg-primary/15 rounded-full blur-3xl" style={{ animation: 'aiGlow 8s ease-in-out infinite' }}></div>
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cta-primary/20 rounded-full blur-3xl" style={{ animation: 'aiGlow 6s ease-in-out infinite 2s' }}></div>
      <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-primary/12 rounded-full blur-3xl" style={{ animation: 'aiGlow 10s ease-in-out infinite 4s' }}></div>
      <div className="absolute top-2/3 left-1/6 w-[250px] h-[250px] bg-cta-primary/18 rounded-full blur-2xl" style={{ animation: 'aiGlow 7s ease-in-out infinite 1s' }}></div>
      
      {/* Rayons lumineux élégants */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/60 to-transparent transform rotate-12"
          style={{ animation: 'fadeInUp 2s ease-out infinite alternate' }}
        ></div>
        <div 
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cta-primary/50 to-transparent transform -rotate-12"
          style={{ animation: 'fadeInUp 3s ease-out infinite alternate 1s' }}
        ></div>
        <div 
          className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent transform rotate-6"
          style={{ animation: 'fadeInUp 2.5s ease-out infinite alternate 0.5s' }}
        ></div>
      </div>
      
      {/* Grille technique sophistiquée */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Éléments décoratifs tech avancés */}
      <div className="absolute top-1/4 left-1/8 opacity-25">
        <svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: 'aiFloat 10s ease-in-out infinite' }}>
          <polygon 
            points="30,8 45,18.75 45,41.25 30,52 15,41.25 15,18.75" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1.5"
          />
          <circle cx="30" cy="30" r="8" fill="none" stroke="hsl(var(--cta-primary))" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/3 right-1/8 opacity-20">
        <svg width="45" height="45" viewBox="0 0 45 45" style={{ animation: 'aiFloat 12s ease-in-out infinite 3s' }}>
          <polygon 
            points="22.5,5.625 33.75,14.0625 33.75,30.9375 22.5,39.375 11.25,30.9375 11.25,14.0625" 
            fill="none" 
            stroke="hsl(var(--cta-primary))" 
            strokeWidth="1.5"
          />
          <rect x="18" y="18" width="9" height="9" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Overlay de finition pour l'élégance */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>
    </div>
  );
};

export default AIBackground;