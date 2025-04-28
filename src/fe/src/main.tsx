import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home.tsx";
import Settings from "./Settings.tsx";
import { AuthProvider, AuthProviderProps, withAuthenticationRequired } from "react-oidc-context";
import { User, WebStorageStateStore } from "oidc-client-ts";
import axios from "axios";

function getUser() {
  const oidcStorage = localStorage.getItem(`oidc.user:https://alinflorin.eu.auth0.com:ALXKgMQsZO8PBldZOZB4P5ZShTxkeLYx`)
  if (!oidcStorage) {
      return null;
  }

  return User.fromStorageString(oidcStorage);
}

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

const oidcConfig: AuthProviderProps = {
  authority: "https://alinflorin.eu.auth0.com",
  client_id: "ALXKgMQsZO8PBldZOZB4P5ZShTxkeLYx",
  redirect_uri: window.location.origin + "/",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  scope: 'openid profile email',
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const SettingsPrivate = withAuthenticationRequired(Settings);

createRoot(document.getElementById("root")!).render(
  <AuthProvider {...oidcConfig}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<SettingsPrivate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
