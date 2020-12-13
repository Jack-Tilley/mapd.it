import React, { createContext, useState } from "react";
export const NodeContext = createContext();

export const NodeProvider = (props) => {
  const [icon, setIcon] = useState("search");
  const [color, setColor] = useState("black");
  const [nodeType, setNodeType] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");

  return (
    <NodeContext.Provider value={[color, setColor]}>
      {props.children}
    </NodeContext.Provider>
  );
};
