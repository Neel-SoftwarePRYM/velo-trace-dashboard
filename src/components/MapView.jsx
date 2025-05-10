import { useRef, useEffect, useState } from 'react';
import BikeMarker from './BikeMarker';

// Mock bike data
const MOCK_BIKES = [
  { id: 'BK-1001', lat: 40.7128, lng: -74.006, status: 'active' },
  { id: 'BK-1002', lat: 40.7228, lng: -74.011, status: 'active' },
  { id: 'BK-1003', lat: 40.7218, lng: -73.996, status: 'inactive' },
  { id: 'BK-1004', lat: 40.7048, lng: -74.009, status: 'warning' },
  { id: 'BK-1005', lat: 40.7328, lng: -73.986, status: 'active' },
];

const MapView = () => {
  const mapRef = useRef(null);
  const [bikes, setBikes] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  
  // Load the map script
  useEffect(() => {
    const loadMapScript = () => {
      // For demo purposes, we'll simulate a map without actually loading an API
      setTimeout(() => {
        setMapLoaded(true);
        setBikes(MOCK_BIKES);
      }, 1000);
    };
    
    loadMapScript();
  }, []);
  
  const handleBikeSelect = (bikeId) => {
    const bike = bikes.find(b => b.id === bikeId);
    setSelectedBike(bike);
  };
  
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-blue-50 dark:from-secondary dark:to-indigo-900/20 rounded-lg">
        {!mapLoaded ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="h-full">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-card p-2 rounded-lg shadow-md z-10 flex space-x-2">
              <button className="p-2 hover:bg-secondary rounded-md transition-base">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="p-2 hover:bg-secondary rounded-md transition-base">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button className="p-2 hover:bg-secondary rounded-md transition-base">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </button>
            </div>
            
            {/* Bike Markers */}
            {bikes.map((bike) => (
              <BikeMarker
                key={bike.id}
                bike={bike}
                isSelected={selectedBike?.id === bike.id}
                onClick={() => handleBikeSelect(bike.id)}
              />
            ))}
            
            {/* Bike Selector */}
            <div className="absolute bottom-4 left-4 bg-card p-3 rounded-lg shadow-md z-10 max-w-xs w-full">
              <h3 className="text-sm font-medium mb-2">Tracked Bikes</h3>
              <div className="max-h-32 overflow-y-auto">
                {bikes.map((bike) => (
                  <button
                    key={bike.id}
                    className={`w-full text-left px-2 py-1.5 my-0.5 text-sm rounded-md transition-base flex items-center ${selectedBike?.id === bike.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                    onClick={() => handleBikeSelect(bike.id)}
                  >
                    <div className={`h-2 w-2 rounded-full mr-2 ${bike.status === 'active' ? 'bg-green-500' : bike.status === 'warning' ? 'bg-amber-500' : 'bg-gray-400'}`}></div>
                    {bike.id}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Selected bike info */}
            {selectedBike && (
              <div className="absolute top-4 left-4 bg-card p-3 rounded-lg shadow-md z-10 max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{selectedBike.id}</h3>
                  <button 
                    onClick={() => setSelectedBike(null)}
                    className="text-muted-foreground hover:text-foreground transition-base"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-sm">
                  <p className="mb-1">
                    <span className="text-muted-foreground mr-1">Status:</span>
                    <span className="capitalize">{selectedBike.status}</span>
                  </p>
                  <p className="mb-1">
                    <span className="text-muted-foreground mr-1">Location:</span>
                    {selectedBike.lat.toFixed(4)}, {selectedBike.lng.toFixed(4)}
                  </p>
                </div>
                <div className="mt-2">
                  <button className="w-full bg-primary text-primary-foreground text-sm py-1.5 rounded-md transition-base hover:bg-primary/90">
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
