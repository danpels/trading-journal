import React from 'react';
import { Typography, Paper } from '@mui/material';

function PerformanceAnalytics({ trades }) {
  const totalPL = Object.values(trades).reduce((sum, trade) => sum + trade.pl, 0);
  const totalTrades = Object.values(trades).reduce((sum, trade) => sum + trade.numTrades, 0);
  const winningDays = Object.values(trades).filter(trade => trade.pl > 0).length;
  const losingDays = Object.values(trades).filter(trade => trade.pl < 0).length;

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5">Performance Analytics</Typography>
      <Typography>Total P/L: ${totalPL.toFixed(2)}</Typography>
      <Typography>Total Trades: {totalTrades}</Typography>
      <Typography>Winning Days: {winningDays}</Typography>
      <Typography>Losing Days: {losingDays}</Typography>
    </Paper>
  );
}

export default PerformanceAnalytics;