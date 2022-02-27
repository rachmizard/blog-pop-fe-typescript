import React from "react";
import { UnauthorizedLayout } from "layouts";
import { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { OrganismRegisterContainer } from "components/organisms";

const RegisterPage: NextPage = () => {
  return (
    <UnauthorizedLayout headerTitle="Register">
      <Flex
        justifyContent="center"
        alignItems={"center"}
        w="full"
        minHeight="100vh"
      >
        <OrganismRegisterContainer />
      </Flex>
    </UnauthorizedLayout>
  );
};

export default RegisterPage;
