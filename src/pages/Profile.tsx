import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUserProfile } from "@/lib/mock-data";
import Header from "@/components/Header";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(mockUserProfile);
  const [newLove, setNewLove] = useState("");
  const [newAvoid, setNewAvoid] = useState("");

  const addPreference = (type, value) => {
    if (!value.trim()) return;
    
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: [...prev.preferences[type], value.trim()]
      }
    }));
    
    if (type === 'loves') setNewLove("");
    else setNewAvoid("");
  };

  const removePreference = (type, index) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: prev.preferences[type].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
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
              Your Travel Profile
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-surface border-border/20">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <p className="text-muted-foreground">{profile.email}</p>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Things I Love */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-surface border-border/20">
                <CardHeader>
                  <CardTitle className="text-lg text-secondary">Things I Love</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.loves.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-secondary/30 text-secondary hover:bg-secondary/10 group"
                      >
                        {item}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePreference('loves', index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newLove}
                      onChange={(e) => setNewLove(e.target.value)}
                      placeholder="Add something you love..."
                      className="bg-input border-border/30 focus:border-secondary"
                      onKeyPress={(e) => e.key === 'Enter' && addPreference('loves', newLove)}
                    />
                    <Button
                      onClick={() => addPreference('loves', newLove)}
                      size="sm"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Things I Avoid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-gradient-surface border-border/20">
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Things I Avoid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.avoids.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-destructive/30 text-destructive hover:bg-destructive/10 group"
                      >
                        {item}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePreference('avoids', index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      value={newAvoid}
                      onChange={(e) => setNewAvoid(e.target.value)}
                      placeholder="Add something you avoid..."
                      className="bg-input border-border/30 focus:border-destructive"
                      onKeyPress={(e) => e.key === 'Enter' && addPreference('avoids', newAvoid)}
                    />
                    <Button
                      onClick={() => addPreference('avoids', newAvoid)}
                      size="sm"
                      variant="outline"
                      className="border-destructive/30 hover:border-destructive/50 text-destructive"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
            >
              Save Preferences
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;