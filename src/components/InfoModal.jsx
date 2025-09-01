import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button, Box } from '@chakra-ui/react';
import { useState, useMemo} from 'react';

export default function InfoModal({ info }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInfo, setSelectedInfo] = useState(null);

  const formattedJson = useMemo(() => {
    if (!selectedInfo) return ''; 

    let parsedData = selectedInfo;

    while (typeof parsedData === 'string') {
      try {
        parsedData = JSON.parse(parsedData);
      } catch (error) {
        break;
      }
    }
    return JSON.stringify(parsedData, null, 2);

  }, [selectedInfo]); 

  const handleClick = () => {
    setSelectedInfo(info);
    onOpen();
  };

  return (
    <>
      <Button size="sm" onClick={handleClick} 
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
      >
        Ver
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        closeOnEsc={true}
        isCentered
      >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='20%'
          backdropBlur='100px'
        />
        <ModalContent 
          bg="gray.900" 
          color="white"
          className="modal-content"
        >
          <ModalHeader className="modal-header">Información</ModalHeader>
          <ModalBody>
            <Box 
              as="pre"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              fontFamily="monospace"
              fontSize="0.9rem"
              bg="gray.700"
              p={4}
              borderRadius="md"
              overflowY="auto"
            >
              {formattedJson}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}
            className="modal-close-button"
            _dark={{
              bg: "gray.700",
              color: "white",
              _hover: { bg: "gray.600" },
            }}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
