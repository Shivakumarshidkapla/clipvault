import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PublicClipboardPage from "../pages/PublicClipboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/public/:code",
    element: <PublicClipboardPage />,
  },
]);