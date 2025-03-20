
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Clock, ShieldCheck, BookOpen, Heart, Zap, Mic, MicOff, Send, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Features = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'My baby is 2 weeks old and has a really red diaper rash. Is this normal?' },
    { role: 'assistant', content: 'Diaper rash is common in newborns. For a 2-week-old, try these steps:\n\n• Change diapers frequently\n\n• Allow air-dry time\n\n• Use zinc oxide cream\n\nCall your pediatrician if it doesn\'t improve in 2-3 days or if you notice blisters, pus, or severe discomfort.' },
    { role: 'user', content: 'Thanks, that\'s helpful! How often should I change diapers?' },
    { role: 'assistant', content: 'I can help answer better by knowing how old is your baby' },
  ]);
  const [isTyping, setIsTyping] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { toast } = useToast();

  const mockQuestions = [
    "My baby is 2 weeks old and has a really red diaper rash. Is this normal?",
    "How often should I change diapers for my newborn?",
    "I'm feeling so exhausted. Is this normal or should I be concerned?",
    "My baby won't latch properly when breastfeeding. What can I do?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Simulate typing response
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
    
    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    const newMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Scroll only within the chat container, not the page
    scrollChatToBottom();
    
    setTimeout(() => {
      simulateResponse(inputMessage);
    }, 1500);
  };

  const handleMockQuestionClick = (question) => {
    // Prevent default behavior to avoid scrolling
    event.preventDefault();
    
    setInputMessage(question);
    const newMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    // Focus on the chat container without scrolling the page
    if (chatContainerRef.current) {
      chatContainerRef.current.focus();
    }
    
    // Scroll only within the chat container, not the page
    scrollChatToBottom();
    
    setTimeout(() => {
      simulateResponse(question);
    }, 1500);
  };

  const scrollChatToBottom = () => {
    // Only scroll within the chat container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  const simulateResponse = (question) => {
    let response = "";
    
    if (question.toLowerCase().includes("diaper rash")) {
      response = "Based on your baby's age (2 weeks) and your description, this type of diaper rash is common in newborns. For your specific situation, try these personalized steps:\n\n• Change diapers more frequently, especially for your newborn's sensitive skin\n• Allow air-dry time after each change\n• Apply a thin layer of zinc oxide cream designed for sensitive newborn skin\n\nIf the rash doesn't improve in 2-3 days with these measures or if you notice blisters, pus, or your baby seems uncomfortable, please contact your pediatrician right away.";
    } else if (question.toLowerCase().includes("change diaper")) {
      response = "For your newborn, I recommend changing diapers about 8-10 times per day, or roughly every 2-3 hours. Since you're asking about frequency, it's important to note that your baby's individual needs might require more frequent changes, especially after feeding times when they're more likely to soil their diaper. Wet diapers should be changed promptly, and soiled diapers should be changed immediately to prevent diaper rash and keep your specific baby comfortable.";
    } else if (question.toLowerCase().includes("exhausted") || question.toLowerCase().includes("tired")) {
      response = "Your exhaustion is completely normal and valid for your postpartum journey. Your body is recovering from childbirth while adjusting to a new sleep schedule. Based on your specific situation, I suggest:\n\n• Sleep when your baby sleeps - even short naps help your unique recovery\n• Accept help from family and friends for tasks specific to your household\n• Stay hydrated and focus on nutritious foods that support your individual healing process\n\nIf your exhaustion is accompanied by feelings of hopelessness or inability to care for yourself or your baby, please contact your healthcare provider immediately as this could indicate postpartum depression, which requires personalized support.";
    } else if (question.toLowerCase().includes("latch") || question.toLowerCase().includes("breastfeed")) {
      response = "I understand how challenging breastfeeding can be for your specific situation. For your latching difficulties, try these personalized techniques:\n\n• Hold your baby skin-to-skin to trigger their natural feeding instincts\n• Ensure your baby's mouth is wide open before latching, like a yawn\n• Position your baby's lower lip as far from the base of your nipple as possible for a deep latch\n• Try the C-hold technique with your thumb and fingers to guide your breast based on your specific anatomy\n\nYour breastfeeding journey is unique, and if these personalized suggestions don't help, I strongly recommend consulting with a lactation consultant who can observe your specific technique and provide customized guidance.";
    } else {
      response = "Thank you for sharing your specific concern. As your personalized care specialist, I recommend discussing this particular issue with your healthcare provider at your next visit. In the meantime, you may find it helpful to monitor your symptoms and note any changes unique to your situation. Would you like me to provide some general information tailored to your recovery journey?";
    }
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    
    // After setting messages, scroll chat to bottom without page scrolling
    setTimeout(() => {
      scrollChatToBottom();
    }, 100);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Voice recording started",
      description: "Speak clearly about your specific concern",
    });
    
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    
    toast({
      title: "Processing your unique question",
      description: "Converting your specific concern to text...",
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setInputMessage(randomQuestion);
      
      toast({
        title: "Your question processed",
        description: "Ready to provide personalized guidance for your situation",
      });
    }, 2000);
  };

  return (
    <section id="features" className="py-16 bg-[#f8fafc]">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-medium">
            How It Works For You
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Your Unique Postpartum Questions, Answered Instantly
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Thrive Mama combines medical expertise with advanced AI to provide 
            support tailored specifically to <span className="italic">your</span> needs and <span className="italic">your</span> baby, 
            helping you navigate <span className="italic">your</span> unique motherhood journey with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <MessageSquare className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Answers</h3>
            <p className="text-gray-600">
              Get responses tailored to your specific situation, your medical history, and your personal recovery journey.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Clock className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-gray-600">
              Get instant support for your concerns, day or night especially during those late nights with your newborn — through text or voice, whenever you need it.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <ShieldCheck className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Research-Verified</h3>
            <p className="text-gray-600">
              All information is verified by postpartum research docs to ensure you receive accurate guidance for your specific concerns.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <BookOpen className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Knowledge Library</h3>
            <p className="text-gray-600">
              Access comprehensive resources tailored to your postpartum stage, your breastfeeding challenges, and your baby's unique development.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Mom & Baby Care</h3>
            <p className="text-gray-600">
              Complete guidance for both your maternal recovery and your infant's care needs in one trusted place.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Relief</h3>
            <p className="text-gray-600">
              Save precious time with immediate answers to your specific questions when you need them most.
            </p>
          </div>
        </div>
        
        <div className="mt-24 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-4 text-pink-600 font-medium">Fast. Simple. Personalized For You!</div>
              <h3 className="text-3xl font-bold mb-6">As Easy as Talking to a Friend Who Knows Your Journey</h3>
              <p className="text-gray-700 mb-6">
                Just <span className="font-bold">type or speak</span> your specific question in your own words, and get 
                personalized answers tailored to your situation within seconds. No complicated menus or 
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
                  <div>Ask anything about your breastfeeding challenges, your baby's sleep patterns, your recovery concerns, or your specific baby care questions</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Use text or voice based on your preference and situation - perfect for those middle-of-the-night concerns</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-red-500 mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>Get clear guidance on which of your concerns need immediate medical attention vs. which are normal for your situation</div>
                </li>
              </ul>
              
              <div className="space-y-2">
                <p className="font-medium text-gray-700">Try asking about your specific concerns:</p>
                <div className="flex flex-wrap gap-2">
                  {mockQuestions.map((question, index) => (
                    <button 
                      key={index} 
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default to stop page scrolling
                        handleMockQuestionClick(question);
                      }}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-3 py-2 rounded-full transition-colors"
                    >
                      {question.length > 30 ? question.substring(0, 30) + '...' : question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Chat window header with Mommique */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex items-center">
                <h3 className="text-white font-semibold text-lg">Mommique</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="p-4 h-[320px] overflow-y-auto flex-1" ref={chatContainerRef}>
                {/* User question */}
                <div className="flex justify-end mb-4">
                  <div className="bg-[#f0f1ff] rounded-lg p-4 max-w-[80%]">
                    <p>My baby is 2 weeks old and has a really red diaper rash. Is this normal?</p>
                  </div>
                </div>
                
                {/* Assistant response */}
                <div className="flex justify-start mb-4">
                  <div className="bg-[#e9f4ff] rounded-lg p-4 max-w-[80%]">
                    <p>Diaper rash is common in newborns. For a 2-week-old, try these steps:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>Change diapers frequently</li>
                      <li>Allow air-dry time</li>
                      <li>Use zinc oxide cream</li>
                    </ul>
                    <p className="mt-4">Call your pediatrician if it doesn't improve in 2-3 days or if you notice blisters, pus, or severe discomfort.</p>
                  </div>
                </div>
                
                {/* User follow-up */}
                <div className="flex justify-end mb-4">
                  <div className="bg-[#f0f1ff] rounded-lg p-4 max-w-[80%]">
                    <p>Thanks, that's helpful! How often should I change diapers?</p>
                  </div>
                </div>
                
                {/* Mommique response asking for baby's age */}
                <div className="flex justify-start mb-4">
                  <div className="bg-[#e9f4ff] rounded-lg p-4 max-w-[80%]">
                    <p>I can help answer better by knowing how old is your baby</p>
                  </div>
                </div>
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center text-gray-400 mt-6">
                    <p>Mommique is typing</p>
                    <div className="typing-animation flex ml-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mx-1" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Search input with voice and send buttons */}
              <div className="p-4 border-t border-gray-100 mt-auto">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-pink-500 transition-colors"
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <MicOff className="h-5 w-5 text-red-500" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search className="h-4 w-4" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Ask a question about your postpartum journey..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="pl-10 pr-10 py-3 bg-gray-50 border-gray-200 rounded-full focus:ring-1 focus:ring-pink-300 focus:border-pink-300"
                      disabled={isRecording || isProcessing}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
                    disabled={inputMessage.trim() === '' || isRecording || isProcessing}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
