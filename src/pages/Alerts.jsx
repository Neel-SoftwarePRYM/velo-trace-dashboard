
import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import AlertCard from '../components/AlertCard';
import { useIsMobile } from '../hooks/use-mobile';

// Mock alerts data
const MOCK_ALERTS = [
  {
    id: '1',
    title: 'Low Battery Alert',
    bikeId: 'BK-1002',
    time: 'Today, 12:45 PM',
    description: 'Bike battery level is below 20%. Consider charging or replacing soon.',
    severity: 'medium',
    category: 'maintenance',
  },
  {
    id: '2',
    title: 'Unauthorized Movement',
    bikeId: 'BK-1005',
    time: 'Today, 11:30 AM',
    description: 'Bike movement detected outside of permitted zone. Please check bike location immediately.',
    severity: 'high',
    category: 'security',
  },
  {
    id: '3',
    title: 'Maintenance Reminder',
    bikeId: 'BK-1001',
    time: 'Today, 10:15 AM',
    description: 'Routine maintenance due in 3 days. Schedule service appointment.',
    severity: 'low',
    category: 'maintenance',
  },
  {
    id: '4',
    title: 'Tire Pressure Warning',
    bikeId: 'BK-1003',
    time: 'Yesterday, 4:20 PM',
    description: 'Front tire pressure is low. Check and inflate as needed.',
    severity: 'medium',
    category: 'maintenance',
  },
  {
    id: '5',
    title: 'Speed Limit Exceeded',
    bikeId: 'BK-1004',
    time: 'Yesterday, 2:35 PM',
    description: 'Bike exceeded maximum speed limit of 25 km/h. Current speed was 29 km/h.',
    severity: 'low',
    category: 'usage',
  },
  {
    id: '6',
    title: 'Connection Lost',
    bikeId: 'BK-1006',
    time: 'Yesterday, 10:10 AM',
    description: 'Lost connection with bike tracker. Last known location: Downtown Area.',
    severity: 'high',
    category: 'system',
  },
];

const Alerts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: 'all',
    severity: 'all',
    category: 'all',
  });
  
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setAlerts(MOCK_ALERTS);
      setFilteredAlerts(MOCK_ALERTS);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (alerts.length === 0) return;
    
    let filtered = [...alerts];
    
    if (filters.date === 'today') {
      filtered = filtered.filter(alert => alert.time.includes('Today'));
    } else if (filters.date === 'yesterday') {
      filtered = filtered.filter(alert => alert.time.includes('Yesterday'));
    }
    
    if (filters.severity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filters.severity);
    }
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(alert => alert.category === filters.category);
    }
    
    setFilteredAlerts(filtered);
  }, [filters, alerts]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 overflow-auto p-4 md:p-6 transition-all ${!isMobile && sidebarOpen ? 'ml-64' : !isMobile ? 'ml-16' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Alerts</h1>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
              
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
                <option value="usage">Usage</option>
                <option value="system">System</option>
              </select>
              
              <button 
                onClick={() => setFilters({ date: 'all', severity: 'all', category: 'all' })}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-base"
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded-md"></div>
              ))}
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="grid gap-4">
              {filteredAlerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          ) : (
            <div className="bg-card border rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 mb-4 bg-secondary rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium">No Alerts Found</h2>
              <p className="text-muted-foreground mt-1">No alerts match your current filter settings.</p>
              <button
                onClick={() => setFilters({ date: 'all', severity: 'all', category: 'all' })}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-base hover:bg-primary/90"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Alerts;
