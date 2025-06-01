import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { JobsProvider } from './contexts/JobsContext';
import { ComponentsProvider } from './contexts/ComponentsContext'; 
import { initializeData } from './utils/localStorageUtils';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import ComponentsPage from './pages/ComponentsPage'; 
import JobsPage from './pages/JobsPage';
import MaintenanceCalendarPage from './pages/MaintenanceCalendarPage';
import NotificationCenterPage from './pages/NotificationCenterPage';
import Layout from './components/Shared/Layout';


initializeData();

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ships" element={<ShipsPage />} />
        <Route path="ships/:id" element={<ShipDetailPage />} />
        <Route path="components" element={<ComponentsPage />} /> 
        <Route path="jobs" element={<PrivateRoute roles={['Admin', 'Engineer','Engineer']}><JobsPage /></PrivateRoute>} />
        <Route path="calendar" element={<MaintenanceCalendarPage />} />
        <Route path="notifications" element={<NotificationCenterPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <ShipsProvider>
            <ComponentsProvider> 
              <JobsProvider>
                <AppRoutes />
              </JobsProvider>
            </ComponentsProvider>
          </ShipsProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;