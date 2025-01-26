import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  AccountTree as DiagramIcon,
  PieChart as ChartsIcon,
  People as UsersIcon,
} from '@mui/icons-material';
import { HomePage } from './pages/HomePage';
import DiagramPage from './pages/DiagramPage';
import ChartsPage from './pages/ChartsPage';
import { UsersPage } from './pages/UsersPage';
import { TeamProvider } from './context/TeamContext';

function App() {
  return (
    <TeamProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ bgcolor: '#171717', borderBottom: '1px solid #414141' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#f1f5f9' }}>
              Team Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Dashboard">
                <IconButton 
                  component={Link} 
                  to="/" 
                  sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Team Diagram">
                <IconButton 
                  component={Link} 
                  to="/diagram" 
                  sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}
                >
                  <DiagramIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Team Charts">
                <IconButton 
                  component={Link} 
                  to="/charts" 
                  sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}
                >
                  <ChartsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="User Management">
                <IconButton 
                  component={Link} 
                  to="/users" 
                  sx={{ color: '#94a3b8', '&:hover': { color: '#3b82f6' } }}
                >
                  <UsersIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#242424' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diagram" element={<DiagramPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </Box>
      </Box>
    </TeamProvider>
  );
}

export default App; 