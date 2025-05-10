
import { useState } from 'react';

const AlertCard = ({ alert }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="border rounded-lg bg-card transition-base hover:shadow-md">
      <div 
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${getSeverityStyle(alert.severity)}`}></div>
          <div>
            <h3 className="font-medium">{alert.title}</h3>
            <p className="text-sm text-muted-foreground">{alert.bikeId} • {alert.time}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-base">
          <svg
            className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t mt-1 text-sm">
          <p>{alert.description}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs font-medium transition-base hover:bg-primary/90">
              View Details
            </button>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium transition-base hover:bg-secondary/90">
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertCard;
