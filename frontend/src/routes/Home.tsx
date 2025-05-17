import {Box, Button, Heading, Text} from '@chakra-ui/react';

export default function Home() {
    return (
        <Box layerStyle='page' textAlign="center" color="white">
            <Box layerStyle="container" w='100%' direction='column' justifyContent='center'>
                <Heading textStyle='displayHead'>
                    Don’t Be Stupid
                </Heading>
                <Box layerStyle="heroText">
                    <Text textStyle='display'>
                        The Party Quiz that takes
                        EVERYTHING YOU WON<br />
                        for guessing the STUPIDEST ANSWER
                    </Text>
                </Box>

                <Button bg='theme.400' textStyle='buttnDisplay' px={10} py={25} mt={8} color='theme.900' fontSize='2xl'>
                    Let's play a game!
                </Button>
            </Box>
        </Box>
    );
}
