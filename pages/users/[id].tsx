import React from "react";
import { NextPage } from "next";

import { AuthorizedLayout } from "layouts";
import { Container } from "@chakra-ui/react";
import { OrganismAccount } from "components/organisms";

interface UsersPageProps {
  userId: any | number;
}

const UsersPage: NextPage<UsersPageProps> = ({ userId }) => {
  return (
    <AuthorizedLayout title="Account">
      <Container maxW="container.md" my="10">
        <OrganismAccount userId={userId} />
      </Container>
    </AuthorizedLayout>
  );
};

UsersPage.getInitialProps = ({ query }) => {
  return {
    userId: query.id,
  };
};

export default UsersPage;
