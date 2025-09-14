import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, MapPin, Calendar } from "lucide-react";
import { mockTrips } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Your Trips
            </h1>
            <p className="text-muted-foreground mt-2">
              Plan, collaborate, and explore with AI assistance
            </p>
          </div>
          <Button
            onClick={() => navigate("/create-trip")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Trip
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockTrips.map((trip) => (
            <motion.div key={trip.id} variants={itemVariants}>
              <Card
                className="bg-gradient-surface border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-hover cursor-pointer group"
                onClick={() => navigate(`/trip/${trip.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {trip.name}
                    </CardTitle>
                    <div className="flex -space-x-2">
                      {trip.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-8 h-8 border-2 border-card">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {member.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {trip.members.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                          +{trip.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {trip.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {trip.dates}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {trip.members.length} members
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'planning' 
                        ? 'bg-accent/20 text-accent' 
                        : 'bg-secondary/20 text-secondary'
                    }`}>
                      {trip.status}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Create Trip Card */}
          <motion.div variants={itemVariants}>
            <Card
              className="bg-gradient-glow border-dashed border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 cursor-pointer group min-h-[280px] flex items-center justify-center"
              onClick={() => navigate("/create-trip")}
            >
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Create New Trip</h3>
                  <p className="text-sm text-muted-foreground">Start planning your next adventure</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;