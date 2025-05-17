import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function QuizLayout() {
  return (
    <Box layerStyle="pageContainer" id="pc">
      <Outlet />
    </Box>
  );
}
