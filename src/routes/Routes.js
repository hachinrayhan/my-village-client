import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../login/Login";
import Signup from "../login/Signup";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])