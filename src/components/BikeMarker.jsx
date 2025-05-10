
const BikeMarker = ({ bike, isSelected, onClick }) => {
  const getPositionStyle = () => {
    // Convert latitude and longitude to percentage for positioning
    // This is just a mock calculation for demo purposes
    const left = ((bike.lng + 74.02) * 100) + '%';
    const top = ((40.735 - bike.lat) * 200) + '%';
    return { left, top };
  };
  
  const getStatusColor = () => {
    switch (bike.status) {
      case 'active':
        return 'bg-green-500';
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };
  
  return (
    <button
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'}`}
      style={getPositionStyle()}
      onClick={onClick}
    >
      <div className={`h-4 w-4 rounded-full ${getStatusColor()} ${isSelected ? 'ring-4 ring-primary/30' : ''}`}>
        <div className={`h-full w-full rounded-full ${bike.status === 'active' ? 'animate-pulse-light' : ''}`}></div>
      </div>
      {isSelected && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card px-2 py-0.5 rounded text-xs shadow whitespace-nowrap font-medium">
          {bike.id}
        </div>
      )}
    </button>
  );
};

export default BikeMarker;
