import React from 'react';

const NeuralNetwork = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Réseau de neurones visible autour de la tête */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-90"
        viewBox="0 0 1920 1080" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connexions neuronales principales autour de la zone cerveau */}
        {/* Connexions horizontales plus visibles */}
        <path 
          d="M700 250 Q850 240 1000 250 Q1150 260 1300 250" 
          stroke="url(#neuralGradient)" 
          strokeWidth="3" 
          className="animate-pulse"
          strokeDasharray="8 4"
        />
        <path 
          d="M650 300 Q800 290 950 300 Q1100 310 1250 300" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="2.5" 
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
          strokeDasharray="6 3"
        />
        <path 
          d="M750 350 Q900 340 1050 350 Q1200 360 1350 350" 
          stroke="url(#neuralGradient)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
          strokeDasharray="5 3"
        />
        
        {/* Connexions verticales et diagonales plus épaisses */}
        <path 
          d="M800 200 Q820 300 840 400 Q860 500 880 600" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="2.5" 
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
          strokeDasharray="7 4"
        />
        <path 
          d="M1100 200 Q1080 300 1060 400 Q1040 500 1020 600" 
          stroke="url(#neuralGradient)" 
          strokeWidth="2.5" 
          className="animate-pulse"
          style={{ animationDelay: '1.5s' }}
          strokeDasharray="7 4"
        />
        
        {/* Connexion circulaire principale */}
        <path 
          d="M950 200 Q1050 250 1000 350 Q950 450 850 400 Q750 350 800 250 Q850 150 950 200" 
          stroke="url(#neuralGradient2)" 
          strokeWidth="3" 
          className="animate-pulse"
          style={{ animationDelay: '2.5s' }}
          strokeDasharray="10 5"
        />
        
        {/* Synapses - points de connexion plus grands */}
        <circle cx="800" cy="250" r="8" fill="url(#synapseGlow)" className="animate-pulse" />
        <circle cx="1000" cy="250" r="10" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="1200" cy="250" r="7" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        <circle cx="750" cy="300" r="6" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
        <circle cx="950" cy="300" r="9" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="1150" cy="300" r="6" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '1.8s' }} />
        
        <circle cx="850" cy="350" r="8" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '2.1s' }} />
        <circle cx="1050" cy="350" r="10" fill="url(#synapseGlow2)" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
        <circle cx="1250" cy="350" r="7" fill="url(#synapseGlow)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Neurones secondaires plus visibles */}
        <circle cx="700" cy="280" r="5" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        <circle cx="1300" cy="280" r="5" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '1.1s' }} />
        <circle cx="750" cy="380" r="5" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '1.7s' }} />
        <circle cx="1250" cy="380" r="5" fill="url(#neuronGlow)" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
        
        {/* Points de données constellation plus grands */}
        <circle cx="650" cy="220" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '2.3s' }} />
        <circle cx="1350" cy="220" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="680" cy="320" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
        <circle cx="1320" cy="320" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '2.6s' }} />
        <circle cx="720" cy="420" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
        <circle cx="1280" cy="420" r="4" fill="url(#dataPoint)" className="animate-pulse" style={{ animationDelay: '1.9s' }} />
        
        {/* Connexions de données vers les côtés plus épaisses */}
        <path 
          d="M650 220 Q500 240 350 260 Q200 280 50 300" 
          stroke="url(#dataStream)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '3s' }}
          strokeDasharray="4 4"
        />
        <path 
          d="M1350 220 Q1500 240 1650 260 Q1800 280 1950 300" 
          stroke="url(#dataStream)" 
          strokeWidth="2" 
          className="animate-pulse"
          style={{ animationDelay: '3.5s' }}
          strokeDasharray="4 4"
        />
        
        {/* Définitions des gradients plus intenses */}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="neuralGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
          </linearGradient>
          
          <radialGradient id="synapseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </radialGradient>
          
          <radialGradient id="synapseGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="70%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.4" />
          </radialGradient>
          
          <radialGradient id="neuronGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          </radialGradient>
          
          <radialGradient id="dataPoint" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--cta-primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.4" />
          </radialGradient>
          
          <linearGradient id="dataStream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--cta-primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Particules flottantes de données plus visibles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const isNearBrain = i < 12;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: isNearBrain ? '4px' : '3px',
                height: isNearBrain ? '4px' : '3px',
                left: isNearBrain ? `${35 + Math.random() * 40}%` : `${Math.random() * 100}%`,
                top: isNearBrain ? `${10 + Math.random() * 35}%` : `${Math.random() * 100}%`,
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 50%, transparent 100%)'
                  : 'radial-gradient(circle, hsl(var(--cta-primary)) 0%, hsl(var(--cta-primary) / 0.6) 50%, transparent 100%)',
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