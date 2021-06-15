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
import { io } from 'socket.io-client';
import { useRef, useEffect, useState } from 'react';
import OnlineUsers from '../components/OnlineUsers';
import ChatWindow from '../components/ChatWindow';
const socket = io('http://localhost:4000');
socket.on('connect', () => {
  console.log(`You connected with id ${socket.id}`);
});

export default function Home({ username }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  socket.on('online-users', users => {
    setOnlineUsers(users.filter(user => user.id !== socket.id));
  });
  socket.on('deliver-room', message => {
    console.log(message);
    setSelectedRoom(message.roomID);
  });

  useEffect(() => {
    socket.emit('login', { id: socket.id, username: username });
  }, []);

  return (
    <Container h={'100vh'} maxW="container.lg">
      <Flex w={'100%'} justify="flex-start">
        <Text fontSize="5xl">Hi {username}</Text>
      </Flex>
      <Flex direction="column" w={'100%'}>
        <Text fontSize="xl">Users online</Text>
        {onlineUsers.length > 0 ? (
          <OnlineUsers
            onlineUsers={onlineUsers}
            socket={socket}
            setSelectedRoom={setSelectedRoom}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <Text>No users online :((</Text>
        )}
        <Box>
          {selectedRoom.length > 0 ? (
            <ChatWindow
              socket={socket}
              selectedRoom={selectedRoom}
              selectedUser={selectedUser}
            />
          ) : (
            <Text>Select a user</Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
}
