import { Flex } from '@chakra-ui/react';
import User from './User';

export default function OnlineUsers({
  onlineUsers,
  socket,
  setSelectedRoom,
  setSelectedUser,
}) {
  return (
    <Flex my={4}>
      {onlineUsers.map((user, index) => {
        return (
          <User
            key={index}
            index={user.id}
            username={user.name}
            socket={socket}
            setSelectedRoom={setSelectedRoom}
            setSelectedUser={setSelectedUser}
          />
        );
      })}
    </Flex>
  );
}
