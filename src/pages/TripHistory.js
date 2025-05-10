
import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import TripTable from '../components/TripTable';
import TripCard from '../components/TripCard';
import { useIsMobile } from '../hooks/use-mobile';

// Mock trips data
const MOCK_TRIPS = [
  { id: '1', bikeId: 'BK-1001', startTime: 'Today, 10:30 AM', endTime: 'Today, 11:15 AM', distance: 5.8, route: 'Downtown Loop', completion: 100 },
  { id: '2', bikeId: 'BK-1003', startTime: 'Today, 09:45 AM', endTime: 'Today, 10:30 AM', distance: 4.2, route: 'River Trail', completion: 100 },
  { id: '3', bikeId: 'BK-1005', startTime: 'Today, 08:15 AM', endTime: 'Today, 09:00 AM', distance: 6.1, route: 'Hillside Route', completion: 100 },
  { id: '4', bikeId: 'BK-1002', startTime: 'Yesterday, 04:20 PM', endTime: 'Yesterday, 05:10 PM', distance: 7.3, route: 'Mountain Path', completion: 100 },
  { id: '5', bikeId: 'BK-1004', startTime: 'Yesterday, 01:15 PM', endTime: 'Yesterday, 02:00 PM', distance: 3.9, route: 'City Center', completion: 100 },
  { id: '6', bikeId: 'BK-1001', startTime: 'Yesterday, 10:00 AM', endTime: 'Yesterday, 10:45 AM', distance: 5.2, route: 'Park Loop', completion: 100 },
  { id: '7', bikeId: 'BK-1003', startTime: '2023-05-08, 03:30 PM', endTime: '2023-05-08, 04:15 PM', distance: 4.7, route: 'Lakeside Path', completion: 100 },
  { id: '8', bikeId: 'BK-1005', startTime: '2023-05-08, 01:00 PM', endTime: '2023-05-08, 01:40 PM', distance: 3.5, route: 'University Route', completion: 100 },
  { id: '9', bikeId: 'BK-1002', startTime: '2023-05-08, 09:15 AM', endTime: '2023-05-08, 10:00 AM', distance: 4.8, route: 'Business District', completion: 100 },
  { id: '10', bikeId: 'BK-1004', startTime: '2023-05-07, 05:30 PM', endTime: '2023-05-07, 06:15 PM', distance: 5.5, route: 'Sunset Boulevard', completion: 100 },
];

const TripHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTrips(MOCK_TRIPS);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 overflow-auto p-4 md:p-6 transition-all ${!isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Trip History</h1>
            
            <div className="flex items-center bg-secondary rounded-md p-1">
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded transition-base ${
                  viewMode === 'table' ? 'bg-card shadow-sm' : ''
                }`}
                onClick={() => setViewMode('table')}
              >
                Table View
              </button>
              <button
                className={`px-3 py-1.5 text-sm font-medium rounded transition-base ${
                  viewMode === 'card' ? 'bg-card shadow-sm' : ''
                }`}
                onClick={() => setViewMode('card')}
              >
                Card View
              </button>
            </div>
          </div>
          
          {viewMode === 'table' ? (
            <TripTable trips={trips} loading={isLoading} />
          ) : (
            <div className="panel">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Trip Cards</h2>
                <div className="relative max-w-xs w-full">
                  <input
                    type="text"
                    placeholder="Search trips..."
                    className="w-full py-2 pl-8 pr-4 rounded-md border border-input bg-background transition-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <svg 
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-40 bg-muted animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TripHistory;
