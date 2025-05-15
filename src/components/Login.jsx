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
import { usuarios } from "../hooks/data";
import { createFakeJwt, parseJwt } from "../hooks/login";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setErrorMsg("Usuario o contraseña inválidos.");
      return;
    }

    const payload = {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 3600, // expira en 1 hora
    };

    const token = createFakeJwt(payload);
    const decoded = parseJwt(token);

    localStorage.setItem("token", token);
    localStorage.setItem("username", decoded.username);
    localStorage.setItem("first_name", decoded.first_name);
    localStorage.setItem("last_name", decoded.last_name);
    localStorage.setItem("email", decoded.email);

    window.location.href = "/";
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
          <Button type="submit" colorScheme="teal" width="full">Ingresar</Button>
        </VStack>
      </form>
    </Box>
  );
}
