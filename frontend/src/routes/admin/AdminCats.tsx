import { Box, Button, Heading, List, Text } from '@chakra-ui/react';
import { stateFactory } from './adminCats.state';
import { useEffect, useRef, useState } from 'react';

export default function AdminCats() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    const sub = state.current?.subscribe(setValue);
    console.log('state.current', state.current);
    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return (
    <Box layerStyle="page">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid: Manager</Heading>
        <Heading textStyle="displayHead">Categories</Heading>
        <Box layerStyle="pageContent">
          <Button onClick={state.current?.acts.init} admin>
            Initialize
          </Button>
          {Array.isArray(value?.cats) ? (
            <Box layerStyle="listFrame">
              <List.Root id="cat-list" variant="plain">
                {value.cats?.map((c: unknown) => {
                  if (c && c.name) {
                    return (
                      <List.Item layerStyle="listItem" key={c.__id}>
                        <Text textStyle="adminListItem">{c.name}</Text>
                      </List.Item>
                    );
                  }
                  console.warn('bad cat:', c);
                  return null;
                })}
              </List.Root>
            </Box>
          ) : (
            'loading'
          )}
        </Box>
      </Box>
    </Box>
  );
}
