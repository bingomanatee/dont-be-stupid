import {Outlet} from "react-router-dom";
import {Box} from "@chakra-ui/react";

export default function QuizLayout() {
    return (
        <Box layerStyle='pc' bg='hsla(255, 70%, 40%, 60%)'>
            <Outlet />
        </Box>
    );
}