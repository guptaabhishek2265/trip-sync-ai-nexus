import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Users } from "lucide-react";

const SuggestionCard = ({ suggestion }) => {
  const [userVote, setUserVote] = useState(null);
  const [votes, setVotes] = useState(suggestion.votes);

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // Remove vote
      setVotes({
        ...votes,
        [voteType]: votes[voteType] - 1
      });
      setUserVote(null);
    } else {
      // Add new vote, remove old if exists
      const newVotes = { ...votes };
      if (userVote) {
        newVotes[userVote] = newVotes[userVote] - 1;
      }
      newVotes[voteType] = newVotes[voteType] + 1;
      setVotes(newVotes);
      setUserVote(voteType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-surface border-border/20 hover:border-primary/30 transition-all duration-300 overflow-hidden max-w-md">
        <div className="aspect-video overflow-hidden">
          <img 
            src={suggestion.image} 
            alt={suggestion.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant={userVote === 'up' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleVote('up')}
                  className={`${
                    userVote === 'up' 
                      ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                      : 'border-border/30 hover:border-secondary/50'
                  } transition-all duration-300`}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {votes.up}
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant={userVote === 'down' ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => handleVote('down')}
                  className={`${
                    userVote === 'down' 
                      ? '' 
                      : 'border-border/30 hover:border-destructive/50'
                  } transition-all duration-300`}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {votes.down}
                </Button>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{suggestion.votedBy?.length || 0} voted</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SuggestionCard;