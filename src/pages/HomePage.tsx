import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  MenuItem,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
  Assessment as AssessmentIcon,
  Work as WorkIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useTeam } from '../context/TeamContext';
import { NoData } from '../components/common/NoData';
import type { User } from '../context/TeamContext';

interface TeamFormData {
  name: string;
  description: string;
}

interface UserFormData {
  name: string;
  role: string;
  teamId: string;
}

const initialTeamData: TeamFormData = {
  name: '',
  description: '',
};

const initialUserData: UserFormData = {
  name: '',
  role: '',
  teamId: '',
};

export const HomePage = () => {
  const { teams, users, addTeam, addUser, updateUser, removeTeam, removeUserFromTeam } = useTeam();
  const [teamData, setTeamData] = useState<TeamFormData>(initialTeamData);
  const [userData, setUserData] = useState<UserFormData>(initialUserData);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamData.name && teamData.description) {
      addTeam({
        id: crypto.randomUUID(),
        ...teamData,
      });
      setTeamData(initialTeamData);
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.role && userData.teamId) {
      if (editingUserId) {
        updateUser(editingUserId, userData);
        setEditingUserId(null);
      } else {
        addUser({
          id: crypto.randomUUID(),
          ...userData,
          isActive: true,
        });
      }
      setUserData(initialUserData);
    }
  };

  const handleEditUser = (user: User) => {
    setUserData({
      name: user.name,
      role: user.role,
      teamId: user.teamId,
    });
    setEditingUserId(user.id);
  };

  const getTeamStats = () => {
    const totalTeams = teams.length;
    const totalUsers = users.length;
    const unassignedUsers = users.filter(user => !user.teamId).length;
    const roles = [...new Set(users.map(user => user.role))].length;

    return [
      { label: 'Total Teams', value: totalTeams, icon: GroupsIcon, color: '#3b82f6' },
      { label: 'Total Members', value: totalUsers, icon: PeopleIcon, color: '#10b981' },
      { label: 'Unique Roles', value: roles, icon: WorkIcon, color: '#8b5cf6' },
      { label: 'Unassigned', value: unassignedUsers, icon: PersonIcon, color: '#f59e0b' },
    ];
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '40%',
          right: '10%',
          width: '25%',
          height: '25%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            color: '#f1f5f9',
            textAlign: 'center',
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          }}
        >
          Team Management Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {getTeamStats().map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(30, 41, 59, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 0.5,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                    '& .stat-bg': {
                      transform: 'scale(1.2)',
                    },
                  },
                }}
              >
                <Box
                  className="stat-bg"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    background: `radial-gradient(circle at top right, ${stat.color}, transparent 70%)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
                <Stack direction="row" spacing={2} alignItems="center" sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 0.5,
                      background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                      backdropFilter: 'blur(5px)',
                      border: `1px solid ${stat.color}30`,
                    }}
                  >
                    <stat.icon sx={{ fontSize: 24, color: stat.color }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#f1f5f9',
                        mb: 0.5,
                        fontWeight: 600,
                        textShadow: `0 0 20px ${stat.color}40`,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                background: 'rgba(23, 23, 23, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 0.5,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  borderColor: '#3b82f6',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.15)',
                },
              }}
            >
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 0.5,
                      background: 'linear-gradient(135deg, #3b82f620, #3b82f640)',
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    <GroupsIcon sx={{ color: '#3b82f6' }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#f1f5f9',
                      fontWeight: 600,
                      background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Team Management
                  </Typography>
                </Box>

                <form onSubmit={handleTeamSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="Team Name"
                      value={teamData.name}
                      onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
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
                      label="Description"
                      value={teamData.description}
                      onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                      multiline
                      rows={2}
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
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddIcon />}
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
                      Create Team
                    </Button>
                  </Stack>
                </form>

                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {teams.length === 0 ? (
                  <NoData message="No teams created yet" />
                ) : (
                  <List>
                    {teams.map((team) => (
                      <ListItem
                        key={team.id}
                        sx={{
                          background: 'rgba(30, 41, 59, 0.5)',
                          backdropFilter: 'blur(5px)',
                          mb: 1,
                          borderRadius: 0.5,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          pr: 9,
                          '&:hover': {
                            background: 'rgba(30, 41, 59, 0.7)',
                            transform: 'translateX(8px)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#f1f5f9', fontWeight: 500 }}>
                              {team.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                              {team.description}
                            </Typography>
                          }
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          <Tooltip title="Delete Team">
                            <IconButton 
                              onClick={() => removeTeam(team.id)}
                              sx={{
                                color: '#ef4444',
                                '&:hover': {
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  transform: 'rotate(8deg)',
                                },
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                background: 'rgba(23, 23, 23, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 0.5,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                height: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  borderColor: '#3b82f6',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.15)',
                },
              }}
            >
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius:0.5,
                      background: 'linear-gradient(135deg, #3b82f620, #3b82f640)',
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    <PersonIcon sx={{ color: '#3b82f6' }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#f1f5f9',
                      fontWeight: 600,
                      background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    User Management
                  </Typography>
                </Box>

                <form onSubmit={handleUserSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label="User Name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
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
                      value={userData.role}
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
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
                      value={userData.teamId}
                      onChange={(e) => setUserData({ ...userData, teamId: e.target.value })}
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
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                        borderRadius:0.5,
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
                      {editingUserId ? 'Update User' : 'Add User'}
                    </Button>
                  </Stack>
                </form>

                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {users.length === 0 ? (
                  <NoData message="No users added yet" />
                ) : (
                  <List>
                    {users.map((user) => {
                      const team = teams.find(t => t.id === user.teamId);
                      return (
                        <ListItem
                          key={user.id}
                          sx={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            backdropFilter: 'blur(5px)',
                            mb: 1,
                            borderRadius:0.5,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            pr: 12,
                            '&:hover': {
                              background: 'rgba(30, 41, 59, 0.7)',
                              transform: 'translateX(8px)',
                              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography sx={{ color: '#f1f5f9', fontWeight: 500 }}>
                                {user.name}
                              </Typography>
                            }
                            secondary={
                              <Stack direction="row" spacing={1} alignItems="center">
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
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                                  {team?.name || 'Unassigned'}
                                </Typography>
                              </Stack>
                            }
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              right: 8,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              display: 'flex',
                              gap: 1,
                            }}
                          >
                            <Tooltip title="Edit User">
                              <IconButton 
                                onClick={() => handleEditUser(user)}
                                sx={{
                                  color: '#3b82f6',
                                  '&:hover': {
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    transform: 'rotate(8deg)',
                                  },
                                  transition: 'all 0.2s ease',
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove from Team">
                              <IconButton 
                                onClick={() => user.teamId && removeUserFromTeam(user.id, user.teamId)}
                                disabled={!user.teamId}
                                sx={{
                                  color: '#ef4444',
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
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}; 