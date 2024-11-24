import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../views/home/Home.jsx";
import Login from "../views/login/Login";

const AuthRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <AuthRoute><Home /></AuthRoute>,
    }
])

export default router