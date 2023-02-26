import React, { useMemo, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { getMode, getToken, getUser } from "./store";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import HomePage from "./scenes/homepage/Index";
import AuthOptions from "./scenes/Auth/AuthOptions";
import ManualAuth from "./scenes/Auth/ManualAuth";
import ProfilePage from "./scenes/profilePage/Index";
import MyProfile from "./scenes/profilePage/MyProfile";
import Success from "./scenes/Auth/AfterAuth/Success";
import {
  setLogin,
  getMode,
  getToken,
  getUser,
  getIsAuth,
  changeAuth,
} from "./store/index";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const isAuth = useSelector(getIsAuth);

  useEffect(() => {
    let timerOut = setTimeout(() => {
      console.log("............TIMEOUT-RELOAD-AFTER-LOGIN..............");
      fetch("https://socially-backend.onrender.com/isAuth", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.isAuth) {
            const calculated_isAuth = Boolean(token && user);

            return dispatch(changeAuth({ isAuth: calculated_isAuth }));
          }

          dispatch(changeAuth({ isAuth: data.isAuth }));
          dispatch(setLogin({ user: data.user, token: null }));
        });
    }, 5000);

    return () => {
      clearTimeout(timerOut);
    };
  });

  const mode = useSelector(getMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/auth"
            element={!isAuth ? <AuthOptions /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuth ? <HomePage /> : <Navigate to="/auth" />}
          />

          <Route
            path="/auth/manual"
            element={isAuth ? <Navigate to="/" /> : <ManualAuth />}
          />
          <Route
            path="/my-profile/"
            element={isAuth ? <MyProfile /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />}
          />
          <Route path="/auth/success" element={<Success />} />
          <Route />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
