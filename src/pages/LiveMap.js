
import { useState } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import { useIsMobile } from '../hooks/use-mobile';

const LiveMap = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 overflow-auto p-4 md:p-6 transition-all ${!isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Live Map</h1>
            
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                <span className="ml-1 text-sm">Active</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="h-3 w-3 bg-amber-500 rounded-full"></span>
                <span className="ml-1 text-sm">Warning</span>
              </div>
              <div className="flex items-center ml-4">
                <span className="h-3 w-3 bg-gray-400 rounded-full"></span>
                <span className="ml-1 text-sm">Inactive</span>
              </div>
            </div>
          </div>
          
          <div className="h-[calc(100vh-10rem)] bg-card border rounded-lg shadow-sm">
            <MapView />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveMap;
