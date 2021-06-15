import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
  Input,
  Button,
  Center,
  Flex,
} from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Login({ setUsername }) {
  const usernameInput = useRef();
  useEffect(() => {
    usernameInput.current.focus();
  });
  const [disabled, setDisabled] = useState(true);
  console.log('login');
  return (
    <Container h={'100vh'}>
      <Flex h={'100%'} w={'100%'} justify="center" align="center">
        <Flex justify="space-between">
          <Input
            variant="outline"
            placeholder="Enter your nickname..."
            ref={usernameInput}
            size="lg"
            mx={4}
            onChange={e => {
              if (e.target.value.length > 0) {
                setDisabled(false);
              } else setDisabled(true);
            }}
          />
          <Button
            disabled={disabled}
            as={RouterLink}
            to="/home"
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              setUsername(usernameInput.current.value);
            }}
            size="lg"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
