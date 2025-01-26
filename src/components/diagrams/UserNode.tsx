import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Typography, Paper, Avatar } from '@mui/material';

interface UserNodeData {
  label: string;
  role: string;
}

export const UserNode = memo(({ data }: { data: UserNodeData }) => (
  <Paper
    elevation={2}
    sx={{
      minWidth: 200,
      bgcolor: 'secondary.light',
      borderRadius: 0.5,
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme => theme.shadows[4],
      },
    }}
  >
    <Box sx={{ p: 2 }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            width: 40,
            height: 40,
          }}
        >
          {data.label.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" color="secondary.contrastText" fontWeight="bold">
            {data.label}
          </Typography>
          <Typography variant="body2" color="secondary.contrastText" sx={{ opacity: 0.8 }}>
            {data.role}
          </Typography>
        </Box>
      </Box>
      <Handle type="source" position={Position.Right} style={{ opacity: 0.5 }} />
    </Box>
  </Paper>
)); 