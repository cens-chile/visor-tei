import { Box, Flex, Text, Image } from "@chakra-ui/react";
import LogoCENS from "./icons/LogoCENS";
// import "../assets/footer.css" 

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
    className="footer-content"
    maxW="100%"
    w="100%"
    mx="auto"
    px={5}
    direction={"row"}
    align="center"
    justify="center"
    gap={4}
    textAlign="center"
    minW={0} wrap="wrap"
    >
        <Text fontSize="sm" mr={5}>Hecho por CENS © 2025</Text>
        <LogoCENS className="footer-logo" />
    </Flex>
   </Box>
  );
};


