import { Heading, Skeleton, Text, VStack } from "@chakra-ui/react";

import { MoleculeJoinerItem } from "components/molecules";
import { useUser } from "hooks";

const OrganismJoiner: React.FC = () => {
  const { data, isLoading, isError } = useUser.useUserQuery({
    orderBy: "createdAt:desc",
    filter: {
      createdAt: {
        gte: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          0
        ).toISOString(),
        lte: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).toISOString(),
      },
    },
  });

  if (isError) return <Text>Ups something went wrong!</Text>;

  return (
    <VStack
      alignItems="flex-start"
      spacing={6}
      paddingBlock={4}
      paddingInline={8}
      rounded="md"
      position="sticky"
      top={"70px"}
    >
      <Heading size="md">New joiners!</Heading>
      <VStack alignItems="flex-start" spacing={6} w="full">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton h="10" w="full" key={index} />
          ))
        ) : data?.data.data.length ? (
          data?.data.data.map((user) => (
            <MoleculeJoinerItem key={user.id} user={user} />
          ))
        ) : (
          <Text>No Updates</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default OrganismJoiner;
