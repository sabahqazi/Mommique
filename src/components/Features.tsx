
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Clock, ShieldCheck, BookOpen, Heart, Zap, Mic, MicOff, Send, Bot } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Features = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I\'m your personal postpartum AI guide. How can I help you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  // Mock questions for demonstration
  const mockQuestions = [
    "My baby is 2 weeks old and has a really red diaper rash. Is this normal?",
    "How often should I change diapers for my newborn?",
    "I'm feeling so exhausted. Is this normal or should I be concerned?",
    "My baby won't latch properly when breastfeeding. What can I do?"
  ];

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    const newMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      simulateResponse(inputMessage);
    }, 1500);
  };

  const handleMockQuestionClick = (question) => {
    setInputMessage(question);
    const newMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      simulateResponse(question);
    }, 1500);
  };

  const simulateResponse = (question) => {
    let response = "";
    
    if (question.toLowerCase().includes("diaper rash")) {
      response = "Diaper rash is common in newborns. For a 2-week-old, try these steps:\n\n• Change diapers frequently\n• Allow air-dry time\n• Use zinc oxide cream\n\nCall your pediatrician if it doesn't improve in 2-3 days or if you notice blisters, pus, or severe discomfort.";
    } else if (question.toLowerCase().includes("change diaper")) {
      response = "For newborns, you should change diapers about 8-10 times per day, or roughly every 2-3 hours. Wet diapers should be changed promptly, and soiled diapers should be changed immediately to prevent diaper rash and discomfort.";
    } else if (question.toLowerCase().includes("exhausted") || question.toLowerCase().includes("tired")) {
      response = "Feeling exhausted is completely normal for new mothers. Your body is recovering from childbirth while adjusting to a new sleep schedule. Try to:\n\n• Sleep when your baby sleeps\n• Accept help from family and friends\n• Stay hydrated and eat nutritious foods\n\nIf exhaustion is accompanied by feelings of hopelessness or inability to care for yourself or baby, please contact your healthcare provider as this could be a sign of postpartum depression.";
    } else if (question.toLowerCase().includes("latch") || question.toLowerCase().includes("breastfeed")) {
      response = "Breastfeeding challenges are common. For proper latching:\n\n• Hold baby skin-to-skin\n• Ensure baby's mouth is wide open before latching\n• Position baby's lower lip as far from the base of your nipple as possible\n• Use the C-hold technique to guide your breast\n\nConsider consulting with a lactation consultant if difficulties persist.";
    } else {
      response = "Thank you for your question. As a postpartum care specialist, I recommend discussing this with your healthcare provider at your next visit. In the meantime, you may find it helpful to monitor your symptoms and note any changes. Would you like me to provide some general information about postpartum recovery?";
    }
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'system', content: response }]);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    // In a real implementation, this would use the Web Audio API and speech recognition
    setIsRecording(true);
    toast({
      title: "Voice recording started",
      description: "Speak clearly into your microphone",
    });
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    toast({
      title: "Processing your audio",
      description: "Converting speech to text...",
    });
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Randomly select a mock question
      const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setInputMessage(randomQuestion);
      
      toast({
        title: "Audio processed",
        description: "Your question has been transcribed",
      });
    }, 2000);
  };

  return (
    <section id="features" className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Your Postpartum Questions, Answered Instantly
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Thrive mama combines medical expertise with advanced AI to provide 
            personalized support exactly when you need it, helping you navigate the 
            challenges of early motherhood with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <MessageSquare className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Answers</h3>
            <p className="text-gray-600">
              Get responses tailored to your specific situation, medical history, and recovery journey.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Clock className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Availability through text or voice</h3>
            <p className="text-gray-600">
              Get instant support, day or night especially during those late nights worries — through text or voice, whenever you need it.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <ShieldCheck className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Research-backed Answers</h3>
            <p className="text-gray-600">
              All information is verified by postpartum research docs posted by professional and updated regularly.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <BookOpen className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Library</h3>
            <p className="text-gray-600">
              Access comprehensive resources on postpartum care, breastfeeding, and baby development.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mom & Baby Care</h3>
            <p className="text-gray-600">
              Complete guidance for both maternal recovery and infant care in one trusted place.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Relief</h3>
            <p className="text-gray-600">
              Save precious time with immediate answers and support when you need it most.
            </p>
          </div>
        </div>
        
        <div className="mt-24 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-4 text-pink-600 font-medium">Fast. Simple. Always There for You!</div>
              <h3 className="text-3xl font-bold mb-6">As Easy as Talking to a Friend</h3>
              <p className="text-gray-700 mb-6">
                Just type or speak your question in natural language, and get thoughtful, 
                personalized answers within seconds. No complicated menus or 
                learning curve.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Ask anything about breastfeeding, sleep, recovery, or baby care</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Use text or voice for your questions - whatever is easier for you</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Get urgent vs. non-urgent guidance on when to call your doctor</div>
                </li>
              </ul>
              
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Try asking about:</p>
                <div className="flex flex-wrap gap-2">
                  {mockQuestions.map((question, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleMockQuestionClick(question)}
                      className="bg-pink-50 hover:bg-pink-100 text-pink-700 text-sm px-3 py-2 rounded-full transition-colors"
                    >
                      {question.length > 30 ? question.substring(0, 30) + '...' : question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              {/* Chat header */}
              <div className="bg-pink-100 p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h4 className="font-medium">CaringMommy Assistant</h4>
                  <p className="text-xs text-gray-600">Online • Responds instantly</p>
                </div>
              </div>
              
              {/* Video/avatar section */}
              <div className="bg-pink-50 p-4 flex justify-center items-center">
                <div className="relative rounded-lg overflow-hidden w-full max-w-xs aspect-video bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/79afbdd8-32c1-4b06-bca9-c21961dc1e30.png" 
                    alt="Mother and baby whale illustration" 
                    className="h-24 animate-float"
                  />
                  <div className="absolute bottom-2 right-2 bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                    AI Guide
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-pink-100 text-gray-800' 
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleSubmit} className="p-4 border-t flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={toggleRecording}
                  disabled={isProcessing}
                  className={`p-2 rounded-full ${
                    isRecording 
                      ? 'bg-red-100 text-red-500 animate-pulse' 
                      : isProcessing 
                        ? 'bg-gray-100 text-gray-400' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <input 
                  type="text" 
                  value={inputMessage} 
                  onChange={(e) => setInputMessage(e.target.value)} 
                  placeholder="Type your question here..." 
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
                <button 
                  type="submit" 
                  disabled={!inputMessage.trim()} 
                  className={`p-2 rounded-full ${
                    inputMessage.trim() 
                      ? 'bg-pink-100 text-pink-500 hover:bg-pink-200' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
