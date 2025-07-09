import { Box, Flex, Text, Image } from "@chakra-ui/react";
import LogoCENS from "./icons/LogoCENS";

export default function Footer () {
  return (
    <Box
     as="footer"
     bg="#0A132D"
     color="white"
     py={4}
     mt="auto"
   >
    <Flex
    maxW="72rem"
    mx="auto"
    px={5}
    direction={"row"}
    align="center"
    justify="center"
    gap={4}
    textAlign="center"
    >
        <Text fontSize="sm" mr={5}>Hecho por CENS © 2025</Text>
        <LogoCENS />
    </Flex>
   </Box>
  );
};


