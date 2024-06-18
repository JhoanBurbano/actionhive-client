// import React from "react";
// import Tree from "react-d3-tree";

// const HierarchicalClusteringGraph = () => {
//   // Datos del dendrograma
//   const treeData = {
//     name: "Root",
//     children: [
//       {
//         name: "Cluster 1",
//         children: [
//           {
//             name: "Proyecto 1",
//             attributes: {
//               fundingCap: 10000,
//               developmentStatus: "En progreso",
//             },
//           },
//           {
//             name: "Proyecto 2",
//             attributes: {
//               fundingCap: 20000,
//               developmentStatus: "Completo",
//             },
//           },
//         ],
//       },
//       {
//         name: "Cluster 2",
//         children: [
//           {
//             name: "Proyecto 3",
//             attributes: {
//               fundingCap: 15000,
//               developmentStatus: "En espera",
//             },
//           },
//           {
//             name: "Proyecto 4",
//             attributes: {
//               fundingCap: 25000,
//               developmentStatus: "En progreso",
//             },
//           },
//         ],
//       },
//     ],
//   };

//   // Estilos personalizados para mostrar ejes
//   const customStyle = {
//     links: {
//       stroke: "#999", // Color de las líneas que representan las conexiones entre nodos
//       strokeWidth: 1, // Ancho de las líneas
//     },
//     nodes: {
//       node: {
//         circle: {
//           stroke: "#ccc", // Color del borde del círculo del nodo
//           strokeWidth: 1, // Ancho del borde
//           fill: "#fff", // Color de fondo del círculo del nodo
//         },
//         name: {
//           fontSize: 12, // Tamaño de fuente del nombre del nodo
//           fill: "#000", // Color del texto del nombre del nodo
//         },
//         attributes: {
//           fontSize: 10, // Tamaño de fuente de los atributos del nodo
//           fill: "#666", // Color del texto de los atributos del nodo
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: "100%", height: "600px" }}>
//       <Tree
//         data={treeData}
//         orientation="vertical"
//         nodeSvgShape={{ shape: "circle", shapeProps: { r: 5 } }}
//         pathFunc="step" // Cambiar la función de renderización del camino para mostrar los ejes x e y
//         styles={customStyle} // Aplicar estilos personalizados
//       />
//     </div>
//   );
// };

// export default HierarchicalClusteringGraph;
