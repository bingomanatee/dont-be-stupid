import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useCallback, useEffect, useMemo } from 'react';
import { Prompt } from '../components/Prompt';
import { STATE, useQuizState } from '../state/quiz.state';
import { CatBanner } from '../components/CatBanner';
import { StartBanner } from '../components/StartBanner';
import { shuffle } from 'lodash-es';

function QuestionBanner() {
  const [state] = useQuizState();
  const currentQuestion = state.acts.currentQuestion();

  const answers = useMemo(
    () => shuffle(currentQuestion?.answers ?? []),
    [currentQuestion],
  );
  if (!currentQuestion) return null;

  return (
    <center>
      <Box layerStyle="questionBanner">
        <Box layerStyle="questionBannerQuestion">
          <Text textStyle="questBannerQuestion">
            {currentQuestion.question}
          </Text>
        </Box>
        <SimpleGrid
          columns={[2, null, answers.length]}
          columnGap={3}
          rowGap={2}
        >
          {answers.map((a) => {
            return (
              <Box
                layerStyle="questionBannerAnswer"
                onClick={() => {
                  state.acts.choose(currentQuestion._id, a);
                }}
              >
                <Text textStyle="questionBannerAnswer">{a}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
        <Box layerStyle="prompt">
          <Text textStyle="promptMinor">
            Difficulty level&nbsp;<b>{currentQuestion.difficulty}</b>&nbsp;out
            of 10
          </Text>
        </Box>
      </Box>
    </center>
  );
}

export default function Quiz() {
  const [state, value] = useQuizState();
  const { status, current } = value;
  const navigate = useNavigate();
  const saveAndContinue = useCallback(() => {
    state.acts.persistLevel();
    navigate('/quiz');
  }, [state]);

  useEffect(() => {
    state.acts.resetQuiz();
  }, [state]);

  return (
    <Box layerStyle="page" id="quiz">
      <Box
        layerStyle="container"
        w="100%"
        direction="column"
        justifyContent="center"
      >
        <Heading textStyle="displayHeadSub">Don’t Be Stupid</Heading>
        <CatBanner />
        {status == STATE.QUIZTITLE ? <StartBanner /> : null}
        {current ? <QuestionBanner /> : null}
      </Box>
      <Box layerStyle="floatingFooter">
        <Prompt>
          <Text textStyle="prompt">
            Choose an answer to continue. Do not choose a stupid answer.
          </Text>
        </Prompt>
      </Box>
    </Box>
  );
}
