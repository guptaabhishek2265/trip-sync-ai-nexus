import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [tripData, setTripData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    length: "",
    vibe: "",
    destinations: [],
  });

  const vibeOptions = [
    { id: "beach", name: "Beaches", emoji: "🏖️", description: "Sun, sand, and relaxation" },
    { id: "mountain", name: "Mountains", emoji: "🏔️", description: "Fresh air and hiking trails" },
    { id: "city", name: "Cities", emoji: "🏙️", description: "Urban exploration and culture" },
  ];

  const destinationOptions = [
    { id: "tokyo", name: "Tokyo, Japan", image: "/api/placeholder/300/200" },
    { id: "paris", name: "Paris, France", image: "/api/placeholder/300/200" },
    { id: "bali", name: "Bali, Indonesia", image: "/api/placeholder/300/200" },
    { id: "nyc", name: "New York, USA", image: "/api/placeholder/300/200" },
    { id: "london", name: "London, UK", image: "/api/placeholder/300/200" },
    { id: "sydney", name: "Sydney, Australia", image: "/api/placeholder/300/200" },
  ];

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 4));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://trip-sync.ai/invite/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDestination = (destinationId) => {
    setTripData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destinationId)
        ? prev.destinations.filter(id => id !== destinationId)
        : prev.destinations.length < 3 
          ? [...prev.destinations, destinationId]
          : prev.destinations
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Trip Basics</h2>
              <p className="text-muted-foreground">Let's start with the essentials</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tripName">Trip Name</Label>
                <Input
                  id="tripName"
                  value={tripData.name}
                  onChange={(e) => setTripData({...tripData, name: e.target.value})}
                  placeholder="e.g., Tokyo Adventure 2024"
                  className="bg-input border-border/30 focus:border-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={tripData.startDate}
                    onChange={(e) => setTripData({...tripData, startDate: e.target.value})}
                    className="bg-input border-border/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={tripData.endDate}
                    onChange={(e) => setTripData({...tripData, endDate: e.target.value})}
                    className="bg-input border-border/30 focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="length">Trip Length</Label>
                <Input
                  id="length"
                  value={tripData.length}
                  onChange={(e) => setTripData({...tripData, length: e.target.value})}
                  placeholder="e.g., 7 days"
                  className="bg-input border-border/30 focus:border-primary"
                />
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Your Vibe</h2>
              <p className="text-muted-foreground">What kind of experience are you looking for?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vibeOptions.map((vibe) => (
                <motion.div
                  key={vibe.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      tripData.vibe === vibe.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/20 hover:border-primary/50'
                    }`}
                    onClick={() => setTripData({...tripData, vibe: vibe.id})}
                  >
                    <CardContent className="p-6 text-center space-y-3">
                      <div className="text-4xl">{vibe.emoji}</div>
                      <h3 className="font-semibold">{vibe.name}</h3>
                      <p className="text-sm text-muted-foreground">{vibe.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Choose Top 3 Destinations</h2>
              <p className="text-muted-foreground">
                Select up to 3 destinations to vote on ({tripData.destinations.length}/3)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinationOptions.map((destination) => (
                <motion.div
                  key={destination.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                      tripData.destinations.includes(destination.id)
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border/20 hover:border-primary/50'
                    }`}
                    onClick={() => toggleDestination(destination.id)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-center">{destination.name}</h3>
                      {tripData.destinations.includes(destination.id) && (
                        <Badge className="mt-2 w-full justify-center bg-primary text-primary-foreground">
                          Selected
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto">
                <Check className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold">Trip Created!</h2>
              <p className="text-muted-foreground">
                Your trip "{tripData.name}" has been created successfully
              </p>
            </div>
            
            <Card className="bg-gradient-surface border-border/20">
              <CardHeader>
                <CardTitle className="text-center">Invite Your Crew</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Share this link with your travel companions
                </p>
                <div className="flex items-center space-x-2">
                  <Input
                    value="https://trip-sync.ai/invite/abc123"
                    readOnly
                    className="bg-input border-border/30"
                  />
                  <Button
                    onClick={copyInviteLink}
                    variant="outline"
                    className="border-border/30 hover:border-primary/50"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                {copied && (
                  <p className="text-center text-sm text-secondary">Link copied!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="border-border/30 hover:border-primary/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Create New Trip
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 h-0.5 mx-2 transition-colors ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <Card className="bg-gradient-surface border-border/20">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-border/30 hover:border-primary/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !tripData.name) ||
                  (currentStep === 2 && !tripData.vibe) ||
                  (currentStep === 3 && tripData.destinations.length === 0)
                }
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateTrip;