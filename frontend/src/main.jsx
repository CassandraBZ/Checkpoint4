import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import CurrentUserContextProvider from "./contexts/CurrentUserContext";
import CategoryContextProvider from "./contexts/CategoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CurrentUserContextProvider>
      <CategoryContextProvider>
        <Router>
          <App />
        </Router>
      </CategoryContextProvider>
    </CurrentUserContextProvider>
  </React.StrictMode>
);
