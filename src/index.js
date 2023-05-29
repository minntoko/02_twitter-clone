import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserDataProvider } from "./components/providers/userDataProvider";
import { TweetProvider } from "./components/providers/tweetProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <UserDataProvider>
      <TweetProvider>
        <App />
      </TweetProvider>
    </UserDataProvider>
  // </React.StrictMode>
);
