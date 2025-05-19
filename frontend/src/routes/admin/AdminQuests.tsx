import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  NativeSelect,
  Text,
} from '@chakra-ui/react';
import { useQuestState } from '../../state/quests.state';
import type { Question } from '../../types';
import { RangeSlider } from '../../components/RangeSlider';
import { useCatState } from '../../state/cats.state';

function QuestSummary({ quest }: { quest: Question }) {
  return (
    <Box>
      <Text>{quest.id}</Text>
      <Text>{quest.question}</Text>
    </Box>
  );
}

export default function AdminQuests() {
  const [state, quests] = useQuestState();
  const [_catState, cats] = useCatState();
  return (
    <Box layerStyle="page">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid: Manager</Heading>
        <Heading textStyle="displayHead">Questions</Heading>
        <Box layerStyle="pageContent">
          <Flex
            gap={8}
            w="100%"
            direction="row"
            justify="center"
            align="stretch"
          >
            <Button onClick={state.acts.init} admin>
              Seed Questions
            </Button>
            <Button onClick={state.acts.generate} admin>
              Generate
            </Button>
          </Flex>
          <Box layerStyle="adminForm">
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Category</Text>
              <NativeSelect.Root>
                <NativeSelect.Field>
                  {cats.map((c) => (
                    <option value={c.name} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Difficulty</Text>
              <Box minWidth="400px" flexGrow={1}>
                <RangeSlider
                  min={1}
                  max={1}
                  step={1}
                  marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  onChange={state.acts.setDifficulty}
                />
              </Box>
            </Flex>
            <Flex gap={8} layerStyle="adminFormRow">
              <Text textStyle="adminFormLabel">Questions</Text>
              <Box minWidth="400px" flexGrow={1}>
                <RangeSlider
                  min={4}
                  max={20}
                  step={4}
                  marks={[4, 8, 12, 16, 20]}
                  onChange={state.acts.setCount}
                />
              </Box>
            </Flex>
          </Box>
          <List.Root>
            {quests.slice(0, 8).map((q) => {
              return <QuestSummary key={q.id} quest={q} />;
            })}
          </List.Root>
        </Box>
      </Box>
    </Box>
  );
}
