import {
  HStack,
  Button,
  IconButton,
  Text
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Pagination ({ pageIndex, pageCount, setPageIndex }) {
  const generatePageNumbers = () => {
    const pages = [];

    pages.push(0);

    if (pageIndex > 2) {
      pages.push("...");
    }

    for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
      if (i > 0 && i < pageCount - 1) {
        pages.push(i);
      }
    }

    if (pageIndex < pageCount - 3) {
      pages.push("...");
    }

    if (pageCount > 1) {
      pages.push(pageCount - 1);
    }

    return pages;
  };

  return (
    <HStack spacing={2} mt={10} justify="center">
      <IconButton
        _dark={{
          bg: "gray.700",
          color: "white",
          _hover: { bg: "gray.600" }
        }}
        _light={{
          bg: "#006FB3",
          color: "white",
          _hover: { bg: "#0083d3" }
        }} 
        size="sm"
        isDisabled={pageIndex <= 0}
        onClick={() => setPageIndex(pageIndex - 1)}
      >
        <LuChevronLeft style={{ color: "white" }} />
      </IconButton>

      {generatePageNumbers().map((page, idx) =>
        page === "..." ? (
          <Text key={idx} px={2}>
            ...
          </Text>
        ) : (
          <Button
            key={idx}
            size="sm"
            variant={page === pageIndex ? "outline" : "ghost"}
            onClick={() => setPageIndex(page)}
            _dark={{
              bg: "transparent",
              color: "white",
              _hover: { bg: "gray.600" },
            }}
            _light={{
              bg: "transparent",
              color: "black",
              _hover: { bg: "gray.100" },
            }}
          >
            {page + 1}
          </Button>
        )
      )}

      <IconButton
        _dark={{
          bg: "gray.700",
          color: "white",
          _hover: { bg: "gray.600" }
        }}
        _light={{
          bg: "#006FB3",
          color: "white",
          _hover: { bg: "#0083d3" }
        }} 
        size="sm"
        isDisabled={pageIndex >= pageCount - 1}
        onClick={() => {
            if (pageIndex < pageCount - 1) {
            setPageIndex(pageIndex + 1);
            }
        }}
      >
        <LuChevronRight style={{ color: "white" }} />
      </IconButton>
    </HStack>
  );
};
