import { Flex, Container, Input, Button, Text } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';
import SingleMessage from './SingleMessage';

export default function ChatWindow({ socket, selectedRoom, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const sendMessageToRoom = () => {
    console.log('trying to send');
    socket.emit('send-message', {
      roomID: selectedRoom,
      senderID: socket.id,
      message: messageInputRef.current.value,
    });
    messageInputRef.current.value = '';
  };
  socket.on('deliver-message', message => {
    console.log('delivering message', message);
    setMessages([...messages, message]);
  });
  useEffect(() => {
    messageInputRef.current.focus();
    socket.emit('read-messages', selectedRoom);
    socket.on('recieve-messages', message => {
      setMessages(message);
    });
  }, [selectedRoom]);
  console.log('messages hook', messages);
  const messageInputRef = useRef();
  return (
    <Container maxW="container.lg">
      <Text>{selectedRoom}</Text>
      <Flex border="1px" borderColor="teal" height="500px" w={'100%'}>
        {messages && messages.length > 0 ? (
          <SingleMessage messages={messages} />
        ) : (
          <Text>No messages yet</Text>
        )}
      </Flex>
      <Flex>
        <Input
          variant="outline"
          placeholder={`messsage ${selectedUser} here...`}
          ref={messageInputRef}
        />
        <Button colorScheme="teal" variant="solid" onClick={sendMessageToRoom}>
          Send
        </Button>
      </Flex>
    </Container>
  );
}
