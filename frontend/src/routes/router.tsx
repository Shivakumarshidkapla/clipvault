import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PublicClipboardPage from "../pages/PublicClipboardPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import RegisterPage from "@/pages/RegisterPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import GuestRoute from "@/components/auth/GuestRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <GuestRoute>
                <HomePage />
            </GuestRoute>
        ),
    },
  {
    path: "/public/:code",
    element: <PublicClipboardPage />,
  },
  {
    path: "/login",
    element: (
        <GuestRoute>
            <LoginPage />
        </GuestRoute>
    ),
},
  {
    path: "/dashboard",
    element: (
        <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
        <GuestRoute>
            <RegisterPage />
        </GuestRoute>
    ),
},
]);