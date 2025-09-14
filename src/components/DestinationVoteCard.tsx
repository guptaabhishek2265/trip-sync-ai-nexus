import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, Users } from "lucide-react";

const DestinationVoteCard = ({ destination, onVote }) => {
  const votePercentage = (destination.votes / destination.totalMembers) * 100;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gradient-surface border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden group cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-semibold text-white mb-2">{destination.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{destination.votes} of {destination.totalMembers} votes</span>
                  <span>{Math.round(votePercentage)}%</span>
                </div>
                <Progress value={votePercentage} className="h-2 bg-white/20" />
              </div>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div className="flex -space-x-1">
                  {destination.votedBy.slice(0, 3).map((voter, index) => (
                    <Avatar key={index} className="w-6 h-6 border border-card">
                      <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                        {voter.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {destination.votedBy.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border border-card flex items-center justify-center text-xs text-muted-foreground">
                      +{destination.votedBy.length - 3}
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(destination.id);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 transition-all duration-300 hover:shadow-glow"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Vote
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DestinationVoteCard;