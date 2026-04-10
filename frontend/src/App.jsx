import React, { useState } from 'react';
import RobotFace from './components/RobotFace';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Cpu, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await axios.post('http://localhost:8000/chat', { message: input });
      setIsThinking(false);
      setIsSpeaking(true);
      
      const botMessage = { role: 'bot', content: response.data.response };
      setMessages(prev => [...prev, botMessage]);
      
      setTimeout(() => setIsSpeaking(false), botMessage.content.length * 50);
    } catch (error) {
      console.error('Error:', error);
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'bot', content: 'Ops! Tive um curto-circuito. Pode tentar de novo?' }]);
    }
  };

  return (
    <div className="app-container">
      <header>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Robôs & Drones
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Máquinas que ganham vida
        </motion.p>
      </header>

      <main className="main-content">
        <RobotFace isThinking={isThinking} isSpeaking={isSpeaking} />

        <div className="chat-container">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`message ${msg.role}`}
              >
                <div className={`icon-wrapper ${msg.role}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Cpu size={16} />}
                </div>
                <div className="message-bubble glass markdown-content">
                  <ReactMarkdown>
                    {String(msg.content)}
                  </ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="thinking-indicator">
              Processando lógica...
            </motion.div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            className="glass"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre robôs ou drones..."
          />
          <button onClick={handleSend} className="send-btn">
            <Send size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
