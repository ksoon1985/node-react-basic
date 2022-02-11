import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

export default function App() {

  const NewLandingPage = Auth(LandingPage,null);
  const NewLoginPage = Auth(LoginPage,false);
  const NewRegisterPage = Auth(RegisterPage,false);

  return (
      <Routes>
        <Route path="/" element={<NewLandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<NewRegisterPage />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>

  );
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}



function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}


