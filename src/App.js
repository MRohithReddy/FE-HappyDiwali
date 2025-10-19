import React, { useState, useEffect } from 'react';
import './App.css';

// Firecracker component for animations
const Firecracker = ({ delay, position }) => {
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExploded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`firecracker ${isExploded ? 'exploded' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="spark"></div>
      <div className="spark"></div>
      <div className="spark"></div>
      <div className="spark"></div>
      <div className="spark"></div>
    </div>
  );
};

// Sparkle component for background effects
const Sparkle = ({ delay, position }) => {
  return (
    <div 
      className="sparkle"
      style={{
        left: position.x,
        top: position.y,
        animationDelay: `${delay}ms`
      }}
    >
      ✨
    </div>
  );
};

function App() {
  const [firecrackers, setFirecrackers] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Generate random firecrackers
  useEffect(() => {
    const generateFirecrackers = () => {
      const newFirecrackers = [];
      const newSparkles = [];
      
      for (let i = 0; i < 15; i++) {
        newFirecrackers.push({
          id: i,
          delay: Math.random() * 3000,
          position: {
            x: Math.random() * 100,
            y: Math.random() * 100
          }
        });
      }

      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          delay: Math.random() * 2000,
          position: {
            x: Math.random() * 100,
            y: Math.random() * 100
          }
        });
      }

      setFirecrackers(newFirecrackers);
      setSparkles(newSparkles);
    };

    generateFirecrackers();
    
    // Regenerate firecrackers every 4 seconds
    const interval = setInterval(generateFirecrackers, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="diwali-container">
        {/* Background sparkles */}
        {sparkles.map(sparkle => (
          <Sparkle
            key={sparkle.id}
            delay={sparkle.delay}
            position={sparkle.position}
          />
        ))}
        
        {/* Firecrackers */}
        {firecrackers.map(firecracker => (
          <Firecracker
            key={firecracker.id}
            delay={firecracker.delay}
            position={firecracker.position}
          />
        ))}

        {/* Main content */}
        <div className="diwali-content">
          <h1 className="diwali-title">
            <span className="title-word">Happy</span>
            <span className="title-word">Diwali</span>
          </h1>
          <p className="diwali-subtitle">
            May the festival of lights bring you joy, prosperity, and happiness
          </p>
          <div className="diya-container">
            <div className="diya">🪔</div>
            <div className="diya">🪔</div>
            <div className="diya">🪔</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
