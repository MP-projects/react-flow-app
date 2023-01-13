import React from "react";
import { getBezierPath, useReactFlow } from "reactflow";

import "./CustomEdge.css";

const foreignObjectSize = 40;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { getEdge, deleteElements, setEdges } = useReactFlow();

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();

    setEdges((eds) => eds.filter((e) => e.id !== id));
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml">
        <div>
          <button
            className="edgebutton"
            onClick={(event) => onEdgeClick(event, id)}>
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
}