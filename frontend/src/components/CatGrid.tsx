import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import type { Category } from '../types';

// AI assisted
type Props = { cats: Category[] };

export function CatGrid(props: Props) {
  const { cats } = props;
  if (!Array.isArray(cats)) {
    return null;
  }
  return (
    <SimpleGrid
      columnGap={1}
      rowGap={1}
      minChildWidth="200px" // auto-fills columns based on this width
      width="100%"
    >
      {cats.map((cat: any) => (
        <Box key={cat.__id} layerStyle="categoryTile">
          <Box
            className="categoryTileImage"
            layerStyle="categoryTileImage"
            backgroundImage={`url(${cat.imageUrl})`}
          />
          <Box
            className="categoryTileOverlay"
            layerStyle="categoryTileOverlay"
          />
          <Box layerStyle="categoryTileContent">
            <Text textStyle="categoryButtonUnselected">
              {cat.name.replace(/.*:/, '')}
            </Text>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
