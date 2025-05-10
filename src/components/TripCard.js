
const TripCard = ({ trip }) => {
  return (
    <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-base">
      <div className="flex justify-between">
        <h3 className="font-semibold">{trip.bikeId}</h3>
        <span className="text-sm text-muted-foreground">{trip.distance} km</span>
      </div>
      
      <div className="mt-2 space-y-1">
        <div className="flex text-sm">
          <span className="text-muted-foreground w-24">Start Time:</span>
          <span>{trip.startTime}</span>
        </div>
        <div className="flex text-sm">
          <span className="text-muted-foreground w-24">End Time:</span>
          <span>{trip.endTime}</span>
        </div>
        <div className="flex text-sm">
          <span className="text-muted-foreground w-24">Route:</span>
          <span>{trip.route}</span>
        </div>
      </div>
      
      <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full" 
          style={{ width: `${Math.min(trip.completion, 100)}%` }}
        ></div>
      </div>
      
      <div className="mt-3 flex justify-end space-x-2">
        <button className="text-sm text-primary hover:underline">Details</button>
      </div>
    </div>
  );
};

export default TripCard;
