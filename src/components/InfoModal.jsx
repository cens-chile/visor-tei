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
  import { Button } from '@chakra-ui/react';
  import { useState } from 'react';
  
  export default function InfoModal({ info }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedInfo, setSelectedInfo] = useState(null);
  
    const handleClick = () => {
      setSelectedInfo(info);
      onOpen();
    };
  
    return (
      <>
        <Button size="x-sm" onClick={handleClick} colorScheme="teal">
          Ver
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="full" 
        closeOnOverlayClick={true}
        closeOnEsc={true} >
          <ModalOverlay />
          <ModalContent bg="gray.900" color="white">
            <ModalHeader>Información</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                backgroundColor: '#2D3748',
                padding: '1rem',
                borderRadius: '8px',
                }}>
                {JSON.stringify(selectedInfo, null, 2)}
              </pre>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  