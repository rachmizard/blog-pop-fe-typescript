import { Box, Heading, Stack, Text, Button } from "@chakra-ui/react";

import { MoleculeInputGroupText } from "components/molecules";
import { Form } from "components/atoms";
import { AuthValidation } from "validations";

const OrganismLoginContainer: React.FC = () => {
  const onSubmit = (values: any) => {
    console.log(values);
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
            />

            <MoleculeInputGroupText
              label="Password"
              htmlFor="password"
              type="password"
              name="password"
            />
            <Button type="submit" colorScheme="telegram">
              Login Now!
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
};

export default OrganismLoginContainer;
