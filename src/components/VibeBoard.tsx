import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Type } from "lucide-react";
import { mockVibeItems, mockDestinations } from "@/lib/mock-data";
import DestinationVoteCard from "@/components/DestinationVoteCard";

const VibeBoard = ({ tripId }) => {
  const [vibeItems, setVibeItems] = useState(mockVibeItems);
  const [hasDestination, setHasDestination] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  if (!hasDestination) {
    return (
      <div className="h-full bg-card/20 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Choose Destination</h2>
            <Badge variant="outline" className="border-accent/30 text-accent">
              Voting Phase
            </Badge>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {mockDestinations.map((destination) => (
              <motion.div key={destination.id} variants={itemVariants}>
                <DestinationVoteCard 
                  destination={destination}
                  onVote={() => {
                    // Handle vote logic
                    console.log("Voted for", destination.name);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          <Button 
            variant="outline" 
            className="w-full border-dashed border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/10"
            onClick={() => setHasDestination(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Suggest New Destination
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card/20 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Group Vibe</h2>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4"
        >
          {vibeItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="bg-gradient-surface border-border/20 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-4">
                  {item.type === "image" ? (
                    <div className="space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={item.content} 
                          alt={item.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.caption}</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm">{item.content}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">by {item.addedBy}</span>
                    <div className="flex items-center space-x-1">
                      {item.type === "image" ? (
                        <Image className="w-3 h-3 text-muted-foreground" />
                      ) : (
                        <Type className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="border-dashed border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/10"
          >
            <Image className="w-4 h-4 mr-2" />
            Photo
          </Button>
          <Button 
            variant="outline" 
            className="border-dashed border-accent/30 hover:border-accent/60 text-accent hover:bg-accent/10"
          >
            <Type className="w-4 h-4 mr-2" />
            Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VibeBoard;