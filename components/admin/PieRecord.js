import React from 'react'
import {useDispatch,useSelector}  from "react-redux"
import CountUp from "react-countup"
import { Pie, defaults } from 'react-chartjs-2'
import {BsBell,BsHandbag,BsCartCheck} from "react-icons/bs"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {BiRupee} from "react-icons/bi"
import {RiBillLine} from "react-icons/ri"

import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const PieRecord = ({pieLabel,pieData}) => {
    return (
      <div className="mt-8">
      <h4 className="text-center text-gray-700">Best 5 product of Sales</h4>
      <div className="mt-2">

   <Pie
     data={{
       labels:pieLabel,
       datasets: [
         {
           label: 'Best 5 product of Sales',
           data:pieData,
           backgroundColor: [
             'rgba(255, 99, 132, 0.6)',
             'rgba(54, 162, 235, 0.6)',
             'rgba(255, 206, 86, 0.6)',
             'rgba(200, 2, 192, 0.6)',
             'rgba(40, 202, 5, 0.6)',
             'rgba(255,0,4, 0.6)',
           ],
           borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(200, 2, 192,1)',
             'rgba(40, 202, 5, 0.6)',
             'rgba(255,0,4,1)',
           ],
           borderWidth: 1,
         },
         // {
         //   label: 'Quantity',
         //   data: [47, 52, 67, 58, 9, 50],
         //   backgroundColor: 'orange',
         //   borderColor: 'red',
         // },
       ],
     }}
     height={400}
     width={600}
     options={{
       maintainAspectRatio: false,
       scales: {
         yAxes: [
           {
             ticks: {
               beginAtZero: true,
             },
           },
         ],
       },
       legend: {
         labels: {
           fontSize: 25,
         },
       },
     }}
   />
 </div>
 </div>
    )
}

export default PieRecord
