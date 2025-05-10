
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useIsMobile } from '../hooks/use-mobile';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');
  
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', icon: 'activity', path: '/dashboard' },
    { name: 'Alerts', icon: 'bell', path: '/alerts' },
    { name: 'Live Map', icon: 'map', path: '/live-map' },
    { name: 'Trip History', icon: 'history', path: '/trip-history' },
  ];

  const navClasses = isOpen 
    ? 'fixed left-0 top-16 bottom-0 w-64 transform translate-x-0 transition-base z-30' 
    : 'fixed left-0 top-16 bottom-0 w-64 transform -translate-x-full md:translate-x-0 md:w-16 transition-base z-30';

  const getLinkClass = (path) => {
    const baseClasses = 'flex items-center px-4 py-3 rounded-lg transition-base';
    const activeClasses = 'bg-primary text-primary-foreground font-medium';
    const inactiveClasses = 'hover:bg-secondary';
    
    return `${baseClasses} ${activeRoute === path ? activeClasses : inactiveClasses}`;
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-20" 
          onClick={toggleSidebar}
        />
      )}
      
      <aside className={`${navClasses} bg-background border-r shadow-sm`}>
        <nav className="h-full p-2 flex flex-col">
          <div className="space-y-1 flex-grow">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={getLinkClass(item.path)}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <span className={`${item.icon} h-5 w-5 mr-3`}></span>
                {(isOpen || !isMobile) && <span>{item.name}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
