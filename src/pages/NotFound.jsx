
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <div className="h-1 w-16 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! We couldn't find the page you were looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md transition-base hover:bg-primary/90"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
