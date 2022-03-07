import { Flex, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

interface OrganismAccountSkeletonProps {
  show: boolean;
  children: React.ReactElement<any>;
}

const OrganismAccountSkeleton: React.FC<OrganismAccountSkeletonProps> = ({
  children,
  show,
}) => {
  return show ? (
    <Flex direction="column" alignItems="center" gap={8}>
      <Skeleton h="8" w="28" />
      <SkeletonCircle size="20" />
      <Skeleton h="8" w="28" />
      <HStack>
        <Skeleton h="2" w="20" />
        <Skeleton h="2" w="20" />
        <Skeleton h="2" w="20" />
      </HStack>
      <HStack>
        <Skeleton h="8" w="20" />
        <Skeleton h="8" w="20" />
      </HStack>
    </Flex>
  ) : (
    children
  );
};

export default OrganismAccountSkeleton;
