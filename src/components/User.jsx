import { Flex, Image, Text } from '@chakra-ui/react';

export default function User(props) {
  const joinRoom = () => {
    props.setSelectedUser(props.username);
    console.log('joining room');
    props.socket.emit('get-room', {
      user1ID: props.socket.id,
      user2ID: props.index,
    });
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      mx={2}
      onClick={joinRoom}
      cursor="pointer"
    >
      <Image
        border="1px"
        borderColor="teal"
        borderRadius="full"
        boxSize="150px"
        src={`https://joeschmoe.io/api/v1/${props.index}`}
      />
      <Text my={3}>{props.username}</Text>
    </Flex>
  );
}
