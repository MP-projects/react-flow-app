import React from "react";
import { Handle, Position } from "reactflow";

import BasicCard from "../../components/BasicCard";

const CustomNodeDefault = ({ data, xPos, yPos }) => {
  const pos = `posX = ${xPos}, posY = ${yPos}`
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <BasicCard title={data.title} text={data.text} click= {()=>data.click(pos)} buttonTitle={data.buttonTitle} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default CustomNodeDefault;
