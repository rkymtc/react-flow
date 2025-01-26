import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Typography, Paper } from '@mui/material';

interface TeamNodeData {
  label: string;
  description: string;
}

export const TeamNode = memo(({ data }: { data: TeamNodeData }) => (
  <Paper
    elevation={2}
    sx={{
      minWidth: 200,
      bgcolor: 'primary.light',
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
      <Box>
        <Typography variant="subtitle1" color="primary.contrastText" fontWeight="bold">
          {data.label}
        </Typography>
        {data.description && (
          <Typography variant="body2" color="primary.contrastText" sx={{ opacity: 0.8 }}>
            {data.description}
          </Typography>
        )}
      </Box>
      <Handle type="source" position={Position.Right} style={{ opacity: 0.5 }} />
    </Box>
  </Paper>
)); 