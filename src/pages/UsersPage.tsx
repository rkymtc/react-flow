import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useTeam } from '../context/TeamContext';

interface UserDialogData {
  name: string;
  role: string;
  teamId: string;
}

const initialDialogData: UserDialogData = {
  name: '',
  role: '',
  teamId: '',
};

export const UsersPage = () => {
  const { users, teams, addUser, updateUser, removeUserFromTeam, toggleUserStatus, deleteUser } = useTeam();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<UserDialogData>(initialDialogData);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleOpenDialog = (userId?: string) => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        setDialogData({
          name: user.name,
          role: user.role,
          teamId: user.teamId || '',
        });
        setEditingUserId(userId);
      }
    } else {
      setDialogData(initialDialogData);
      setEditingUserId(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogData(initialDialogData);
    setEditingUserId(null);
  };

  const handleSave = () => {
    if (editingUserId) {
      updateUser(editingUserId, dialogData);
    } else {
      addUser({
        id: crypto.randomUUID(),
        ...dialogData,
        isActive: true,
      });
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#f1f5f9' }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            borderRadius: 0.5,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: '#171717', 
          borderRadius: 0.5, 
          border: '1px solid #414141',
          background: 'rgba(23, 23, 23, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #414141' }}>Name</TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #414141' }}>Role</TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #414141' }}>Team</TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #414141' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map(user => {
              const team = teams.find(t => t.id === user.teamId);
              return (
                <TableRow 
                  key={user?.id} 
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'rgba(59, 130, 246, 0.08)',
                      '& .MuiIconButton-root': {
                        opacity: 1,
                      },
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <TableCell 
                    sx={{ 
                      color: '#f1f5f9', 
                      borderBottom: '1px solid #414141',
                    
                     
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell sx={{ color: '#f1f5f9', borderBottom: '1px solid #414141' }}>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2))',
                        color: '#3b82f6',
                        borderRadius: 0.5,
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#f1f5f9', borderBottom: '1px solid #414141' }}>
                    {team?.name || 'Unassigned'}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #414141' }}>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit User">
                        <IconButton 
                          size="small" 
                          onClick={() => handleOpenDialog(user.id)}
                          sx={{
                            color: '#3b82f6',
                            opacity: 0.7,
                            '&:hover': {
                              background: 'rgba(59, 130, 246, 0.1)',
                              transform: 'rotate(8deg)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={user.isActive ? "Deactivate User" : "Activate User"}>
                        <IconButton 
                          size="small"
                          onClick={() => toggleUserStatus(user.id)}
                          sx={{
                            color: user.isActive ? '#10b981' : '#94a3b8',
                            opacity: 0.7,
                            '&:hover': {
                              background: user.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                              transform: 'rotate(8deg)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <PersonIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove from Team">
                        <IconButton 
                          size="small"
                          onClick={() => user.teamId && removeUserFromTeam(user.id, user.teamId)}
                          disabled={!user.teamId}
                          sx={{
                            color: '#ef4444',
                            opacity: 0.7,
                            '&:hover': {
                              background: 'rgba(239, 68, 68, 0.1)',
                              transform: 'rotate(8deg)',
                            },
                            '&.Mui-disabled': {
                              color: 'rgba(239, 68, 68, 0.4)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton 
                          size="small"
                          onClick={() => deleteUser(user.id)}
                          sx={{
                            color: '#dc2626',
                            opacity: 0.7,
                            '&:hover': {
                              background: 'rgba(220, 38, 38, 0.1)',
                              transform: 'rotate(8deg)',
                            },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: '#171717',
            backgroundImage: 'none',
            border: '1px solid #414141',
            background: 'rgba(23, 23, 23, 0.9)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#f1f5f9' }}>
          {editingUserId ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2, minWidth: 300 }}>
            <TextField
              label="Name"
              value={dialogData.name}
              onChange={(e) => setDialogData({ ...dialogData, name: e.target.value })}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(5px)',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#f1f5f9',
                },
              }}
            />
            <TextField
              label="Role"
              value={dialogData.role}
              onChange={(e) => setDialogData({ ...dialogData, role: e.target.value })}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(5px)',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#f1f5f9',
                },
              }}
            />
            <TextField
              select
              label="Team"
              value={dialogData.teamId}
              onChange={(e) => setDialogData({ ...dialogData, teamId: e.target.value })}
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(5px)',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                },
                '& .MuiOutlinedInput-input': {
                  color: '#f1f5f9',
                },
                '& .MuiMenuItem-root': {
                  color: '#f1f5f9',
                },
              }}
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ 
              color: '#94a3b8',
              '&:hover': {
                background: 'rgba(148, 163, 184, 0.1)',
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              borderRadius: 0.5,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {editingUserId ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 