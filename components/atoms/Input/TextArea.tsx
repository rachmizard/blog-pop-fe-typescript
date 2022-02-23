import { Textarea } from "@chakra-ui/react";
import React from "react";
import { InputInterfaceProps } from "./types/Input";

const AtomInputTextArea: React.FC<InputInterfaceProps> = ({
  controlRender,
}) => {
  return <Textarea {...controlRender} />;
};

export default AtomInputTextArea;
