// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";

// const Bars = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Datos de ejemplo de la clusterización K-Means (sustituye con tus propios datos)
//     const kMeansData = {
//       clusters: [
//         { label: "Cluster 1", values: [10, 20, 30, 40] },
//         { label: "Cluster 2", values: [15, 25, 35, 45] },
//         { label: "Cluster 3", values: [12, 22, 32, 42] },
//       ],
//       categories: ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4"],
//     };

//     // Convertir datos en un formato adecuado para Chart.js
//     const formattedData = {
//       labels: kMeansData.categories,
//       datasets: kMeansData.clusters.map((cluster, index) => ({
//         label: cluster.label,
//         data: cluster.values,
//         backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`, // Color aleatorio para cada cluster
//       })),
//     };

//     setChartData(formattedData);
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "600px" }}>
//       {chartData && (
//         <Bar
//           data={chartData}
//           options={{
//             indexAxis: "x", // Agrupar las barras horizontalmente
//             scales: {
//               x: {
//                 stacked: true, // Apilar las barras
//               },
//               y: {
//                 stacked: true, // Apilar las barras
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Bars;
