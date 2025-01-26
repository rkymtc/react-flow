import React from 'react';
import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface NoDataProps {
  message?: string;
}

export const NoData: React.FC<NoDataProps> = ({ message = 'No data available' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        background: 'rgba(30, 41, 59, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: 0.5,
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          opacity: 0.5,
          transition: 'transform 0.3s ease',
        },
        '&:hover::before': {
          transform: 'scale(1.2)',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2))',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          mb: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1) rotate(5deg)',
          },
        }}
      >
        <InboxOutlined
          sx={{
            fontSize: 48,
            color: '#3b82f6',
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))',
          }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: '#94a3b8',
          textAlign: 'center',
          fontWeight: 500,
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}; 