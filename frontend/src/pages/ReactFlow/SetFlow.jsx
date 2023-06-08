import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

// function FindNodes() {
//   const [childDetails, setChildDetails] = useState({});

//   // useEffect(() => {
//     const getChildDetails = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7"
//         );
//         setChildDetails(response.data.child);
//       } catch (error) {
//         console.log("API request error:", error);
//       }
//     };

//     getChildDetails();
//   // }, []);

//   const { actionLeft } = childDetails;
//   console.log(childDetails);
//   const initialNodes = actionLeft.map((action, index) => ({
//     id: `node-${index}`,
//     position: { x: 0, y: index * 100 },
//     data: { label: action },
//   }));

//   return (
//     <div>
//       {initialNodes.map((node) => (
//         <div key={node.id}>{node.data.label}</div>
//       ))}
//     </div>
//   );
// }

const ReactFlowWrapper = () => {
  const [childDetails, setChildDetails] = useState(
    {
    "success": true,
    "child": {
        "_id": "64804f46bfe26d82fa5047a7",
        "name": "Venom15",
        "category": 2,
        "keyCase": "A 6 year old boy with brown hair and black eyes",
        "DateOfBirth": "2010-11-02T18:30:00.000Z",
        "familyDetails": "No details of the family known",
        "gender": "Male",
        "CCI": [
            {
                "name": "Rahul's Orphanage",
                "pinCode": 400053,
                "CCIdescription": "This is an orphanage for the blind",
                "public_id": "xn7v9ase1sth7jjqnmcl",
                "url": "http://res.cloudinary.com/dmomonuiu/image/upload/v1686130393/xn7v9ase1sth7jjqnmcl.jpg",
                "_id": "64804f46bfe26d82fa5047a8"
            }
        ],
        "images": [],
        "actionLeft": [
            "photoPublication1",
            "photoPublication2",
            "tvTelecasting",
            "policeReport",
            "previousOrgReport"
        ],
        "__v": 0
    }
}
);

  useEffect(() => {
    const getChildDetails = async () => {
      // try {
      //   const response = await axios.get(
      //     "http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7"
      //   ).then(response =>{
      //     response.json();
      //   }).then(child=>{
      //     console.log(child);
      //     setChildDetails(child);
      //   })
      //   console.log(response.data.child);
      //   const { child } = response.data; // Update the destructuring here
      //   setChildDetails(child);
      // } catch (error) {
      //   console.log("API request error:", error);
      // }
      axios.get(
            "http://localhost:4000/api/v1/groundWorker/childs/64804f46bfe26d82fa5047a7").then(response =>{
          console.log(response.data);
          setChildDetails(response.data);
            })
    };

    getChildDetails();
  }, []);
  const { actionLeft } = childDetails.child;
  // const {actionLeft}=childDetails;
  const initialNodes = actionLeft.map((action, index) => ({
    id: `node-${index}`,
    position: { x: 0, y: index * 100 },
    data: { label: action },
  }));
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}

export default function SetFlow() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* <FindNodes /> */}
      <ReactFlowWrapper />
    </div>
  );
}
