import React, { useState } from 'react';
import { Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Calendar from './Calendar';
import AddTradeModal from './AddTradeModal';
import TradeStats from './TradeStats';
import CumulativePLGraph from './CumulativePLGraph';
import TradeDataTable from './TradeDataTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
});

function Dashboard() {
  const [trades, setTrades] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleAddTrade = (trade) => {
    setTrades(prevTrades => ({
      ...prevTrades,
      [trade.date]: trade
    }));
    setIsAddModalOpen(false);
  };

  const handleEditTrade = (date, trade) => {
    setSelectedDate(date);
    setSelectedTrade(trade);
    setIsAddModalOpen(true);
  };

  const handleUpdateTrade = (updatedTrade) => {
    setTrades(prevTrades => ({
      ...prevTrades,
      [updatedTrade.date]: updatedTrade
    }));
  };

  const handleDeleteTrade = (date) => {
    setTrades(prevTrades => {
      const newTrades = { ...prevTrades };
      delete newTrades[date];
      return newTrades;
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <TradeStats trades={trades} />
        <Calendar
          trades={trades}
          onEditTrade={handleEditTrade}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <CumulativePLGraph trades={trades} />
        <TradeDataTable trades={trades} onUpdateTrade={handleUpdateTrade} />
        <AddTradeModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedDate(null);
            setSelectedTrade(null);
          }}
          onAddTrade={handleAddTrade}
          onDeleteTrade={handleDeleteTrade}
          initialDate={selectedDate}
          initialTrade={selectedTrade}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;