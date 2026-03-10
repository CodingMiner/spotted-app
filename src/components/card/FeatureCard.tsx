import { ElementType } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface FeatureCardProps {
  text: string;
  title: string;
  route: string;
  icon: ElementType;
}

const FeatureCard = ({ text, title, route, icon: Icon }: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate(route)}>
      <CardActionArea sx={{ height: "100%" }}>
        <Box
          sx={{
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(46, 188, 88, 0.12)",
          }}
        >
          <Icon sx={{ fontSize: 72, color: "#2ebc58" }} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.primary" component="p">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FeatureCard;
