import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { Category } from '../types';
import { useCatState } from '../state/cats.state';

// AI assisted
type Props = { cats: Category[] };

export function CatGrid({ state, cats, chosen }) {
  if (!Array.isArray(cats)) {
    return null;
  }
  return (
    <Box layerStyle="catGridContainer">
      <SimpleGrid
        columnGap={0.5}
        rowGap={0.5}
        minChildWidth={{ base: 'fill', md: '200px' }}
        mx={4}
      >
        {cats.map((cat: Category) => {
          const isChosen = chosen.has(cat.id);

          return <CatTile isChosen={isChosen} cat={cat} state={state} />;
        })}
      </SimpleGrid>
    </Box>
  );
}

function CatTile({ cat, isChosen, state }) {
  return (
    <Box
      key={cat.id}
      userSelect="none"
      cursor="pointer"
      layerStyle={isChosen ? 'categoryTileChosen' : 'categoryTile'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        state.acts.pick(cat.id);
      }}
    >
      {
        <Box
          className="categoryTileImage"
          layerStyle={
            isChosen ? 'categoryTileImageChosen' : 'categoryTileImage'
          }
          backgroundImage={`url(${cat.imageUrl})`}
          style={!isChosen ? { filter: 'blur(20px)' } : {}}
        />
      }
      <Box className="categoryTileOverlay" layerStyle="categoryTileOverlay" />
      <Box layerStyle="categoryTileContent">
        <Text
          textStyle={isChosen ? 'categoryButtonSelected' : 'categoryButton'}
        >
          {cat.name.replace(/.*:/, '')}
        </Text>
      </Box>
    </Box>
  );
}
