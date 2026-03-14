import {createBrowserRouter} from "react-router";

import Login from "../src/Feature/auth/Pages/Login";
import Register from "../src/Feature/auth/Pages/Register";
import HomePage from "./Feature/Home/Pages/Home";
import Protected from "./Feature/auth/Components./Protected";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Protected><HomePage/></Protected>
    },
    {
        path: "/login",
        element: <Login/>
    },{
        path:'/register',
        element:<Register/>
    }
]);

export default router;