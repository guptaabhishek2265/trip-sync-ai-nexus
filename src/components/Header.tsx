import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Zap, User, Settings, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUserProfile } from "@/lib/mock-data";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer" 
          onClick={() => navigate("/dashboard")}
        >
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Trip-Sync AI
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 hover:bg-muted/50"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </Button>

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative p-2 rounded-full hover:bg-muted/50">
              <Avatar className="w-8 h-8">
                <AvatarImage src={mockUserProfile.avatar} alt={mockUserProfile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border/20">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{mockUserProfile.name}</p>
              <p className="text-xs text-muted-foreground">{mockUserProfile.email}</p>
            </div>
            <DropdownMenuSeparator className="bg-border/20" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-muted/50">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/20" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-muted/50 text-destructive hover:text-destructive"
              onClick={() => navigate("/login")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;