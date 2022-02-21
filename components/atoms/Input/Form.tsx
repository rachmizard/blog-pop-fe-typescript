import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

interface IFormProps {
  children: React.ReactNode;
  defaultValues: any;
  onSubmit: (values: any) => void;
  validationSchema?: any;
}

const Form: React.FC<IFormProps> = ({
  onSubmit,
  defaultValues,
  children,
  validationSchema,
}) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
