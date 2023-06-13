import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Layout from "./Pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
