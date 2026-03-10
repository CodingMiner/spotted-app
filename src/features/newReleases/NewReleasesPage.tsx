import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import { useGetNewReleasesQuery } from "./newReleasesApi";
import { PATH_ROUTES } from "../../routes/Routes";

const PAGE_SIZE = 20;

const NewReleasesPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;
  const { data, isLoading } = useGetNewReleasesQuery(offset);

  const totalPages = data ? Math.ceil(data.albums.total / PAGE_SIZE) : 1;

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Button onClick={() => navigate(PATH_ROUTES.MAIN_PAGE)} sx={{ mb: 2 }}>← Back</Button>
      <Typography variant="h4" gutterBottom>New Releases</Typography>

      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : data?.albums.items.map((album) => (
              <Grid item xs={12} sm={6} md={3} key={album.id}>
                <Card sx={{ bgcolor: "background.paper" }}>
                  <CardActionArea href={album.external_urls.spotify} target="_blank" rel="noopener">
                    {album.images[0] && (
                      <CardMedia component="img" height="160" image={album.images[0].url} alt={album.name} />
                    )}
                    <CardContent>
                      <Typography variant="body2" fontWeight="bold" noWrap>{album.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {album.artists.map((a) => a.name).join(", ")}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {album.release_date}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default NewReleasesPage;
