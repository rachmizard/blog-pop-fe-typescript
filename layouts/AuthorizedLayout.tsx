import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { OrganismNavbar } from "components/organisms";

import { authStore } from "store";

const AuthorizedLayout: NextPage = ({ children }): any => {
  const { isAuthenticated } = useRecoilValue(authStore.authAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && router.isReady) router.replace("/login");
  }, [isAuthenticated, router]);

  return (
    <Box>
      <OrganismNavbar />
      {children}
    </Box>
  );
};

export default AuthorizedLayout;
