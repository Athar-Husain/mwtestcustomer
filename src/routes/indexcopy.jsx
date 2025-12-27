import { useRoutes, Navigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

export default function ThemeRoutes() {
  const logged = true; // Hardcoded login flag, change based on actual authentication logic

  // Define routes for authenticated users
  if (logged) {
    // If logged in, serve main routes
    const routes = [
      ...MainRoutes.children,  // Include main routes for logged-in users
      {
        path: '*',
        element: <Navigate to="/" replace /> // Redirect to landing if route not found
      }
    ];
    return useRoutes(routes);
  } else {
    // Not logged in, serve public routes and auth routes
    const publicRoutes = MainRoutes.children.filter(
      route => route.path === '/' || 
               route.path === '/about' || 
               route.path === '/contact' || 
               route.path === '/faq' ||
               route.path === '/pricing' ||
               route.path === '/terms'
    );

    const routes = [
      ...publicRoutes,  // Public routes accessible to both logged-in and non-logged-in users
      ...AuthenticationRoutes,  // Authentication-related routes
      {
        path: '*',
        element: <Navigate to="/application/login" replace /> // Redirect unmatched routes to login
      }
    ];
    return useRoutes(routes);
  }
}
