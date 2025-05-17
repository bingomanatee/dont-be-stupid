import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "@radix-ui/themes/styles.css";
import Home from './routes/Home';
import AdminLayout from "./layouts/AdminLayout.tsx";
import AdminHome from './routes/admin/Home.tsx';
import AdminQuestions from "./routes/admin/Questions.tsx";
import QuizLayout from "./layouts/QuizLayout.tsx";
import {ChakraProvider} from "@chakra-ui/react";
import {system} from "./theme.ts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <QuizLayout/>,
        children: [
            {index: true, element: <Home/>},
            {
                path: '/admin',
                element: <AdminLayout/>,
                children: [
                    {index: true, element: <AdminHome/>},
                    {path: 'questions', element: <AdminQuestions/>},
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>
);
