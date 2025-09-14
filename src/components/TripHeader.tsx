import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Share } from "lucide-react";

const TripHeader = ({ trip }) => {
  return (
    <div className="border-b border-border/20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">{trip.name}</h1>
            <div className="flex -space-x-2">
              {trip.members.map((member) => (
                <Avatar key={member.id} className="w-10 h-10 border-2 border-card hover:scale-110 transition-transform cursor-pointer">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {member.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripHeader;