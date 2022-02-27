import { Container } from "@chakra-ui/react";
import { AuthorizedLayout } from "layouts";
import { NextPage } from "next";

import { OrganismAccount } from "components/organisms";

const AccountPage: NextPage = () => {
  return (
    <AuthorizedLayout title="Account">
      <Container maxW="container.md" my="10">
        <OrganismAccount isAuthorized />
      </Container>
    </AuthorizedLayout>
  );
};

export default AccountPage;
