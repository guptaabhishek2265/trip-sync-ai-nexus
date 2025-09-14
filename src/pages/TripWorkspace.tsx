import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Header from "@/components/Header";
import TripHeader from "@/components/TripHeader";
import VibeBoard from "@/components/VibeBoard";
import ChatWindow from "@/components/ChatWindow";
import { mockTrips } from "@/lib/mock-data";

const TripWorkspace = () => {
  const { tripId } = useParams();
  const [isVibeOpen, setIsVibeOpen] = useState(true);
  
  const trip = mockTrips.find(t => t.id === tripId) || mockTrips[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <TripHeader trip={trip} />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {isVibeOpen && (
            <>
              <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <VibeBoard tripId={tripId} />
                </motion.div>
              </ResizablePanel>
              <ResizableHandle className="bg-border/20 hover:bg-border/40 transition-colors" />
            </>
          )}
          
          <ResizablePanel>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <ChatWindow 
                tripId={tripId} 
                onToggleVibe={() => setIsVibeOpen(!isVibeOpen)}
                isVibeOpen={isVibeOpen}
              />
            </motion.div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default TripWorkspace;