import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import axios from 'axios';

import 'reactflow/dist/style.css';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const initialNodes = [
  { id: '1', position: { x: 300, y: 100 }, data: { label: 'photoPublication1' }, style: { backgroundColor: 'green', color: '#fffff' } ,type: 'textUpdater'},
  { id: '2', position: { x: 350, y: 100 }, data: { label: 'photoPublication2' }, style: { backgroundColor: '#ff0000', color: '#ffffff' } },
  { id: '3', position: { x: 400, y: 200 }, data: { label: 'photoPublication1' }, style: { backgroundColor: 'green', color: '#fffff' } },
  { id: '4', position: { x: 450, y: 300 }, data: { label: 'photoPublication2' }, style: { backgroundColor: '#ff0000', color: '#ffffff' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', data: { label: 'Edge 1 to 2' } },
  { id: 'e2-3', source: '2', target: '3', data: { label: 'Edge 2 to 3' } },
  { id: 'e3-4', source: '3', target: '4', data: { label: 'Edge 3 to 4' } },
];

export default function SetFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [documentDetails, setDocumentDetails] = useState([]);
  const [nodeCount, setNodeCount] = useState(initialNodes.length + 1);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    // Fetch the document details
    const fetchDocumentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/admin/process/ActionDone/647db7040174c6bfeb976e05');
        console.log(response.data);
        setDocumentDetails(response.data.actionDoneDetails);
      } catch (error) {
        console.log('Error fetching document details:', error);
      }
    };

    fetchDocumentDetails();
  }, []);

  const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Trigger the click event on the link
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log('Download error:', error);
      });
  };

  const addNode = () => {
    const newNodeId = `node-${nodeCount}`;
    const newNode = {
      id: newNodeId,
      position: { x: 0, y: 0 },
      data: { label: `photoPublication${nodeCount}` },
      style: { backgroundColor: 'red', color: '#fffff' },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNodeCount((prevCount) => prevCount + 1);
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <div>
        <br />
        <br />
        <button onClick={addNode}>Add Node</button>
        {documentDetails.length > 0 ? (
          <table className="Download">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Document Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {documentDetails.map((document, index) => {
                const attributeName = Object.keys(document)[0];
                const attributeValue = document[attributeName].value[0];
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{attributeName}</td>
                    <td>
                      <button onClick={() => handleDownload(attributeValue.url, `${attributeName}_${index + 1}.jpg`)}>
                        Download Image
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Loading document details...</div>
        )}
        <br />
        <br />
      </div>
    </div>
  );
}
