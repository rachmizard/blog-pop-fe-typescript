import { Flex, Text } from "@chakra-ui/react";

interface AtomPictureLabelProps {
  text: string;
}

const AtomPictureLabel: React.FC<AtomPictureLabelProps> = ({ text }) => {
  return (
    <Flex
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.400"
      rounded="full"
      h="8"
      w="8"
      flexShrink={0}
    >
      <Text textAlign="center" color="white" textTransform="uppercase">
        {text[0].toUpperCase()}
      </Text>
    </Flex>
  );
};

export default AtomPictureLabel;
