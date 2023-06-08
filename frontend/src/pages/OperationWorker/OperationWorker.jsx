import React from 'react';
import { ReactFlowProvider, ReactFlow, MiniMap, Controls } from 'reactflow';

const OperationWorker = () => {
  const elements = [
    { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
    { id: '2', type: 'default', data: { label: 'Process 1' }, position: { x: 100, y: 100 } },
    { id: '3', type: 'default', data: { label: 'Process 2' }, position: { x: 400, y: 100 } },
    { id: '4', type: 'default', data: { label: 'Process 3' }, position: { x: 250, y: 200 } },
    { id: '5', type: 'output', data: { label: 'End' }, position: { x: 250, y: 350 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
  ];

  return (
    <div style={{ height: '600px' }}>
      <ReactFlowProvider>
        <ReactFlow elements={elements}>
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default OperationWorker;
