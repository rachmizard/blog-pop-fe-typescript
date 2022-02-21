import { Box, Heading, Stack, Text, Button, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Router from "next/router";

import { MoleculeInputGroupText } from "components/molecules";
import { Form } from "components/atoms";
import { AuthValidation } from "validations";
import { useAuth } from "hooks";
import { authStore } from "store";

const OrganismLoginContainer: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authStore.authAtom);
  const { mutate, isLoading } = useAuth.useAuthLoginMutation();
  const toast = useToast();

  const onSubmit = (values: any) => {
    mutate(values, {
      onError: (error: any) => {
        toast({
          title: "Somethin Went Wrong",
          description: error?.message,
        });
      },
      onSuccess: ({ data }) => {
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
            Welcome to BLOG POP!
          </Heading>
          <Text fontSize={"18"} textAlign={"center"}>
            Please Login
          </Text>
        </Stack>
        <Form
          defaultValues={{
            email: "",
            password: "",
          }}
          validationSchema={AuthValidation.LoginSchemaValidation}
          onSubmit={onSubmit}
        >
          <Stack spacing={8}>
            <MoleculeInputGroupText
              label="Email"
              helperText="We will not share your email."
              htmlFor="email"
              name="email"
              isRequired
            />

            <MoleculeInputGroupText
              label="Password"
              htmlFor="password"
              type="password"
              name="password"
              isRequired
            />
            <Button isLoading={isLoading} type="submit" colorScheme="telegram">
              Login Now!
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
};

export default OrganismLoginContainer;
