import React from "react";
import { Handle, Position } from "reactflow";

import BasicCard from "../../components/BasicCard";

const CustomNodeOutput = ({ data, xPos, yPos, selected, id }) => {
  const pos = `posX = ${xPos}, posY = ${yPos}`;
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <BasicCard
        title={data.title}
        text={data.text}
        click={() => data.click(pos)}
        buttonTitle={data.buttonTitle}
        selected={selected}
        id={id}
      />
    </>
  );
};

export default CustomNodeOutput;
