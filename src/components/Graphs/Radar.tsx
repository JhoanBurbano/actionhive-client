// import React, { useEffect, useState } from "react";
// import { Radar } from "react-chartjs-2";

// const KMeansRadarChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Datos de ejemplo de la clusterización K-Means (sustituye con tus propios datos)
//     const kMeansData = {
//       clusters: [
//         {
//           label: "Cluster 1",
//           values: [10, 20, 30, 40, 50], // Ajusta el número de variables según tus datos
//         },
//         {
//           label: "Cluster 2",
//           values: [15, 25, 35, 45, 55], // Ajusta el número de variables según tus datos
//         },
//         {
//           label: "Cluster 3",
//           values: [12, 22, 32, 42, 52], // Ajusta el número de variables según tus datos
//         },
//       ],
//       variables: ["Variable 1", "Variable 2", "Variable 3", "Variable 4", "Variable 5"], // Ajusta el número de variables según tus datos
//     };

//     // Convertir datos en un formato adecuado para Chart.js
//     const formattedData = {
//       labels: kMeansData.variables,
//       datasets: kMeansData.clusters.map((cluster, index) => ({
//         label: cluster.label,
//         data: cluster.values,
//         backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`, // Color aleatorio para cada cluster
//         borderColor: "rgba(0, 0, 0, 1)", // Color del borde
//         borderWidth: 2, // Ancho del borde
//         pointRadius: 4, // Tamaño de los puntos
//       })),
//     };

//     setChartData(formattedData);
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "600px" }}>
//       {chartData && (
//         <Radar
//           data={chartData}
//           options={{
//             elements: {
//               line: {
//                 tension: 0.2, // Curvatura de las líneas
//               },
//             },
//             scales: {
//               r: {
//                 angleLines: {
//                   display: true, // Mostrar líneas de ángulo
//                 },
//                 pointLabels: {
//                   display: true, // Mostrar etiquetas de puntos
//                 },
//                 ticks: {
//                   beginAtZero: true, // Comenzar los ejes en cero
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default KMeansRadarChart;
