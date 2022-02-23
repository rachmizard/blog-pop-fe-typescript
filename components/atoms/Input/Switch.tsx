import { Switch } from "@chakra-ui/react";
import type { SwitchInterfaceProps } from "./types/Input";

const AtomInputSwitch: React.FC<SwitchInterfaceProps> = ({
  controlRender,
  ...rest
}) => {
  return (
    <Switch {...controlRender} {...rest}>
      AtomInputSwitch
    </Switch>
  );
};

export default AtomInputSwitch;
