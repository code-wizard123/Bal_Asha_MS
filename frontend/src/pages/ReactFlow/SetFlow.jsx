// import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'reactflow';

// import 'reactflow/dist/style.css';

// const ReactFlowWrapper = () => {
//   const [childDetails, setChildDetails] = useState({});
//   const [actionLeft, setActionLeft] = useState([]);
//   const [initialNodes, setInitialNodes] = useState([]);
  
//   const getChildDetails = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7", {
//         headers: {
//           "Content-type": "application/json",
//         },
//         method: "GET",
//       });

//       const data = await res.json();
//       console.log(data.child);
//       setChildDetails(data);
//       console.log(childDetails);
//       setActionLeft(data.child.actionLeft);
//       console.log(actionLeft);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getChildDetails();
//   }, []);

//   useEffect(() => {
//     setInitialNodes(
//       actionLeft.map((action, index) => ({
//         id: `node-${index}`,
//         position: { x: 0, y: index * 100 },
//         data: { label: action },
//       }))
//     );
//   }, [actionLeft]);

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edges}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//     >
//       <Controls />
//       <MiniMap />
//       <Background variant="dots" gap={12} size={1} />
//     </ReactFlow>
//   );
// }

// export default function SetFlow() {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlowWrapper />
//     </div>
//   );
// }
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';

import 'react-flow-renderer/dist/style.css';

const ReactFlowWrapper = () => {
  const [childDetails, setChildDetails] = useState({});
  const [actionLeft, setActionLeft] = useState([]);
  const [initialNodes, setInitialNodes] = useState([]);

  const getChildDetails = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7",
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "GET",
        }
      );

      const data = await res.json();
      console.log(data.child);
      setChildDetails(data.child);
      setActionLeft(data.child.actionLeft);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getChildDetails();
  }, []);

  useEffect(() => {
    setInitialNodes(
      actionLeft.map((action, index) => ({
        id: `node-${index}`,
        data: { label: action },
        position: { x: 0, y: index * 100 },
      }))
    );
  }, [actionLeft]);

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  const onConnect = useCallback((params) => {
    setEdges((prevEdges) => addEdge(params, prevEdges));
  }, []);

  return (
    <ReactFlow
      elements={nodes.concat(edges)}
      onConnect={onConnect}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default function SetFlow() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowWrapper />
    </div>
  );
}
