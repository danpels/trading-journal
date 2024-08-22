import React from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay } from 'date-fns';

function Calendar({ trades, onEditTrade, currentDate, setCurrentDate }) {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate empty cells before the first day of the month
  const emptyDays = getDay(firstDayOfMonth);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h5">{format(currentDate, 'MMMM yyyy')}</Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <Grid container spacing={1}>
        {daysOfWeek.map((day, index) => (
          <Grid item xs={12/7} key={index}>
            <Typography align="center" variant="subtitle2">{day}</Typography>
          </Grid>
        ))}
        {[...Array(emptyDays)].map((_, index) => (
          <Grid item xs={12/7} key={`empty-${index}`}>
            <Paper style={{ backgroundColor: 'transparent', height: '100px' }} />
          </Grid>
        ))}
        {daysInMonth.map((day) => {
          const dateString = format(day, 'yyyy-MM-dd');
          const trade = trades[dateString];
          const backgroundColor = trade ? (trade.pl >= 0 ? '#4caf50' : '#f44336') : '#0a0a0a';

          return (
            <Grid item xs={12/7} key={dateString}>
              <Paper
                style={{
                  backgroundColor,
                  padding: '10px',
                  height: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                  }
                }}
                onClick={() => onEditTrade(dateString, trade)}
              >
                <Typography variant="h6" style={{ fontSize: '14px', marginBottom: '5px' }}>{format(day, 'd')}</Typography>
                {trade && (
                  <>
                    <Typography variant="h5">${trade.pl}</Typography>
                    <Typography variant="body2">{trade.numTrades} trade(s)</Typography>
                  </>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Calendar;