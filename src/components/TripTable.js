
import { useState } from 'react';

const TripTable = ({ trips, loading }) => {
  const [sortField, setSortField] = useState('startTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 5;
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredTrips = trips.filter(trip => 
    trip.bikeId.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trip.route.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'distance') {
      comparison = a.distance - b.distance;
    } else if (sortField === 'startTime' || sortField === 'endTime') {
      comparison = new Date(a[sortField]) - new Date(b[sortField]);
    } else {
      comparison = a[sortField] > b[sortField] ? 1 : -1;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const totalPages = Math.ceil(sortedTrips.length / itemsPerPage);
  const currentTrips = sortedTrips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };
  
  return (
    <div className="panel">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-medium">Trip History</h2>
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search trips..."
            className="w-full py-2 pl-8 pr-4 rounded-md border border-input bg-background transition-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
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
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-secondary">
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('bikeId')}
              >
                <div className="flex items-center">
                  Bike ID
                  {renderSortIcon('bikeId')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('startTime')}
              >
                <div className="flex items-center">
                  Start Time
                  {renderSortIcon('startTime')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('endTime')}
              >
                <div className="flex items-center">
                  End Time
                  {renderSortIcon('endTime')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('distance')}
              >
                <div className="flex items-center">
                  Distance
                  {renderSortIcon('distance')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Route
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-5 bg-muted animate-pulse rounded w-16"></div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-5 bg-muted animate-pulse rounded w-24"></div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-5 bg-muted animate-pulse rounded w-24"></div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-5 bg-muted animate-pulse rounded w-12"></div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="h-5 bg-muted animate-pulse rounded w-20"></div>
                  </td>
                </tr>
              ))
            ) : currentTrips.length > 0 ? (
              currentTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-secondary/50 transition-base">
                  <td className="px-4 py-3 whitespace-nowrap font-medium">{trip.bikeId}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{trip.startTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{trip.endTime}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{trip.distance} km</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="mr-2">{trip.route}</span>
                      <button className="text-primary hover:underline text-sm">View</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                  No trips found for your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredTrips.length)} of {filteredTrips.length} trips
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-secondary transition-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-secondary transition-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripTable;
