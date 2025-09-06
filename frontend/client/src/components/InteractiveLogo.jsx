import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

export function InteractiveLogo({ size = 'md', showText = false }) {
  const [logoState, setLogoState] = useState('idle');
  const [particles, setParticles] = useState([]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  // Cycle through states automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoState(prev => {
        switch (prev) {
          case 'idle': return 'scanning';
          case 'scanning': return 'verified';
          case 'verified': return 'warning';
          case 'warning': return 'idle';
          default: return 'idle';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate particles for verified state
  useEffect(() => {
    if (logoState === 'verified') {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.8 + 0.2
      }));
      setParticles(newParticles);

      const timeout = setTimeout(() => setParticles([]), 2000);
      return () => clearTimeout(timeout);
    }
  }, [logoState]);

  const getStateIcon = () => {
    switch (logoState) {
      case 'scanning':
        return <Shield className="w-full h-full text-blue-500 animate-pulse" />;
      case 'verified':
        return <CheckCircle className="w-full h-full text-green-500 animate-bounce" />;
      case 'warning':
        return <AlertTriangle className="w-full h-full text-yellow-500 animate-pulse" />;
      default:
        return <Shield className="w-full h-full text-gray-600" />;
    }
  };

  const getStateColor = () => {
    switch (logoState) {
      case 'scanning': return 'border-blue-500 shadow-blue-500/50';
      case 'verified': return 'border-green-500 shadow-green-500/50';
      case 'warning': return 'border-yellow-500 shadow-yellow-500/50';
      default: return 'border-gray-300 shadow-gray-300/30';
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Main logo container */}
        <div className={`
          ${sizeClasses[size]} 
          relative rounded-full border-2 ${getStateColor()}
          bg-gradient-radial from-white to-gray-50 dark:from-gray-900 dark:to-gray-800
          shadow-lg transition-all duration-500 overflow-hidden
          ${logoState === 'idle' ? 'animate-float' : ''}
        `}>
          {/* Background glow effect */}
          <div className={`
            absolute inset-0 rounded-full 
            ${logoState === 'scanning' ? 'animate-glow bg-blue-500/20' : ''}
            ${logoState === 'verified' ? 'animate-pulse bg-green-500/20' : ''}
            ${logoState === 'warning' ? 'animate-pulse bg-yellow-500/20' : ''}
          `} />

          {/* Rotating scanner beam */}
          {logoState === 'scanning' && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-blue-500 to-transparent transform -translate-x-1/2 origin-bottom animate-scanner-sweep" />
            </div>
          )}

          {/* Pulse rings for idle state */}
          {logoState === 'idle' && (
            <>
              <div className="absolute inset-0 rounded-full border border-gray-400 animate-pulse-ring" />
              <div className="absolute inset-0 rounded-full border border-gray-400 animate-pulse-ring animation-delay-1000" />
            </>
          )}

          {/* Data flow lines for scanning */}
          {logoState === 'scanning' && (
            <>
              <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-data-flow" />
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-data-flow animation-delay-500" />
              <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-data-flow animation-delay-1000" />
            </>
          )}

          {/* Main icon */}
          <div className="absolute inset-2 flex items-center justify-center z-10">
            {getStateIcon()}
          </div>

          {/* Particle effects for verified state */}
          {logoState === 'verified' && particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                animation: `pulse 1s ease-in-out infinite, float 2s ease-in-out infinite`
              }}
            />
          ))}

          {/* Matrix rain effect for warning state */}
          {logoState === 'warning' && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-0.5 h-full bg-gradient-to-b from-yellow-500 via-yellow-400 to-transparent animate-matrix-rain`}
                  style={{
                    left: `${20 + i * 30}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Outer rotating ring for scanning state */}
        {logoState === 'scanning' && (
          <div className={`
            absolute inset-0 ${sizeClasses[size]} 
            border-2 border-transparent border-t-blue-500 border-r-blue-400 
            rounded-full animate-spin-fast
          `} />
        )}
      </div>

      {/* Text label */}
      {showText && (
        <span className={`
          ${textSizeClasses[size]} font-medium 
          bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 
          bg-clip-text text-transparent
          ${logoState === 'scanning' ? 'animate-pulse' : ''}
        `}>
          FactVerse
        </span>
      )}
    </div>
  );
}