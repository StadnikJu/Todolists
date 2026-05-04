import { Main } from "@/app/Main";
import { Login } from "@/features/auth/ui/Login/Login";
import { Route, Routes } from "react-router";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { ProtectedRoutes } from "../Protected/ProtectedRoutes";
import { useAppSelector } from "@/common/hooks";
import { selectIsLoggedIn } from "@/features/auth/model/slices/auth-slice";

export const Path = {
  Main: "/",
  Login: "/login",
  NotFound: "*",
} as const;

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route element={<ProtectedRoutes isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
