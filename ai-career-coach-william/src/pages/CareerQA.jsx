import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineAssessment, MdSend, MdOutlineHistory, MdOutlineQuestionMark } from 'react-icons/md';
import { BiRefresh, BiBot, BiUser } from 'react-icons/bi';
import { FaLightbulb, FaGraduationCap, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { chat } from '../lib/api';

const CareerQA = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Career Coach. I'm here to help answer any questions about your career journey, skills development, job search strategies, and professional growth. What would you like to know today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    {
      category: 'Career Path',
      icon: FaGraduationCap,
      questions: [
        "What career path should I choose based on my interests?",
        "How do I transition from my current role to a new field?",
        "What are the emerging career opportunities in tech?"
      ]
    },
    {
      category: 'Skills Development',
      icon: FaLightbulb,
      questions: [
        "What skills are in demand for my target role?",
        "How can I improve my technical skills quickly?",
        "What certifications should I pursue for career growth?"
      ]
    },
    {
      category: 'Job Search',
      icon: FaBriefcase,
      questions: [
        "How do I write an effective resume?",
        "What should I expect in technical interviews?",
        "How do I negotiate salary and benefits?"
      ]
    },
    {
      category: 'Career Growth',
      icon: FaChartLine,
      questions: [
        "How do I advance to a leadership position?",
        "What networking strategies work best?",
        "How do I build a personal brand in my industry?"
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await chat.sendMessage(userMessage.content);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: res.data.reply || '...',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Sorry, I could not fetch a reply. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Career Coach. I'm here to help answer any questions about your career journey, skills development, job search strategies, and professional growth. What would you like to know today?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-indigo-600">Career Q&A</h1>
          <p className="text-gray-600 transition-colors duration-200 hover:text-gray-700">Get personalized career advice and answers to your professional questions</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
          <button className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md">
            <MdOutlineHistory size={18} className="transition-transform duration-200 hover:rotate-12" />
            <span className="hidden md:inline">History</span>
          </button>
          <button onClick={handleClearChat} className="flex items-center space-x-2 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md">
            <BiRefresh size={18} className="transition-transform duration-200 hover:rotate-180" />
            <span className="hidden md:inline">Clear Chat</span>
          </button>
        </div>

        {/* Main Chat Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 transition-all duration-300 hover:shadow-xl">
          {/* Messages */}
          <div className="p-6 space-y-4 min-h-96 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-300 animate-fadeIn`}>
                    <div className={`flex space-x-3 max-w-[80%] transition-all duration-200 hover:scale-[1.02] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${message.type === 'user' ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {message.type === 'user' ? (
                          <BiUser size={16} className="transition-transform duration-200 hover:rotate-12" />
                        ) : (
                          <BiBot size={16} className="transition-transform duration-200 hover:rotate-12" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div className={`rounded-lg p-4 transition-all duration-200 hover:shadow-md ${message.type === 'user' ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-50'}`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2 transition-opacity duration-200 hover:opacity-100">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="flex space-x-3 max-w-[80%]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-200 animate-pulse">
                        <BiBot size={16} className="transition-transform duration-200 animate-spin" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 transition-all duration-200 hover:bg-gray-50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200 transition-all duration-200">
                <div className="flex space-x-4">
                  <div className="flex-grow relative">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your career..."
                      className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 pr-12 resize-none border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-[1.02] focus:shadow-lg focus:bg-white"
                      rows="3"
                    />
                  </div>
                  <button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="bg-indigo-500 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 flex items-center justify-center">
                    <MdSend size={20} className="transition-transform duration-200 hover:rotate-12" />
                  </button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerQA;