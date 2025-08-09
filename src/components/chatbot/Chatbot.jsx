import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm your fitness assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Sample responses based on keywords
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
  return "Absolutely! 💪 I can suggest workouts tailored to your goals and fitness level. You can also try our personalized workout generator on the home page to get a full routine ready in seconds.";
} 
else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
  return "Nutrition is just as important as exercise! 🥗 I can share tips on balanced eating, portion sizes, and even recommend foods that support your fitness goals. You can also explore our Nutrition Tracker to log meals and monitor macros.";
} 
else if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
  return "Tracking your progress keeps you motivated! 📊 In the Progress Tracker, you can see your workout history, milestones, and how far you’ve come — and I can give you encouragement along the way.";
} 
else if (lowerMessage.includes('posture') || lowerMessage.includes('form')) {
  return "Proper form makes all the difference in preventing injuries! 🏋️‍♂️ Our Posture Detection feature can give you real-time feedback while you work out.";
} 
else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
  return "Hey there! 👋 Excited to help you on your fitness journey today. What’s on your mind — workouts, nutrition, progress tracking, or something else?";
} 
else {
  return "I’m your fitness companion 🤖💚 — ready to guide you with workouts, diet tips, progress tracking, and posture correction. Just let me know what you’d like to focus on!";
}

  };

  
const handleSubmit = (e) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  // Add user message
  const userMessage = {
    id: messages.length + 1,
    text: inputValue,
    sender: 'user'
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');

  // Show bot typing indicator
  const botTypingMessage = {
    id: messages.length + 2,
    text: '...',
    sender: 'bot'
  };
  setMessages(prev => [...prev, botTypingMessage]);

  // Get bot response
  setTimeout(() => {
    const botResponse = getBotResponse(inputValue);
    
    // Remove typing indicator and add actual bot response
    setMessages(prev => {
      const newMessages = prev.filter(msg => msg.id !== botTypingMessage.id);
      return [...newMessages, { id: botTypingMessage.id, text: botResponse, sender: 'bot' }];
    });
  }, 1000);
};
  
  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <i className="fas fa-comment text-xl"></i>
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {/* Chat header */}
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <h3 className="font-medium">Fitness Assistant</h3>
              <button onClick={() => setIsOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 bg-gray-100 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-r-lg"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
