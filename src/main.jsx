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
import Header from "./components/Header";
import PrivateRouter from "./components/PrivateRouter";

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
        path: "/form/:templateId/:formId",
        element: <Form></Form>
      },
      {
        path: "/header",
        element: <PrivateRouter><Header></Header></PrivateRouter>
      }
    ]
  },


  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/registration",
    element: <Registration></Registration>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);