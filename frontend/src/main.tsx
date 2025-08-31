import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SnackbarProvider
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
