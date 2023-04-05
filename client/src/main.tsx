import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./routes/LandingPage.js";
import CreateMeetup from "./routes/CreateMeetup.js";
import MeetupList from "./routes/MeetupList.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/createmeetup",
    element: <CreateMeetup />,
  },
  {
    path: "/meetups",
    element: <MeetupList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
