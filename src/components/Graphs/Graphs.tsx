// import { CategoryScale } from "chart.js";
// import Chart from "chart.js/auto";
// import { useState } from "react";
// import { Pie, Scatter } from "react-chartjs-2";

// Chart.register(CategoryScale);

// const Graphs = () => {
//     const Data = [
//         {
//           id: 1,
//           year: 2016,
//           userGain: 80000,
//           userLost: 823
//         },
//         {
//           id: 2,
//           year: 2017,
//           userGain: 45677,
//           userLost: 345
//         },
//         {
//           id: 3,
//           year: 2018,
//           userGain: 78888,
//           userLost: 555
//         },
//         {
//           id: 4,
//           year: 2019,
//           userGain: 90000,
//           userLost: 4555
//         },
//         {
//           id: 5,
//           year: 2020,
//           userGain: 4300,
//           userLost: 234
//         }
//       ];

//       const [chartData, setChartData] = useState(
//         {
//         labels: Data.map((data) => data.year),
//         datasets: [
//           {
//             label: "Users Gained ",
//             data: Data.map((data) => data.userGain),
//             backgroundColor: [
//               "rgba(75,192,192,1)",
//               "#ecf0f1",
//               "#50AF95",
//               "#f3ba2f",
//               "#2a71d0"
//             ],
//             borderColor: "black",
//             borderWidth: 2
//           }
//         ]
//       }
//       );

//   return (
// <div className="chart-container" style={{width: '50%', margin: '0 auto'}}>
//       <Scatter
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: "Grafica de Aspersion",
//               fullSize: true,
//               font: {
//                 size: 40
//               }
//             },
//             decimation:{
//                 enabled:true
//             }
//           }
//         }}
//       />
//     </div>
//   )
// }

// export default Graphs
import Chart, { CategoryScale } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import HierarchicalGraph from "./Hierarchical";
import Bars from "./Bars";
import Radar from "./Radar";

Chart.register(CategoryScale);

const ScatterPlot = () => {

    const [data, setData] = useState<any>({
        datasets: [
          {
            label: "Cluster 1",
            data: [],
            backgroundColor: "rgba(255, 0, 0, 0.9)",
          },
          {
            label: "Cluster 2",
            data: [],
            backgroundColor: "rgba(0, 255, 0, 0.9)",
          },
          {
            label: "Cluster 3",
            data: [],
            backgroundColor: "rgba(0, 0, 255, 0.9)",
          },
      {
        label: 'Centroids',
        data: [],
        backgroundColor: 'rgba(0, 0, 0, 1)',
        pointRadius: 10,
        pointStyle: 'triangle',
      },
        ],
      })

  const [clusters, setClusters] = useState<any>([]);

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
        const _data = data;
      const response = await (await fetch("http://localhost:3000/")).json();
      setClusters(response.clusters);
      response.clusters.projects.forEach((project: any) => {
        const clusterData = {
          x: project.fundingCap,
          y: project.developmentStatus,
          title: project.projectName,
        };
        _data.datasets[project.cluster].data.push(clusterData);
      });

        response.clusters.centroids.forEach((centroid: any) => {
            const centroidData = {
            x: centroid[0],
            y: centroid[1],
            };
            _data.datasets[3].data.push(centroidData);
        });

      console.log('data :>> ', _data);
      setData(_data);
    }
    fetchData();
  }, []);

  // Extracting data from API response

  if(!clusters || !clusters.centroids) return <div>Loading...</div>

  return (
    <div style={{ width: "50%", content: clusters.length }}>
      <Scatter
        data={data}
        options={{
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              type: "linear",
              position: "left",
              min: 0,
              max: 1,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context: any) {
                  return context.dataset.data[context.dataIndex].title; // Mostrar el título del proyecto como etiqueta
                }
              }
            }
          },
        }}
      />
      <Radar/>
      <HierarchicalGraph />
      <Bars />
    </div>
  );
};

export default ScatterPlot;
