import { useAppSelector } from "../../hooks";
import { selectDisplayName, selectProduct } from "../authorization/authorizationSlice";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UserInfo = () => {
  const displayName = useAppSelector(selectDisplayName);
  const product = useAppSelector(selectProduct);

  return (
    <Box sx={{ color: "white" }}>
      {displayName && (
        <Typography sx={{ mt: "20px", fontSize: "17px", fontFamily: "Dosis" }}>
          You are currently logged in as {displayName}
        </Typography>
      )}
      {product && (
        <Typography sx={{ mt: "10px", fontSize: "17px", fontFamily: "Dosis" }}>
          Your subscription type is {product}
        </Typography>
      )}
    </Box>
  );
};

export default UserInfo;
