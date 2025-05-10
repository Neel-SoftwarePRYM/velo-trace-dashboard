
import { useState, useEffect } from 'react';

const DashboardCard = ({ title, value, icon, change, trend, loading }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    if (loading) return;
    
    let start = 0;
    const end = parseInt(value);
    const duration = 1500;
    const increment = end / (duration / 16); // 60fps approx
    
    const timer = setInterval(() => {
      start += increment;
      setAnimatedValue(Math.min(Math.round(start), end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, loading]);
  
  const getTrendStyles = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return '';
  };
  
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '';
  };
  
  return (
    <div className="panel transition-base hover:shadow-md animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-secondary rounded-md">
          <span className={`${icon} h-5 w-5`}></span>
        </div>
      </div>
      
      {loading ? (
        <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
      ) : (
        <>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-semibold">{animatedValue}</p>
            {change && (
              <p className={`text-sm ${getTrendStyles()} flex items-center`}>
                {getTrendIcon()} {change}%
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
