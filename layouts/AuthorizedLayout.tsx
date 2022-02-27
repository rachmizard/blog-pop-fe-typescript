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
      initialFetchAuth();
    }
  }, [data, isSuccess]);

  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated && router.isReady) router.replace("/login");
  }, [auth.isAuthenticated, router]);

  const initialFetchAuth = () => {
    const transformFollowingToArray = data?.data?.user?.following?.map(
      (val: any) => val.followerId
    );

    setAuth((prevState) => {
      return {
        ...prevState,
        user: {
          ...data?.data?.user,
        },
        followingState: transformFollowingToArray,
      };
    });
  };

  return (
    <Box>
      <OrganismNavbar />
      {children}
    </Box>
  );
};

export default AuthorizedLayout;
