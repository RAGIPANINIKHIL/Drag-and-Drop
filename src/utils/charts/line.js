import React from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,LineController, LineElement, PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,LineController, LineElement, PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function LineData (props) {
  let state = {
    labels: '',
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: '#d2143a',
      }
    ]
  }

  state.labels = props && props.rows && props.rows.value;
  state.datasets[0].data = props && props.coloumn && props.coloumn.value;
  state.datasets[0].label =  props && props.coloumn && props.coloumn.name;
  console.log(state)
  
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Line chart',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
