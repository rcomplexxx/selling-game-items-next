// import { useEffect, useState } from 'react';
// import styles from './adminstatistics.module.css'
// import DatePicker from 'react-multi-date-picker';
// import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
// import products from "@/data/products.json";
// import { Line } from 'react-chartjs-2';
// import 'chartjs-adapter-moment';
// import {Chart, LinearScale, PointElement,LineElement , Tooltip, Legend, TimeScale, Filler} from "chart.js"; 



// Chart.register(LinearScale, LineElement , PointElement, Tooltip, Legend, TimeScale, Filler); 

// export default function AdminStatistics(){
//     const [selectedRange, setSelectedRange] = useState([]);
//     const [cashData, setCashData] = useState([]);

//     const [chartData, setChartData] = useState(null);

//     const chartOptions = {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day', // You can change the unit to 'week', 'month', or 'hour' as needed
//           },
//         },
//         y: {
//           beginAtZero: true,
//         },
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         },
//         zoom: {
//           zoom: {
//             wheel: {
//               enabled: true,
//             },
//             pinch: {
//               enabled: true,
//             },
//             mode: 'x',
//           },
//         },
//       },

      
//     };



//     // dataType={}
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await fetch("/api/admincheck", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(
//                 { dataType:"get_order_cash_info" }
//               ),
//             });
      
//             if (response.ok) {
//               const data = await response.json();
             


              
//               const cashInfo = data.data.map(orderInfo => {
//                 const items = JSON.parse(orderInfo.items);
              
//                 let totalPrice=0;
//               items.forEach((item) => {
//                   const product = products.find((p) => p.id === item.id);
                
//                   if (product) {
//                     const price = product.price * parseInt(item.quantity, 10);
//                     totalPrice=totalPrice+price;
//                   }
//                 });
              
//                 return ({createdDate: orderInfo.createdDate, cash: totalPrice})

//               }
//               );
//               setCashData(cashInfo);

//               const chartInfo = [];

//               const startDate = Math.floor(Math.min(
//                 ...cashInfo.map(item => {console.log(item);return item.createdDate})
                
//                 )
//                 );
//               const currentDate = Math.floor(Date.now() / (1000 * 60 * 60 * 24))+1;

//               for ( let i = startDate; i < currentDate; i++){
//                 console.log('dates',new Date(i * 1000 * 60 * 60 * 24));
//                 chartInfo.push({date: i, cash: 0})
//               }

//               cashInfo.map(item=>{
//                const foundItemIndex= chartInfo.findIndex(chartItem=>{return chartItem.date===item.createdDate});
//                if(foundItemIndex != -1)chartInfo[foundItemIndex].cash=chartInfo[foundItemIndex].cash+item.cash;
            
               
//                else    chartInfo.push({date:item.createdDate, cash:item.cash});

               
//               })

                
          
//                 const formattedData = chartInfo.map(item => ({
//                   x: new Date(item.date * 24 * 60 * 60 * 1000),
//                   y: item.cash,
//                 }));
            
//                 // Sorting data based on the date
//                 formattedData.sort((a, b) => a.x - b.x);
            
//                 // Creating datasets for Chart.js
//                 const chartDatasets = [
//                   {
//                     label: 'Money in (without expenses)',
//                     data: formattedData,
//                     fill: "origin",
//                     backgroundColor: 'rgba(21, 23, 27, 0.507)',
//                     borderColor: 'rgba(63, 96, 79, 0.85)',
//                     responsive: true,
//                     tension: 0.1
//                   },
//                 ];
            
              
            
//                 setChartData({
//                   datasets: chartDatasets,
//                 });
  

//               // products
//               // setData(data.data);
//               // initializeData(data.data);
//             } else {
//               throw new Error("Network response was not ok.");
//             }
//           } catch (error) {
//             console.error("There has been a problem with your fetch operation:", error);
//           }
//         };
      
//         fetchData();
//       }, []);







//       const StatField=(period,startPeriod, endPeriod)=>{
        
//         if(!endPeriod){
//           const today = new Date();
//           const unixTimestampInDays = Math.floor(today / 86400000); // Convert milliseconds to days
//           endPeriod= unixTimestampInDays;
//         }
//         if(!startPeriod){
//           if(period=='Today') startPeriod=endPeriod;
//           else if(period=='Last 7 days') startPeriod=endPeriod - 7;
//           else if(period=='Last 30 days') startPeriod=endPeriod - 30;
//           else if(period=='Last 365 days') startPeriod=endPeriod - 365;
//           else if(period=='All time') startPeriod=0;
//         }
//         let orderNumber= 0;
//         let cashEarned= 0;
//         console.log(cashData, startPeriod, endPeriod)
//         if(cashData) {cashData.forEach(info=>{
//             if(info.createdDate>startPeriod && info.createdDate< endPeriod){
//               orderNumber=orderNumber+1;
//               cashEarned=cashEarned+info.cash
//             }
//         });
//         console.log('or', orderNumber)

//         return <div className={styles.saleStat}>
//         <span className={styles.statName}>{period}</span> 
//          <span className={styles.statName}>{orderNumber}</span> 
//         <span className={styles.statName}>${cashEarned}</span> 
//         </div>
//         }
//         return <div className={styles.saleStat}>
//         </div>
        
//       }

//       const CustomPeriodData= ()=>{
//         let orderNumber= 0;
//         let cashEarned= 0;
//         if(selectedRange.length===2) {cashData.forEach(info=>{
//           if(info.createdDate>selectedRange[0] && info.createdDate< selectedRange[1]){
//             orderNumber=orderNumber+1;
//             cashEarned=cashEarned+info.cash
//           }
//       });
//       return {orderNumber, cashEarned}
//       }
//       else{
//         return {orderNumber:'N/A', cashEarned:'N/A'}
//       }
//     };





//     return <div className={styles.saleInfoDiv}>
//     <h2 className={styles.saleInfoTitle}>Sale Information</h2>

// <div className={styles.saleStats}>


//     <div className={styles.saleStat}>
//       <h2>Period</h2>
//       <h2>Number of orders</h2>
//       <h2>Cash Earned</h2>
//       </div>

//       {StatField('Today')}
//       {StatField('Last 7 days')}
//       {StatField('Last 30 days')}
//       {StatField('Last 365 days')}
//       {StatField('All time')}
      
//       <div className={styles.saleStat}>
//     <div className={styles.datePickerWrapper}>



//     <span className={styles.dateRangeLabel}>Pick a date range</span> 
//     <DatePicker range format="DD/MM/YYYY"  className={`bg-dark ${styles.datePicker}`}
//     inputClass={styles.dateInput}
//     onChange={(value) => {
//             if(value.length>1)
//           setSelectedRange([ Math.floor(value[0].valueOf()/ 86400000),  Math.floor(value[1].valueOf()/ 86400000)]);
//         else setSelectedRange([]);
//           }}/>
          
// </div>
// <span className={styles.statName}>{CustomPeriodData().orderNumber}</span> 
//         <span className={styles.statName}>${CustomPeriodData().cashEarned}</span>

// </div>
      
        

    

//     </div>




//     <div className={styles.lineStatsWrapper}>
//       {chartData && (
//         <Line
//           data={chartData}
//           options={chartOptions}
//           width={600}
//           height={400}
//         />
//       )}
//     </div>

//     </div>
// }