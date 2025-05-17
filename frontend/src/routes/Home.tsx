import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

export default function Home() {
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
          <Text textStyle="display">
            <span className="keep-together">
              The party trivia game that takes&nbsp;
            </span>
            <span className="keep-together">EVERYTHING YOU HAVE</span>
            <br />
            <span className="keep-together">for guessing the&nbsp;</span>
            <span className="keep-together">DUMBEST ANSWER </span>
          </Text>
        </Box>
        <Flex align="center" w="100R" direction="column">
          <Button display>
            <Text
              textStyle="buttonDisplay"
              color="textAccent"
              style={{
                textShadow: '3px 4px rgba(0,0,0,0.5)',
              }}
            >
              Let's play a game!
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
