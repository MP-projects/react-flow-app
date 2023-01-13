import { useCallback, useMemo, useState, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import CustomNodeInput from "./custom-nodes/CustomNodeInput";
import CustomNodeDefault from "./custom-nodes/CustomNodeDefault";
import CustomNodeOutput from "./custom-nodes/CustomNodeOutput";
import SideBar from "./Sidebar.js/Sidebar";
import CustomEdge from "./custom-edges/CustomEdge";

const checkPosition = (pos) => {
  console.log(pos);
};

const getId = () => new Date().getTime().toString();

const initialNodes = [
  {
    id: "1",
    position: { x: 382, y: 74 },
    dragHandle: ".drag-handler",
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
    dragHandle: ".drag-handler",
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
    dragHandle: ".drag-handler",
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
    dragHandle: ".drag-handler",
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
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "custom",
    animated: true,
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "custom",
    animated: true,
  },
];

export default function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge({ ...params, animated: true, type: "custom" }, eds)
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        data: {
          title: "Node",
          text: "comment here",
          click: checkPosition,
          buttonTitle: "click here to check postition",
        },
        id: getId(),
        dragHandle: ".drag-handler",
        type,
        position,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  const nodeTypes = useMemo(
    () => ({
      customInput: CustomNodeInput,
      customDefault: CustomNodeDefault,
      customOutput: CustomNodeOutput,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    []
  );
  return (
    <ReactFlowProvider>
      <ReactFlow
        ref={reactFlowWrapper}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onInit={setReactFlowInstance}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <SideBar />
    </ReactFlowProvider>
  );
}
