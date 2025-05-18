import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel';

export default function AdminHome() {
  return (
    <Box layerStyle="page" id="admin-hoepage">
      <Box layerStyle="pageInner">
        <Heading textStyle="displayHeadSub">Don't Be Stupid</Heading>
        <Heading textStyle="displayHead">Manager</Heading>
        <Box layerStyle="pageContent">
          <Box layerStyle="panelContainer" id="panel-container">
            <Flex
              id="panels"
              align="stretch"
              direction="column"
              justify="stretch"
            >
              <AdminPanel id="cat-panel" title="Cats">
                <Button as={Link} to="/admin/cats" admin>
                  Edit
                </Button>
              </AdminPanel>
            </Flex>
          </Box>
        </Box>
        <Flex align="center" w="100%" direction="column">
          <Button as={Link} display></Button>
        </Flex>
      </Box>
    </Box>
  );
}
