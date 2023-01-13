import React from "react";
import { Handle, Position } from "reactflow";

import BasicCard from "../../components/BasicCard";

const CustomNodeInput = (props) => {
  const pos = `posX = ${props.xPos}, posY = ${props.yPos}`;
  return (
    <>
      <BasicCard
        title={props.data.title}
        text={props.data.text}
        click={() => props.data.click(pos)}
        buttonTitle={props.data.buttonTitle}
        selected={props.selected}
        id={props.id}
      />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default CustomNodeInput;
