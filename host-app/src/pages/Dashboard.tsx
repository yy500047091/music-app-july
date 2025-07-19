import { lazy, Suspense } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// Define the props interface
interface RemoteAppProps {
  userRole?: string;
}

// Properly type the lazy import
const RemoteApp = lazy(() => import("remoteMusicApp/App") as Promise<{
  default: React.ComponentType<RemoteAppProps>;
}>);

const Dashboard = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || 'guest';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Music App</Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        }>
          <RemoteApp userRole={userRole} />
        </Suspense>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, bgcolor: 'grey.800', textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Music App
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;