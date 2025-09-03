import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody
} from '@chakra-ui/modal';
import { JsonEditor, githubLightTheme } from 'json-edit-react'
import { Button, Box } from '@chakra-ui/react';

export default function InfoModal({ isOpen, onClose, info }) {

  let finalData = info;

  while (typeof finalData === 'string') {
    try {
      finalData = JSON.parse(finalData);
    } catch {
      break; 
    }
  }

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        closeOnEsc={true}
        isCentered
        size="xl" 
      >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='20%'
          backdropBlur='100px'
        />
        <ModalContent 
          color="white"
          className="modal-content"
          height={"60vh"}
        >
          <ModalHeader className="modal-header">Información</ModalHeader>
          <ModalBody p={0} maxH="60vh" overflowY="auto">
            {typeof finalData === 'object' && finalData !== null ? (
            <Box as="pre" width="100%" bgColor={"gray.600"} borderRadius="md">
              <JsonEditor
                data={ finalData }
                viewOnly={true}
                theme={githubLightTheme}
                showArrayIndices={false}
                showCollectionCount={false}
                collapse={2}
                rootFontSize={14}
                className='json-editor'
              />
            </Box>
            ):(
            <Box
              as="pre"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              p={4}
              bg="#FCFCFC"
              borderRadius="md"
              color="red.500"          
              fontFamily="monospace"
            >
              {String(finalData)}
            </Box>
            )}
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
