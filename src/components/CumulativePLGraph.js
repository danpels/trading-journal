import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CumulativePLGraph({ trades }) {
  const sortedDates = Object.keys(trades).sort();
  const cumulativePL = sortedDates.reduce((acc, date) => {
    const prevTotal = acc.length > 0 ? acc[acc.length - 1] : 0;
    return [...acc, prevTotal + trades[date].pl];
  }, []);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Cumulative P/L',
        data: cumulativePL,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative P/L Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default CumulativePLGraph;