import { Box, Text } from '@chakra-ui/react';

export default function SingleMessage(props) {
  return (
    <Box>
      {props.messages.map((message, index) => {
        return <Text key={index}>{message.message}</Text>;
      })}
    </Box>
  );
}
