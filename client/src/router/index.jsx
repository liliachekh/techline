import { Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { LoginForm } from "../pages/LoginForm";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  );
}
