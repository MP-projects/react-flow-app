import React from "react";
import { Handle, Position} from "reactflow";

import BasicCard from "../../components/BasicCard";

const CustomNodeInput = (props) => {
//   const reactFlowInstance = useReactFlow();

//     console.log(reactFlowInstance);
  
  const pos = `posX = ${props.xPos}, posY = ${props.yPos}`;
  return (
    <>
      <BasicCard
        title={props.data.title}
        text={props.data.text}
        click={() => props.data.click(pos)}
              buttonTitle={props.data.buttonTitle}
        selected={props.selected}
        options={props}
        id={props.id}
              
      />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default CustomNodeInput;
