import { Box, Container, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import { AuthorizedLayout } from "layouts";
import { OrganismJoiner, OrganismPostContainer } from "components/organisms";

const Home: NextPage = () => {
  return (
    <AuthorizedLayout title="Home">
      <Container maxW="container.xl" mt="8">
        <Flex gap={2} direction={{ base: "column", md: "row" }}>
          <Box w="100%">
            <OrganismPostContainer />
          </Box>
          <Box w="40%" display={{ base: "none", md: "block" }}>
            <OrganismJoiner />
          </Box>
        </Flex>
      </Container>
    </AuthorizedLayout>
  );
};

export default Home;
