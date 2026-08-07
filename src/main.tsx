import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import "./index.css";
import { AuthProvider } from "./provider/auth-provider";
import router from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <AuthProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </AuthProvider>
      <Toaster position="top-right" />
    </>
  </StrictMode>,
);
