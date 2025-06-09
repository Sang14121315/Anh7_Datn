import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/layouts/auth.layout";

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
      </Route>
    </Routes>
  );
};

export default MainRouter;
