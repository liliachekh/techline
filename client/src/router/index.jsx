import { Route, Routes } from "react-router-dom";
import { Home, LoginForm, ResetPassword } from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/password-reset" element={<ResetPassword />}></Route>
    </Routes>
  );
}
