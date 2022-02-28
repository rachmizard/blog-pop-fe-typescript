import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import { SwitchInterfaceProps } from "components/atoms/Input/types/Input";

interface MoleculeInputGroupSwitch extends FormControlProps {
  component: React.ElementType<SwitchInterfaceProps>;
  name: string;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  htmlFor?: string;
  type?: string;
  defaultValue?: string;
}

const MoleculeInputGroupSwitch: React.FC<MoleculeInputGroupSwitch> = (
  props
) => {
  const {
    htmlFor,
    label,
    helperText,
    isDisabled,
    isInvalid,
    isRequired,
    type,
    name,
    component,
    ...rest
  } = props;

  const methods = useFormContext();

  const AtomComponent: React.ElementType<SwitchInterfaceProps> = component;

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            isDisabled={isDisabled}
            isRequired={isRequired}
            isInvalid={fieldState.isTouched && fieldState.invalid}
            {...rest}
          >
            <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
            <AtomComponent controlRender={field} />
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default MoleculeInputGroupSwitch;
