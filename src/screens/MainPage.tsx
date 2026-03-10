import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout, selectDisplayName, selectProduct } from "../features/authorization/authorizationSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { PATH_ROUTES } from "../routes/Routes";
import FeatureCard from "../components/card/FeatureCard";
import { featuresData } from "../components/card/FeatureCardData";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const displayName = useAppSelector(selectDisplayName);
  const product = useAppSelector(selectProduct);

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATH_ROUTES.EMPTY);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button variant="outlined" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ color: "white" }}>
          Now you can enjoy all the features of Spotted!
        </Typography>
        <Box sx={{ mt: "20px" }}>
          {displayName && (
            <Typography variant="body1" sx={{ mt: "20px", color: "white" }}>
              You are currently logged in as {displayName}
            </Typography>
          )}
          {product && (
            <Typography variant="body1" sx={{ mt: "10px", color: "white" }}>
              Your subscription type is {product}
            </Typography>
          )}
        </Box>
        <Typography variant="h5" sx={{ color: "white", mt: "20px" }}>
          Please select one of the options below
        </Typography>
      </Box>
      <Box sx={{ px: 4, pb: 6 }}>
        <Grid container spacing={3} justifyContent="center">
          {featuresData.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <FeatureCard text={card.text} title={card.title} route={card.route} icon={card.icon} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MainPage;
