import { useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
    addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomNodeInput from "./custom-nodes/CustomNodeInput";
import CustomNodeDefault from "./custom-nodes/CustomNodeDefault";
import CustomNodeOutput from "./custom-nodes/CustomNodeOutput";

const checkPosition = (pos) => {
  console.log(pos);
};

const initialNodes = [
  {
    id: "1",
    position: { x: 382, y: 74 },
    data: {
      title: "Node 1",
      text: "comment here",
      click: checkPosition,
      buttonTitle: "click here to check postition",
    },
    type: "customInput",
  },
  {
    id: "2",
    position: { x: 382, y: 290 },
    data: {
      title: "Node 2",
      text: "comment here",
      click: checkPosition,
      buttonTitle: "click here to check postition",
    },
    type: "customDefault",
  },
  {
    id: "3",
    position: { x: 106, y: 500 },
    data: {
      title: "Node 3",
      text: "comment here",
      click: checkPosition,
      buttonTitle: "click here to check postition",
    },
    type: "customOutput",
  },
  {
    id: "4",
    position: { x: 660, y: 500 },
    data: {
      title: "Node 4",
      text: "comment here",
      click: checkPosition,
      buttonTitle: "click here to check postition",
    },
    type: "customOutput",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
];

export default function Flow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      customInput: CustomNodeInput,
      customDefault: CustomNodeDefault,
      customOutput: CustomNodeOutput,
    }),
    []
  );
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}>
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
