import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const AuthorizationButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 20,
  fontWeight: 800,
  letterSpacing: "1px",
  color: "#ffffff",
  padding: "12px 56px",
  lineHeight: 1.5,
  backgroundColor: "#2ebc58",
  borderColor: "#2ebc58",
  borderRadius: 30,
  "&:hover": {
    backgroundColor: "#2E8B57",
    borderColor: "#2E8B57",
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: "#2E8B57",
    borderColor: "#2E8B57",
    boxShadow: "none",
  },
});
