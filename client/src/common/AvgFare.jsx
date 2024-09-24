import React from 'react';
import { Info } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

const AvgFare = () => {
  return (
    <Box display="flex" alignItems="center" spacing={1}>
      <Info style={{ color: "#74C0FC", fontSize: '24px' }} />
      <Typography variant="body1" color="textPrimary">
        Avg Fare:
      </Typography>
      <Typography variant="h6" color="textPrimary" fontWeight="bold">
        $200
      </Typography>
    </Box>
  );
};

export default AvgFare;
