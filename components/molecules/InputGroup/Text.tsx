import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormControlProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

import { AtomInputText } from "components/atoms";

interface MoleculeInputGroupTextProps extends FormControlProps {
  name: string;
  label: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  htmlFor?: string;
  type?: string;
}

const MoleculeInputGroupText: React.FC<MoleculeInputGroupTextProps> = (
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
    ...rest
  } = props;
  const methods = useFormContext();

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
            <AtomInputText name={name} type={type} controlRender={field} />
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default MoleculeInputGroupText;
