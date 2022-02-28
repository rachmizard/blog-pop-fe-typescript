import { Button, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";

import { MoleculeJoinerItem } from "components/molecules";
import { useUser } from "hooks";
import { useState } from "react";

const limitQuery = 3;

const OrganismJoiner: React.FC = () => {
  const [limit, setLimit] = useState(limitQuery);

  const { data, isLoading, isFetching, isError } = useUser.useUserQuery(
    [limit],
    {
      orderBy: "createdAt:desc",
      filter: {
        createdAt: {
          gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
            1
          ).toISOString(),
          lte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0,
            23
          ).toISOString(),
        },
      },
      page: 1,
      limit,
    }
  );

  if (isError) return <Text>Ups something went wrong!</Text>;

  const hasNextPage = data?.data.paginate.hasNextPage;

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
        <Button
          hidden={!hasNextPage}
          isLoading={isFetching}
          onClick={() => {
            setLimit(limit + limitQuery);
          }}
          alignSelf="center"
          size="xs"
          variant={"link"}
        >
          Load More
        </Button>
      </VStack>
    </VStack>
  );
};

export default OrganismJoiner;
