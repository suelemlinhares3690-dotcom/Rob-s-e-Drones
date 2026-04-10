import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RobotFace = ({ isThinking = false, isSpeaking = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="robot-container">
      {/* Indicator Dot */}
      <motion.div 
        className="blue-dot"
        animate={{
          scale: isThinking ? [1, 1.5, 1] : 1,
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Face Shell */}
      <motion.div 
        className="face-shell"
        style={{
          width: '260px',
          height: '190px',
          backgroundColor: 'rgba(74, 28, 26, 0.95)',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '4px solid rgba(140, 47, 31, 0.3)',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Internal Eyes Wrapper */}
        <div style={{ display: 'flex', gap: '50px', zIndex: 10 }}>
          {[ 'L', 'R' ].map((id) => (
            <motion.div
              key={id}
              style={{
                width: '45px',
                height: '80px',
                backgroundColor: '#5a2c2a',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: '1px solid rgba(140, 47, 31, 0.2)'
              }}
              animate={{
                y: mousePos.y * 5,
                x: mousePos.x * 5,
                scaleY: isSpeaking ? [1, 1.1, 1] : 1
              }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {/* Pupil */}
              <motion.div 
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px #fff'
                }}
                animate={{
                  scale: isThinking ? [1, 0.5, 1] : 1,
                  y: mousePos.y * 15,
                  x: mousePos.x * 10,
                }}
              />
              
              {/* Blink Mechanism */}
              <motion.div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#4a1c1a',
                  zIndex: 20,
                  transformOrigin: 'top'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 0, 1, 0, 0, 0, 0, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.42, 0.44, 0.5, 0.8, 0.9, 0.95, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RobotFace;
