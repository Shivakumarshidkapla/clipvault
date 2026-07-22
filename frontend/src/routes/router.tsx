import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PublicClipboardPage from "../pages/PublicClipboardPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import RegisterPage from "@/pages/RegisterPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/public/:code",
    element: <PublicClipboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);