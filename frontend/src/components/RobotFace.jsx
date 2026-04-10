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
    <div className="robot-container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Indicator Dot */}
      <motion.div 
        className="blue-dot"
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb)',
          boxShadow: '0 0 15px #60a5fa',
          marginBottom: '20px',
        }}
        animate={{
          scale: isThinking ? [1, 1.3, 1] : 1,
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* 3D Head */}
      <div 
        className="robot-head"
        style={{
          width: '320px',
          height: '240px',
          background: 'radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
          borderRadius: '45% 45% 45% 45% / 55% 55% 40% 40%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '15px 20px 40px rgba(0,0,0,0.15), -10px -10px 20px rgba(255,255,255,0.8) inset, -15px -20px 30px rgba(0,0,0,0.1) inset, 0 10px 20px rgba(255,255,255,0.6) inset',
          position: 'relative',
          zIndex: 3
        }}
      >
        {/* Face Visor (3D Glass) */}
        <motion.div 
          className="face-shell"
          style={{
            width: '260px',
            height: '140px',
            background: 'linear-gradient(160deg, #3a1110 0%, #1a0808 100%)',
            borderRadius: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid #5a1c1a',
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.8), inset 0 -5px 15px rgba(255,255,255,0.1), 0 5px 15px rgba(0,0,0,0.4)',
            zIndex: 4
          }}
        >
          {/* Glass Reflection Highlight */}
          <div style={{
            position: 'absolute',
            top: 2,
            left: 10,
            right: 10,
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))',
            borderRadius: '100px 100px 0 0',
            pointerEvents: 'none',
            zIndex: 100
          }}></div>

          {/* Internal Eyes Wrapper */}
          <div style={{ display: 'flex', gap: '55px', zIndex: 10 }}>
            {[ 'L', 'R' ].map((id) => (
              <motion.div
                key={id}
                style={{
                  width: '40px',
                  height: '75px',
                  background: 'linear-gradient(135deg, #111 0%, #4a1c1a 100%)',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: '1px solid #111',
                  boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.8), 0 0 10px rgba(255,50,50,0.1)'
                }}
                animate={{
                  y: mousePos.y * 8,
                  x: mousePos.x * 8,
                  scaleY: isSpeaking ? [1, 1.15, 1] : 1
                }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {/* Pupil (Glowing) */}
                <motion.div 
                  style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px #fff, 0 0 30px #60a5fa'
                  }}
                  animate={{
                    scale: isThinking ? [1, 0.4, 1] : 1,
                    y: mousePos.y * 12,
                    x: mousePos.x * 12,
                  }}
                />
                
                {/* Blink Mechanism */}
                <motion.div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#1a0808',
                    zIndex: 20,
                    transformOrigin: 'top',
                    borderRadius: '25px'
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

      {/* 3D Neck */}
      <div 
        className="robot-neck"
        style={{
          width: '80px',
          height: '35px',
          background: 'linear-gradient(90deg, #94a3b8 0%, #cbd5e1 20%, #f1f5f9 50%, #cbd5e1 80%, #94a3b8 100%)',
          boxShadow: 'inset 0 10px 15px rgba(0,0,0,0.5)',
          marginTop: '-15px',
          zIndex: 2,
          position: 'relative'
        }}
      />

      {/* 3D Body */}
      <div 
        className="robot-body"
        style={{
          width: '280px',
          height: '110px',
          background: 'radial-gradient(120% 120% at 50% 10%, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
          borderRadius: '100px 100px 40px 40px',
          boxShadow: '15px 20px 40px rgba(0,0,0,0.15), -10px -10px 20px rgba(255,255,255,0.8) inset, -10px -20px 30px rgba(0,0,0,0.1) inset, 0 10px 20px rgba(255,255,255,0.6) inset',
          marginTop: '-15px',
          zIndex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.5)'
        }}
      >
        {/* Core/Chest Detail */}
        <div style={{
          marginTop: '40px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          boxShadow: 'inset 0 5px 10px rgba(0,0,0,0.8), 0 2px 5px rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            boxShadow: '0 0 15px #3b82f6, 0 0 30px #60a5fa'
          }}
          animate={{ opacity: isThinking ? [0.4, 1, 0.4] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default RobotFace;
