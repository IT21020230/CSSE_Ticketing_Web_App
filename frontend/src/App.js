import { lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

const SignInPage = lazy(() => import("./pages/client/signIn"));
const SignUpPage = lazy(() => import("./pages/client/SignUp"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/signIn" />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
