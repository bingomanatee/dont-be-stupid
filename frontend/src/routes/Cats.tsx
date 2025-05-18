import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CatGrid } from '../components/CatGrid';
import { useCatState } from '../state/cats.state';

export function Prompt({ children }) {
  return (
    <Box layerStyle="prompt" data-role="prompt" id="prompt">
      {children}
    </Box>
  );
}

export default function Cats() {
  const [state, { cats }] = useCatState();
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
        <Prompt>
          <Flex direction="row" align="center" gap={8} justify="center">
            <Text textStyle="prompt">
              Click on the categories you want to be quizzed on.
            </Text>
            <Box>
              <Button normal h="auto" lineHeight="relaxed">
                <Text>Pick All</Text>
              </Button>
            </Box>
          </Flex>
        </Prompt>
        <CatGrid cats={cats} />
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
              Save My Categories
            </Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
