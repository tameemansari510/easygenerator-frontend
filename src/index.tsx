import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ErrorBoundary fallback={<ErrorFallback />}> */}
    <UserProvider>
      <App />
    </UserProvider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
