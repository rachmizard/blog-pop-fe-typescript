import { Container } from "@chakra-ui/react";
import { AuthorizedLayout } from "layouts";
import { NextPage } from "next";

import { OrganismAccount } from "components/organisms";
import { useUser } from "hooks";
import { useRecoilValue } from "recoil";
import { authStore } from "store";

const AccountPage: NextPage = () => {
  const auth = useRecoilValue(authStore.authAtom);
  const { data, isLoading } = useUser.useFetchDetailUserQuery(auth.user.id);

  const userId = data ? data?.id : 0;

  return (
    <AuthorizedLayout title="Account">
      <Container maxW="container.md" my="10">
        {!isLoading && <OrganismAccount userId={userId} />}
      </Container>
    </AuthorizedLayout>
  );
};

export default AccountPage;
