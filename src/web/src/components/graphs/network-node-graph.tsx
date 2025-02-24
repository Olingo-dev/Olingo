import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
 
function NetworkNodeGraph() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow>
        <Background />
        <Controls className='bg-sidebar'/>
      </ReactFlow>
    </div>
  );
}
 
export default NetworkNodeGraph;