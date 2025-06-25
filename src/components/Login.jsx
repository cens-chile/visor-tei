// LoginForm.jsx
import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { getToken } from "../hooks/functions";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 

    const token = await getToken(username, password);

    if (token) {
      localStorage.setItem('token', token.access);
      localStorage.setItem('refreshToken', token.refresh)
      localStorage.setItem('username', username);
      window.location.href = '/';
    } else {
      setErrorMsg('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="100px" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="gray.800" color="white">
      <Heading mb="4" mx="auto" width="50%">Iniciar sesión</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errorMsg}>
            <FormLabel>Usuario</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl isInvalid={!!errorMsg}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormErrorMessage>{errorMsg}</FormErrorMessage>
          </FormControl>
          <Button type="submit" 
            _dark={{
            bg: "gray.700",
            color: "white",
            _hover: { bg: "gray.600" },
            }} 
            width="full"
          >
          Ingresar
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
