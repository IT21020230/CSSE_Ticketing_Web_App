import { lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";

const SignInPage = lazy(() => import("./pages/client/signIn"));
const SignUpPage = lazy(() => import("./pages/client/SignUp"));
const HomePage = lazy(() => import("./pages/client/home"));
const UserPage = lazy(() => import("./pages/client/user"));

const PassengerPage = lazy(() => import("./pages/admin/passenger"));

const BalanceUpdatePage = lazy(() => import("./pages/client/balanceUpdate"))



function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/signIn" />}
            />
            {/* <Route path="/signIn" element={<SignInPage />} /> */}
            <Route
              path="/signIn"
              element={!user ? <SignInPage /> : <Navigate to="/home" />}
            />
            <Route
              path="/signUp"
              element={!user ? <SignUpPage /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={user ? <HomePage /> : <Navigate to="/signIn" />}
            />
            <Route
              path="/user"
              element={user ? <UserPage /> : <Navigate to="/signIn" />}
            />
            <Route
              path="/passengers"
              element={user ? <PassengerPage /> : <Navigate to="/signIn" />}
            />

            <Route
              path="/balanceUpdate"
              element={user ? <BalanceUpdatePage /> : <Navigate to="/signIn" />}
            />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
