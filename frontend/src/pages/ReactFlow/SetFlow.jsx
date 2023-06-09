import React, { useCallback ,useState,useEffe} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'photoPublication1' },style: { backgroundColor: 'green', color: '#fffff' },},
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'photoPublication2' } ,style: { backgroundColor: '#ff0000', color: '#ffffff' },},
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'photoPublication1' },style: { backgroundColor: 'green', color: '#fffff' },},
  { id: '4', position: { x: 0, y: 300 }, data: { label: 'photoPublication2' } ,style: { backgroundColor: '#ff0000', color: '#ffffff' },},
];
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    data: { label: 'Edge 1 to 2' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    data: { label: 'Edge 2 to 3' },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    data: { label: 'Edge 3 to 4' },
  },
];

export default function SetFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Trigger the click event on the link
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log("Download error:", error);
      });
  };
const imageUrl = "https://th.bing.com/th/id/OIP.DvKic9NKqCyOwHxwaqzi9QHaQE?pid=ImgDet&rs=1";

  return (
    
    <div style={{ width: '100vw', height: '100vh' }}>
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
      <div>
        <br></br>
        <br></br>
        <table class="Download">
  <tr>
    <th>Sr No.</th>
    <th>Document Name</th>
    <th>Download</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Document 1</td>
    <td><button onClick={() => handleDownload(imageUrl, "image.jpg")}>
        Download Image
      </button></td>
  </tr>
  <tr>
    <td>2</td>
    <td>Document 2</td>
    <td><button onClick={() => handleDownload(imageUrl, "image.jpg")}>
        Download Image
      </button></td>
  </tr>
  <tr>
    <td>3</td>
    <td>Document 3</td>
    <td><button onClick={() => handleDownload(imageUrl, "image.jpg")}>
        Download Image
      </button></td>
  </tr>
</table>
<br></br>
<br></br>
      </div>
    </div>
  );
}