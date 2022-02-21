import { Flex } from "@chakra-ui/react";
import { OrganismLoginContainer } from "components/organisms";
import { LoginLayout } from "../layouts";

const LoginPage = () => {
  return (
    <LoginLayout>
      <Flex
        justifyContent="center"
        alignItems={"center"}
        w="full"
        minHeight="100vh"
      >
        <OrganismLoginContainer />
      </Flex>
    </LoginLayout>
  );
};

export default LoginPage;
