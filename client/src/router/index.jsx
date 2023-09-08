import { Route, Routes } from "react-router-dom";
import { Home} from "../pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}
