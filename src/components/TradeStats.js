import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function TradeStats({ trades }) {
  const tradeValues = Object.values(trades);
  const bestTrade = Math.max(...tradeValues.map(t => t.pl));
  const worstTrade = Math.min(...tradeValues.map(t => t.pl));
  const avgWin = tradeValues.filter(t => t.pl > 0).reduce((sum, t) => sum + t.pl, 0) / tradeValues.filter(t => t.pl > 0).length || 0;
  const avgLoss = tradeValues.filter(t => t.pl < 0).reduce((sum, t) => sum + t.pl, 0) / tradeValues.filter(t => t.pl < 0).length || 0;
  const totalTrades = tradeValues.reduce((sum, t) => sum + t.numTrades, 0);
  const winRate = (tradeValues.filter(t => t.pl > 0).length / tradeValues.length) * 100 || 0;

  const stats = [
    { label: 'Best Trade', value: `$${bestTrade.toFixed(2)}` },
    { label: 'Worst Trade', value: `$${worstTrade.toFixed(2)}` },
    { label: 'Avg. Win', value: `$${avgWin.toFixed(2)}` },
    { label: 'Avg. Loss', value: `$${avgLoss.toFixed(2)}` },
    { label: 'No. of Trades', value: totalTrades },
    { label: 'Win Rate', value: `${winRate.toFixed(2)}%` },
  ];

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
      {stats.map((stat, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Paper style={{ padding: '15px', backgroundColor: '#424242' }}>
            <Typography variant="body2" style={{ color: '#888' }}>{stat.label}</Typography>
            <Typography variant="h6" style={{ color: '#fff' }}>{stat.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default TradeStats;