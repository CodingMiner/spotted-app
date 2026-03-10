import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectIsLoggedIn } from "../features/authorization/authorizationSlice";
import { PATH_ROUTES } from "../routes/Routes";

const AuthGuard = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={PATH_ROUTES.EMPTY} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
