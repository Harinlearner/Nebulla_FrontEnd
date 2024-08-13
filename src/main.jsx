import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Users from "./Users";
import UserCreate from "./UserCreate";
// import UpdateUsers from "./UpdateUsers";
import UserLogin from "./UserLogin";
import BlogList from "./BlogList"
const router = createBrowserRouter([
  {
    path: "/main",
    element: <BlogList/>,
  },
  {
    path: "/register",
    element: <UserCreate/>,
  },
  {
    path: "/",
    element: <UserLogin/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);