import { Spinner, Text, VStack } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollItemsProps {
  children: React.ReactNode;
  dataLength: number;
  hasMore: boolean;
  onNext: () => void;
  loader?: React.ReactNode;
  endMessageText?: string;
  scrollableTarget?: string;
}

export default function InfiniteScrollItems(
  props: InfiniteScrollItemsProps
): JSX.Element {
  const {
    dataLength,
    hasMore,
    onNext,
    loader,
    children,
    endMessageText,
    scrollableTarget,
  } = props;

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
      scrollableTarget={scrollableTarget}
      hasChildren={true}
      endMessage={
        <Text my="2" textAlign={"center"} fontSize={"14px"} color="gray.400">
          {endMessageText
            ? endMessageText
            : "Hold up! There's nothing more to see."}
        </Text>
      }
    >
      {children}
    </InfiniteScroll>
  );
}
