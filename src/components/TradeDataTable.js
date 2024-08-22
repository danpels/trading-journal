import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

function TradeDataTable({ trades, onUpdateTrade }) {
  const [editingTrade, setEditingTrade] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (trade) => {
    setEditingTrade(trade.date);
    setEditData(trade);
  };

  const handleSave = () => {
    onUpdateTrade(editData);
    setEditingTrade(null);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>P/L</TableCell>
            <TableCell>Number of Trades</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Open Time</TableCell>
            <TableCell>AVG Entry</TableCell>
            <TableCell>Bias</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Close Time</TableCell>
            <TableCell>AVG Close</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(trades).map(([date, trade]) => (
            <TableRow key={date}>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.date} onChange={(e) => handleChange('date', e.target.value)} /> : 
                trade.date}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField type="number" value={editData.pl} onChange={(e) => handleChange('pl', Number(e.target.value))} /> : 
                trade.pl}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField type="number" value={editData.numTrades} onChange={(e) => handleChange('numTrades', Number(e.target.value))} /> : 
                trade.numTrades}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.symbol} onChange={(e) => handleChange('symbol', e.target.value)} /> : 
                trade.symbol}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField type="number" value={editData.volume} onChange={(e) => handleChange('volume', Number(e.target.value))} /> : 
                trade.volume}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.openTime} onChange={(e) => handleChange('openTime', e.target.value)} /> : 
                trade.openTime}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField type="number" value={editData.avgEntry} onChange={(e) => handleChange('avgEntry', Number(e.target.value))} /> : 
                trade.avgEntry}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.bias} onChange={(e) => handleChange('bias', e.target.value)} /> : 
                trade.bias}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.duration} onChange={(e) => handleChange('duration', e.target.value)} /> : 
                trade.duration}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField value={editData.closeTime} onChange={(e) => handleChange('closeTime', e.target.value)} /> : 
                trade.closeTime}
              </TableCell>
              <TableCell>{editingTrade === date ? 
                <TextField type="number" value={editData.avgClose} onChange={(e) => handleChange('avgClose', Number(e.target.value))} /> : 
                trade.avgClose}
              </TableCell>
              <TableCell>
                {editingTrade === date ? 
                  <Button onClick={handleSave}>Save</Button> : 
                  <Button onClick={() => handleEdit(trade)}>Edit</Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TradeDataTable;