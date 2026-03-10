import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { exchangeCode, selectIsLoggedIn } from "./authorizationSlice";
import { getAuthorizeHref } from "./oauthConfig";
import { AuthorizationButton } from "../../components/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { PATH_ROUTES } from "../../routes/Routes";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code && !isLoggedIn) {
      dispatch(exchangeCode(code)).then(() => {
        navigate(PATH_ROUTES.MAIN_PAGE);
      });
    }
  }, [code, isLoggedIn, dispatch, navigate]);

  const handleAuthorizationButton = async () => {
    const href = await getAuthorizeHref();
    window.location.href = href;
  };

  if (code && !isLoggedIn) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "50px" }}>
      <AuthorizationButton variant="contained" color="primary" onClick={handleAuthorizationButton}>
        Log in to Spotify
      </AuthorizationButton>
    </Box>
  );
};

export default Authorization;
