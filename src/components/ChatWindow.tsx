import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sidebar, Bot } from "lucide-react";
import { mockChatMessages, mockUserProfile } from "@/lib/mock-data";
import SuggestionCard from "@/components/SuggestionCard";

const ChatWindow = ({ tripId, onToggleVibe, isVibeOpen }) => {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      sender: mockUserProfile.name,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Great idea! Let me find some options that match everyone's preferences...",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-full bg-card/10 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-border/20 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleVibe}
              className="border-border/30 hover:border-primary/50"
            >
              <Sidebar className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Trip-Sync AI</h3>
                <p className="text-xs text-muted-foreground">AI Travel Assistant</p>
              </div>
            </div>
          </div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[70%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.type === 'user' ? (
                    <>
                      <AvatarImage src={mockUserProfile.avatar} alt={message.sender} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {message.sender?.slice(0, 2) || 'U'}
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-gradient-primary text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`space-y-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  {message.type === 'suggestion' ? (
                    <SuggestionCard suggestion={message.content} />
                  ) : (
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted/50'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border/20 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about activities, hotels, or anything..."
            className="flex-1 bg-input border-border/30 focus:border-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 transition-all duration-300 hover:shadow-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;