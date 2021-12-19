import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
  );


export default function PieData (props){
  let state = {
    labels: [],
    datasets: [
      {
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: []
      }
    ]
  }
  state.labels = props && props.rows && props.rows.value;
  state.datasets[0].data = props && props.coloumn && props.coloumn.value;
  console.log(state)

    return (
      <div>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'PIE CHART',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />

        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'PIE CHART',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }