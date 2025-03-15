import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Clock, ShieldCheck, BookOpen, Heart, Zap, Mic, MicOff, Send, Bot, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Features = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I\'m your personal postpartum AI guide, tailored specifically to your needs. How can I help you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const videoRef = useRef(null);
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
      response = "Based on your baby's age (2 weeks) and your description, this type of diaper rash is common in newborns. For your specific situation, try these personalized steps:\n\n• Change diapers more frequently, especially for your newborn's sensitive skin\n• Allow air-dry time after each change\n• Apply a thin layer of zinc oxide cream designed for sensitive newborn skin\n\nIf the rash doesn't improve in 2-3 days with these measures or if you notice blisters, pus, or your baby seems uncomfortable, please contact your pediatrician right away.";
    } else if (question.toLowerCase().includes("change diaper")) {
      response = "For your newborn, I recommend changing diapers about 8-10 times per day, or roughly every 2-3 hours. Since you're asking about frequency, it's important to note that your baby's individual needs might require more frequent changes, especially after feeding times when they're more likely to soil their diaper. Wet diapers should be changed promptly, and soiled diapers should be changed immediately to prevent diaper rash and keep your specific baby comfortable.";
    } else if (question.toLowerCase().includes("exhausted") || question.toLowerCase().includes("tired")) {
      response = "Your exhaustion is completely normal and valid for your postpartum journey. Your body is recovering from childbirth while adjusting to a new sleep schedule. Based on your specific situation, I suggest:\n\n• Sleep when your baby sleeps - even short naps help your unique recovery\n• Accept help from family and friends for tasks specific to your household\n• Stay hydrated and focus on nutritious foods that support your individual healing process\n\nIf your exhaustion is accompanied by feelings of hopelessness or inability to care for yourself or your baby, please contact your healthcare provider immediately as this could indicate postpartum depression, which requires personalized support.";
    } else if (question.toLowerCase().includes("latch") || question.toLowerCase().includes("breastfeed")) {
      response = "I understand how challenging breastfeeding can be for your specific situation. For your latching difficulties, try these personalized techniques:\n\n• Hold your baby skin-to-skin to trigger their natural feeding instincts\n• Ensure your baby's mouth is wide open before latching, like a yawn\n• Position your baby's lower lip as far from the base of your nipple as possible for a deep latch\n• Try the C-hold technique with your thumb and fingers to guide your breast based on your specific anatomy\n\nYour breastfeeding journey is unique, and if these personalized suggestions don't help, I strongly recommend consulting with a lactation consultant who can observe your specific technique and provide customized guidance.";
    } else {
      response = "Thank you for sharing your specific concern. As your personalized postpartum care specialist, I recommend discussing this particular issue with your healthcare provider at your next visit. In the meantime, you may find it helpful to monitor your symptoms and note any changes unique to your situation. Would you like me to provide some general information tailored to your postpartum recovery journey?";
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
      description: "Speak clearly about your specific concern",
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
      title: "Processing your unique question",
      description: "Converting your specific concern to text...",
    });
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Randomly select a mock question
      const randomQuestion = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setInputMessage(randomQuestion);
      
      toast({
        title: "Your question processed",
        description: "Ready to provide personalized guidance for your situation",
      });
    }, 2000);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

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
            <h3 className="text-xl font-bold mb-3">Answers Unique To You</h3>
            <p className="text-gray-600">
              Get responses tailored to your specific situation, your medical history, and your personal recovery journey.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Clock className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Support For Your Schedule</h3>
            <p className="text-gray-600">
              Get instant support for your concerns, day or night especially during those late nights with your newborn — through text or voice, whenever you need it.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <ShieldCheck className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Verified For Your Peace of Mind</h3>
            <p className="text-gray-600">
              All information is verified by postpartum research docs to ensure you receive accurate guidance for your specific concerns.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <BookOpen className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Resources For Your Journey</h3>
            <p className="text-gray-600">
              Access comprehensive resources tailored to your postpartum stage, your breastfeeding challenges, and your baby's unique development.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Care For You & Your Baby</h3>
            <p className="text-gray-600">
              Complete guidance for both your maternal recovery and your infant's care needs in one trusted place.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col">
            <div className="mb-5 p-3 bg-pink-50 rounded-full inline-block w-fit">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Relief For Your Concerns</h3>
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
                Just type or speak your specific question in your own words, and get thoughtful, 
                personalized answers tailored to your unique situation within seconds. No complicated menus or 
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
              <div className="bg-pink-100 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                    <Bot className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">How Thrive Mama Works</h4>
                    <p className="text-xs text-gray-600">See how our AI helps you in real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-gray-900">
                <AspectRatio ratio={16/9} className="w-full">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    poster="/lovable-uploads/79afbdd8-32c1-4b06-bca9-c21961dc1e30.png"
                  >
                    <source 
                      src="https://framerusercontent.com/modules/assets/XuzMZ3Z1QQHKltPqRjzGnsWs0Sg~YnBHEOWEQBBT_YxMGRCBMQzA-pAVTwH7oa0qNAI.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying && (
                      <Button 
                        onClick={togglePlayPause}
                        variant="secondary"
                        className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50"
                      >
                        <Play className="h-8 w-8 text-white" fill="white" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <Button 
                      onClick={togglePlayPause}
                      variant="secondary"
                      size="icon"
                      className="bg-white/30 backdrop-blur-sm hover:bg-white/50"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white" />
                      )}
                    </Button>
                    
                    <Button 
                      onClick={toggleMute}
                      variant="secondary"
                      size="icon"
                      className="bg-white/30 backdrop-blur-sm hover:bg-white/50"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                </AspectRatio>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-700">
                  Watch how Thrive Mama provides personalized support for your unique postpartum journey. 
                  Our AI assistant understands your specific needs and offers tailored guidance just for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
