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

axios.defaults.baseURL = "http://localhost:8888";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/groups",
    element: <Boilerplate />,
    children: [
      { path: "", element: <GroupList /> },
      {
        path: "create",
        element: <CreateGroup />,
      },
      { path: ":groupId", element: <ViewGroup /> },
      { path: ":groupId/edit", element: <EditGroup /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
