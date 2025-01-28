import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Node,
  Panel,
} from 'reactflow';
import { Box, Paper, Typography, IconButton, Tooltip, Stack, Divider, Menu, MenuItem } from '@mui/material';
import { useTeam } from '../context/TeamContext';
import { TeamNode } from '../components/diagrams/TeamNode';
import { UserNode } from '../components/diagrams/UserNode';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  CenterFocusStrong as CenterIcon,
  Info as InfoIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import 'reactflow/dist/style.css';

const nodeTypes = {
  team: TeamNode,
  user: UserNode,
};

const DiagramPage = () => {
  const { teams, users, removeUserFromTeam } = useTeam();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showHelp, setShowHelp] = useState(true);
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    nodeId: string;
    nodeType: 'team' | 'user';
  } | null>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        mouseX: event.clientX,
        mouseY: event.clientY,
        nodeId: node.id,
        nodeType: node.type as 'team' | 'user',
      });
    },
    []
  );

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleMenuAction = useCallback(() => {
    if (!contextMenu) return;

    if (contextMenu.nodeType === 'team') {
      setExpandedTeams(prev => {
        const next = new Set(prev);
        if (next.has(contextMenu.nodeId)) {
          next.delete(contextMenu.nodeId);
        } else {
          next.add(contextMenu.nodeId);
        }
        return next;
      });
    } else if (contextMenu.nodeType === 'user') {
      const user = users.find(u => u.id === contextMenu.nodeId);
      if (user && user.teamId) {
        removeUserFromTeam(user.id, user.teamId);
      }
    }
    handleCloseContextMenu();
  }, [contextMenu, users, removeUserFromTeam]);

  useEffect(() => {
  
    const teamNodes = teams.map((team, index) => ({
      id: team.id,
      type: 'team',
      position: { x: 50, y: index * 150 },
      data: {
        label: team.name,
        description: team.description,
      },
    }));

    const userNodes = users
      .filter(user => user.isActive && (expandedTeams.has(user.teamId) || !user.teamId)) 
      .map((user, index) => ({
        id: user.id,
        type: 'user',
        position: { 
          x: 400, 
          y: teams.findIndex(t => t.id === user.teamId) * 150 + index * 80 
        },
        data: {
          label: user.name,
          role: user.role,
        },
      }));

    const edges = users
      .filter(user => user.isActive && user.teamId && expandedTeams.has(user.teamId))
      .map(user => ({
        id: `${user.teamId}-${user.id}`,
        source: user.teamId,
        target: user.id,
        type: 'smoothstep',
        animated: true,
      }));

    setNodes([...teamNodes, ...userNodes]);
    setEdges(edges);
  }, [teams, users, expandedTeams, setNodes, setEdges]);

  return (
    <Box sx={{ height: 600, bgcolor: '#171717', borderRadius: 0.5, overflow: 'hidden', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Strict}
        onNodeContextMenu={handleContextMenu}
        fitView
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#1e293b" gap={16} />
        
        <Panel position="bottom-right">
          <Paper
            sx={{
              p: 1,
              bgcolor: '#171717',
              borderRadius: 0.5,
              border: '1px solid #414141',
              display: 'flex',
              gap: 1
            }}
          >
            <Tooltip title="Zoom In">
              <IconButton size="small" onClick={() => {}}>
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton size="small" onClick={() => {}}>
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Center View">
              <IconButton size="small" onClick={() => {}}>
                <CenterIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title={showHelp ? "Hide Help" : "Show Help"}>
              <IconButton size="small" onClick={() => setShowHelp(!showHelp)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Panel>

        {showHelp && (
          <Panel position="top-left">
            <Paper
              sx={{
                p: 2,
                bgcolor: '#171717',
                borderRadius: 0.5,
                border: '1px solid #414141',
                maxWidth: 300
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1, color: '#f1f5f9' }}>
                    <InfoIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Team Structure Diagram
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Right-click on teams to show/hide members, or on users to remove them from teams.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    • Right-click on teams to expand/collapse
                    <br />
                    • Right-click on users to remove from team
                    <br />
                    • Use mouse wheel to zoom
                    <br />
                    • Drag to pan the view
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Panel>
        )}

ü        <Menu
          open={contextMenu !== null}
          onClose={handleCloseContextMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          PaperProps={{
            sx: {
              minWidth: 200,
              backgroundColor: '#171717',
              border: '1px solid #414141',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }
          }}
        >
          <MenuItem 
            onClick={handleMenuAction}
            sx={{
              gap: 1.5,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
              }
            }}
          >
            {contextMenu?.nodeType === 'team' ? (
              <>
                {expandedTeams.has(contextMenu.nodeId) ? (
                  <>
                    <GroupsIcon fontSize="small" sx={{ color: '#3b82f6' }} />
                    <Box>
                      <Typography variant="body2">Hide Team Members</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        Collapse team structure
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <GroupsIcon fontSize="small" sx={{ color: '#3b82f6' }} />
                    <Box>
                      <Typography variant="body2">Show Team Members</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        Expand team structure
                      </Typography>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <>
                <PersonIcon fontSize="small" sx={{ color: '#ef4444' }} />
                <Box>
                  <Typography variant="body2">Remove from Team</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    User will be unassigned
                  </Typography>
                </Box>
              </>
            )}
          </MenuItem>
        </Menu>
      </ReactFlow>
    </Box>
  );
};

export default DiagramPage; 