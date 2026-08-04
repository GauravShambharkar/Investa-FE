import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./components/Store/Store.tsx";
import { CLERK_PUBLISHABLE_KEY } from "./config/env.config.ts";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the env configuration");
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </Provider>
);
