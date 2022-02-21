import React from "react";
import { Input } from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { ControllerRenderProps } from "react-hook-form";

interface AtomInputText extends InputProps {
  children?: React.ReactNode;
  controlRender: ControllerRenderProps;
}

const AtomInputText: React.FC<AtomInputText> = ({ type, controlRender }) => {
  return <Input type={type} {...controlRender} />;
};

export default AtomInputText;
