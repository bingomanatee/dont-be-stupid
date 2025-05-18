import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Categories() {
  // @ts-ignore
  return (
    <Box layerStyle="page" id="homepage">
      <Box
        layerStyle="container"
        w="100%"
        direction="column"
        justifyContent="center"
      >
        <Heading textStyle="displayHead">Don’t Be Stupid</Heading>
        <Box layerStyle="heroText">
          <Text textStyle="display">Categories To Come</Text>
        </Box>
        <Flex align="center" w="100R" direction="column">
          <Button
            as={Link}
            // @ts-ignore
            display
          >
            <Text
              textStyle="buttonDisplay"
              color="textAccent"
              style={{
                textShadow: '3px 4px rgba(0,0,0,0.5)',
              }}
            >
              Choose These Categories
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
