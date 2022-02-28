import { Spinner, Text, VStack } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollItemsProps {
  children: React.ReactNode;
  dataLength: number;
  hasMore: boolean;
  onNext: () => void;
  loader?: React.ReactNode;
  endMessageText?: string;
}

export default function InfiniteScrollItems(
  props: InfiniteScrollItemsProps
): JSX.Element {
  const { dataLength, hasMore, onNext, loader, children, endMessageText } =
    props;

  return (
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={hasMore}
      next={onNext}
      loader={
        loader ? (
          loader
        ) : (
          <VStack overflow="hidden">
            <Spinner />
          </VStack>
        )
      }
      endMessage={
        <Text my="10" textAlign={"center"} fontSize={"20px"} color="gray.400">
          {endMessageText ? endMessageText : "You are at the end of the list"}
        </Text>
      }
    >
      {children}
    </InfiniteScroll>
  );
}
