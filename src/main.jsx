import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import Login from "./components/Login";
import AuthProvider from "./provider/AuthProvider";
import Form from "./components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/registration",
        element: <Registration></Registration>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/form/:templateId/:formId",
        element: <Form></Form>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);