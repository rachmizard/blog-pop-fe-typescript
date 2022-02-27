import { Flex } from "@chakra-ui/react";
import { OrganismLoginContainer } from "components/organisms";
import { UnauthorizedLayout } from "../layouts";

const LoginPage = () => {
  return (
    <UnauthorizedLayout headerTitle="Login to Apps!">
      <Flex
        justifyContent="center"
        alignItems={"center"}
        w="full"
        minHeight="100vh"
      >
        <OrganismLoginContainer />
      </Flex>
    </UnauthorizedLayout>
  );
};

export default LoginPage;
