import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store/Store"; // Named import
import App from "./App"; // Import App.jsx

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {" "}
          {/* Wrap with PersistGate */}
          <Router>
            <Toaster position="top-center" reverseOrder={false} />
            <App /> {/* Centralized component for routing and layout */}
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
