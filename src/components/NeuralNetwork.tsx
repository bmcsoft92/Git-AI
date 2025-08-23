import React from 'react';

const NeuralNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Réseau de neurones autour de la tête */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connexions neuronales principales autour de la zone cerveau */}
        {/* Connexions horizontales */}
        <path 
          d="M700 250 Q850 240 1000 250 Q1150 260 1300 250" 
          stroke="url(#neuralGradient)" 
          strokeWidth="1.5" 
          className="animate-pulse"
          strokeDasharray="5 3"
        />
        <path 
          d="M650 300 Q800 290 950 300 Q1100 310 1250 300" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="1" 
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
          strokeDasharray="4 2"
        />
        <path 
          d="M750 350 Q900 340 1050 350 Q1200 360 1350 350" 
          stroke="url(#neuralGradient)" 
          strokeWidth="1.2" 
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
          strokeDasharray="3 2"
        />
        
        {/* Connexions verticales et diagonales */}
        <path 
          d="M800 200 Q820 300 840 400 Q860 500 880 600" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="1" 
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
          strokeDasharray="4 3"
        />
        <path 
          d="M1100 200 Q1080 300 1060 400 Q1040 500 1020 600" 
          stroke="url(#neuralGradient)" 
          strokeWidth="1" 
          className="animate-pulse"
          style={{ animationDelay: '1.5s' }}
          strokeDasharray="4 3"
        />
        
        {/* Connexions circulaires autour du cerveau */}
        <path 
          d="M950 200 Q1050 250 1000 350 Q950 450 850 400 Q750 350 800 250 Q850 150 950 200" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="1.5" 
          className="animate-pulse"
          style={{ animationDelay: '2.5s' }}
          strokeDasharray="6 4"
        />
        
        {/* Synapses - points de connexion */}
        <circle cx="800" cy="250" r="4" fill="url(#synapseGlow)" className="animate-pulse" />
        <circle cx="1000" cy="250" r="5" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="1200" cy="250" r="3" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        <circle cx="750" cy="300" r="3" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        <circle cx="950" cy="300" r="4" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="1150" cy="300" r="3" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '1.8s' }} />
        
        <circle cx="850" cy="350" r="4" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '2.1s' }} />
        <circle cx="1050" cy="350" r="5" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        <circle cx="1250" cy="350" r="3" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Neurones secondaires */}
        <circle cx="700" cy="280" r="2" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        <circle cx="1300" cy="280" r="2" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
        <circle cx="750" cy="380" r="2" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '1.7s' }} />
        <circle cx="1250" cy="380" r="2" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
        
        {/* Points de données constellation */}
        <circle cx="650" cy="220" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '2.3s' }} />
        <circle cx="1350" cy="220" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="680" cy="320" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
        <circle cx="1320" cy="320" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '2.6s' }} />
        <circle cx="720" cy="420" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
        <circle cx="1280" cy="420" r="1.5" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '1.9s' }} />
        
        {/* Connexions de données vers les côtés */}
        <path 
          d="M650 220 Q500 240 350 260 Q200 280 50 300" 
          stroke="url(#dataStream)" 
          strokeWidth="0.8" 
          className="animate-pulse"
          style={{ animationDelay: '3s' }}
          strokeDasharray="2 3"
        />
        <path 
          d="M1350 220 Q1500 240 1650 260 Q1800 280 1950 300" 
          stroke="url(#dataStream)" 
          strokeWidth="0.8" 
          className="animate-pulse"
          style={{ animationDelay: '3.5s' }}
          strokeDasharray="2 3"
        />
        
        {/* Définitions des gradients */}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
          
          <linearGradient id="neuralGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.5" />
          </linearGradient>
          
          <radialGradient id="synapseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </radialGradient>
          
          <radialGradient id="synapseGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.2" />
          </radialGradient>
          
          <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </radialGradient>
          
          <radialGradient id="dataPoint" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.2" />
          </radialGradient>
          
          <linearGradient id="dataStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Particules flottantes de données */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => {
          const isNearBrain = i < 8;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: '2px',
                height: '2px',
                left: isNearBrain ? `${40 + Math.random() * 30}%` : `${Math.random() * 100}%`,
                top: isNearBrain ? `${15 + Math.random() * 25}%` : `${Math.random() * 100}%`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
                  : 'radial-gradient(circle, hsl(var(--cta-primary)) 0%, transparent 70%)',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NeuralNetwork;