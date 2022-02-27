import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { OrganismNavbar } from "components/organisms";

import { authStore } from "store";
import { useAuth } from "hooks";

const AuthorizedLayout: NextPage = ({ children }): any => {
  const [auth, setAuth] = useRecoilState(authStore.authAtom);
  const { data, isSuccess } = useAuth.useGetProfile();

  useEffect(() => {
    if (data || isSuccess) {
      setAuth((prevState) => {
        return {
          ...prevState,
          user: data?.data?.user,
        };
      });
    }
  }, [data, isSuccess]);

  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated && router.isReady) router.replace("/login");
  }, [auth.isAuthenticated, router]);

  return (
    <Box>
      <OrganismNavbar />
      {children}
    </Box>
  );
};

export default AuthorizedLayout;
