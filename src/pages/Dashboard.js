
import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import { useIsMobile } from '../hooks/use-mobile';

// Mock data for cards
const MOCK_STATS = [
  { id: 'total-bikes', title: 'Total Bikes', value: '48', icon: 'activity', change: '+12', trend: 'up' },
  { id: 'active-trips', title: 'Active Trips', value: '16', icon: 'map', change: '+5', trend: 'up' },
  { id: 'alerts-today', title: 'Alerts Today', value: '7', icon: 'bell', change: '-3', trend: 'down' },
  { id: 'distance', title: 'Distance Covered (km)', value: '1,248', icon: 'history' },
];

// Mock data for recent trips
const MOCK_RECENT_TRIPS = [
  { id: '1', bikeId: 'BK-1001', startTime: '10:30 AM', endTime: '11:15 AM', distance: '5.8', route: 'Downtown Loop', completion: 100 },
  { id: '2', bikeId: 'BK-1003', startTime: '09:45 AM', endTime: '10:30 AM', distance: '4.2', route: 'River Trail', completion: 100 },
  { id: '3', bikeId: 'BK-1005', startTime: '08:15 AM', endTime: '09:00 AM', distance: '6.1', route: 'Hillside Route', completion: 100 },
];

// Mock data for active trips
const MOCK_ACTIVE_TRIPS = [
  { id: '4', bikeId: 'BK-1002', startTime: '11:00 AM', endTime: '--', distance: '2.4', route: 'Mountain Path', completion: 45 },
  { id: '5', bikeId: 'BK-1004', startTime: '11:15 AM', endTime: '--', distance: '1.8', route: 'City Center', completion: 30 },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [activeTrips, setActiveTrips] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
      setRecentTrips(MOCK_RECENT_TRIPS);
      setActiveTrips(MOCK_ACTIVE_TRIPS);
      setIsLoading(false);
    }, 1200);
    
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
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <DashboardCard 
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                trend={stat.trend}
                loading={isLoading}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="panel">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Bike Activity</h2>
                  <div className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                    Today
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="h-64 bg-muted/30 animate-pulse rounded-md"></div>
                ) : (
                  <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-indigo-900/30 rounded-md p-4">
                    <div className="flex justify-center items-center h-full text-muted-foreground">
                      [Activity Chart Placeholder]
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="panel">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Active Trips</h2>
                  <button className="text-sm text-primary hover:underline">
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {isLoading ? (
                    Array(2).fill(0).map((_, i) => (
                      <div key={i} className="h-24 bg-muted animate-pulse rounded-md"></div>
                    ))
                  ) : activeTrips.length > 0 ? (
                    activeTrips.map(trip => (
                      <div key={trip.id} className="border rounded-lg p-3 hover:shadow-sm transition-base">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{trip.bikeId}</h3>
                            <p className="text-sm text-muted-foreground">{trip.route}</p>
                          </div>
                          <div className="bg-accent/60 px-2 py-0.5 rounded text-xs font-medium text-accent-foreground">Live</div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="text-xs text-muted-foreground">Trip Progress</div>
                          <div className="mt-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full animate-pulse-light" 
                              style={{ width: `${trip.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No active trips at the moment
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="panel">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recent Trips</h2>
                <button 
                  className="text-sm text-primary hover:underline"
                  onClick={() => window.location.href = '/trip-history'}
                >
                  View History
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Bike ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        End Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Distance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Route
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-border">
                    {isLoading ? (
                      Array(3).fill(0).map((_, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-muted animate-pulse rounded w-16"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-muted animate-pulse rounded w-12"></div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
                          </td>
                        </tr>
                      ))
                    ) : recentTrips.length > 0 ? (
                      recentTrips.map(trip => (
                        <tr key={trip.id} className="hover:bg-secondary/50 transition-base">
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{trip.bikeId}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{trip.startTime}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{trip.endTime}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{trip.distance} km</td>
                          <td className="px-4 py-3 whitespace-nowrap">{trip.route}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                          No recent trips found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
