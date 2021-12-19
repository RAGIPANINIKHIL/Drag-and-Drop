import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarData(props){
  let state = {
    labels: '',
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: '#20639B',
      },
    ]
  }
  state.labels = props && props.rows && props.rows.value;
  state.datasets[0].data = props && props.coloumn && props.coloumn.value;
  state.datasets[0].label =  props && props.coloumn && props.coloumn.name;
  
  console.log(state);
    return (
      <div>
        <Bar
          data={state}
          options={{
            responsive: true,
            plugins:{
            title:{
              text:'bar chart',
              display:true,
              fontSize:20
            },
            legend:{
              display:false,
              position:'right',
            }
          }}}
        />
      </div>
    )
  }
