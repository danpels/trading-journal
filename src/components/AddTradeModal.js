import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';

function AddTradeModal({ isOpen, onClose, onAddTrade, onDeleteTrade, initialDate, initialTrade }) {
  const [date, setDate] = useState('');
  const [pl, setPL] = useState('');
  const [numTrades, setNumTrades] = useState('');
  const [journal, setJournal] = useState('');

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
    if (initialTrade) {
      setPL(initialTrade.pl.toString());
      setNumTrades(initialTrade.numTrades.toString());
      setJournal(initialTrade.journal || '');
    } else {
      setPL('');
      setNumTrades('');
      setJournal('');
    }
  }, [initialDate, initialTrade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trade = {
      date,
      pl: Number(pl),
      numTrades: Number(numTrades),
      journal,
    };
    onAddTrade(trade);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: '#424242', 
        boxShadow: 24, 
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {initialTrade ? 'Edit Trade' : 'Add New Trade'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="P/L"
            type="number"
            value={pl}
            onChange={(e) => setPL(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Number of Trades"
            type="number"
            value={numTrades}
            onChange={(e) => setNumTrades(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Journal Entry"
            multiline
            rows={4}
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary">
              {initialTrade ? 'Update Trade' : 'Add Trade'}
            </Button>
            {initialTrade && (
              <Button variant="contained" color="error" onClick={() => {
                onDeleteTrade(date);
                onClose();
              }}>
                Delete Trade
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddTradeModal;