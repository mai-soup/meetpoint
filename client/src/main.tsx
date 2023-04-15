import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./routes/LandingPage.js";
import CreateGroup from "./routes/CreateGroup.js";
import GroupList from "./routes/GroupList.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ViewGroup from "./routes/ViewGroup.js";
import axios from "axios";
import EditGroup from "./routes/EditGroup.js";
import Boilerplate from "./routes/Boilerplate.js";
import Signup from "./routes/Signup.js";
import Login from "./routes/Login.js";
import { UsersProvider } from "./context/UsersContext.js";
import LogOut from "./routes/LogOut.js";

axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <Boilerplate />,
    children: [
      {
        path: "/groups",
        element: <GroupList />,
      },
      {
        path: "/groups/create",
        element: <CreateGroup />,
      },
      { path: "/groups/:groupId/edit", element: <EditGroup /> },
      { path: "/groups/:groupId", element: <ViewGroup /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <LogOut /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UsersProvider>
      <RouterProvider router={router} />
    </UsersProvider>
  </React.StrictMode>
);
