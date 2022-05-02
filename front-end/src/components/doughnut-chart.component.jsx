import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
  const data = {
    datasets: [
      {
        data: props.process,
        backgroundColor: [
          'rgba(214, 48, 49,0.7)',
          'rgba(149, 165, 166,0.7)',
          'rgba(9, 132, 227,0.7)',
          'rgba(39, 174, 96,0.7)',
        ],
        borderColor: [
          'rgba(214, 48, 49,1.0)',
          'rgba(149, 165, 166,1.0)',
          'rgba(9, 132, 227,1.0)',
          'rgba(39, 174, 96,1.0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
