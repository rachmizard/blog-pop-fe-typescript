import { Box, Heading, Stack, Text, Button, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Router from "next/router";

import { MoleculeInputGroupText } from "components/molecules";
import { AtomInputText, Form } from "components/atoms";
import { AuthValidation } from "validations";
import { useAuth } from "hooks";
import { authStore } from "store";
import { IAuthRegisterVariables } from "store/auth/auth.types";
import { useQueryClient } from "react-query";

const OrganismRegisterContainer: React.FC = () => {
  const [_, setAuth] = useRecoilState(authStore.authAtom);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAuth.useAuthRegisterMutation();
  const toast = useToast();

  const onSubmit = (values: IAuthRegisterVariables) => {
    console.log(values);

    mutate(values, {
      onError: (error: any) => {
        toast({
          title: "Somethin Went Wrong",
          description: error?.message,
        });
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["profile"]);
        queryClient.invalidateQueries(["new-users"]);

        setAuth((currVal) => ({
          ...currVal,
          accessToken: data?.accessToken,
          user: data.user,
          isAuthenticated: true,
        }));

        Router.replace("/");
      },
    });
  };

  return (
    <Box padding={[40, 20]} rounded="sm" w="lg" shadow="xl">
      <Stack spacing={8}>
        <Stack>
          <Heading textAlign={"center"} size={"lg"}>
            Register your account
          </Heading>
          <Text fontSize={"18"} textAlign={"center"}>
            Please Register Here!
          </Text>
        </Stack>
        <Form
          defaultValues={{
            email: "",
            password: "",
            name: "",
            role: "USER",
          }}
          validationSchema={AuthValidation.RegisterSchemaValidation}
          onSubmit={onSubmit}
        >
          {() => {
            return (
              <Stack spacing={4}>
                <MoleculeInputGroupText
                  label="Email"
                  helperText="We will not share your email."
                  htmlFor="email"
                  name="email"
                  isRequired
                  component={AtomInputText}
                />

                <MoleculeInputGroupText
                  label="Password"
                  htmlFor="password"
                  type="password"
                  name="password"
                  isRequired
                  component={AtomInputText}
                />

                <MoleculeInputGroupText
                  label="Name"
                  htmlFor="name"
                  name="name"
                  isRequired
                  component={AtomInputText}
                />

                <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="telegram"
                >
                  Register Now!
                </Button>

                <Button
                  colorScheme="telegram"
                  variant="link"
                  size="sm"
                  onClick={() => Router.push("/login")}
                >
                  Have an account? Login!
                </Button>
              </Stack>
            );
          }}
        </Form>
      </Stack>
    </Box>
  );
};

export default OrganismRegisterContainer;
