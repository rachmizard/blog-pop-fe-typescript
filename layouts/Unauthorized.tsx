import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authStore } from "store";

interface UnauthorizedLayoutProps {
  children: React.ReactNode;
  headerTitle: string;
}

const UnauthorizedLayout: React.FC<UnauthorizedLayoutProps> = ({
  children,
  headerTitle,
}) => {
  const { isAuthenticated } = useRecoilValue(authStore.authAtom);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && router.isReady) router.replace("/");
  }, [isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>{headerTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default UnauthorizedLayout;