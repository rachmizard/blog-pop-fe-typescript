import { InputProps, SwitchProps } from "@chakra-ui/react";
import { ControllerRenderProps } from "react-hook-form";

export interface InputInterfaceProps extends InputProps {
  children?: React.ReactNode;
  controlRender?: ControllerRenderProps;
}

export interface SwitchInterfaceProps extends SwitchProps {
  children?: React.ReactNode;
  controlRender?: ControllerRenderProps;
}
