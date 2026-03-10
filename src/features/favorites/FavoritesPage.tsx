import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { useGetTopTracksQuery, useGetTopArtistsQuery } from "./favoritesApi";
import { PATH_ROUTES } from "../../routes/Routes";

const TIME_RANGES = [
  { value: "short_term", label: "Last 4 Weeks" },
  { value: "medium_term", label: "Last 6 Months" },
  { value: "long_term", label: "All Time" },
];

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [timeRange, setTimeRange] = useState("medium_term");

  const { data: tracks, isLoading: tracksLoading } = useGetTopTracksQuery(timeRange, { skip: tab !== 0 });
  const { data: artists, isLoading: artistsLoading } = useGetTopArtistsQuery(timeRange, { skip: tab !== 1 });

  const isLoading = tab === 0 ? tracksLoading : artistsLoading;

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Button onClick={() => navigate(PATH_ROUTES.MAIN_PAGE)} sx={{ mb: 2 }}>← Back</Button>
      <Typography variant="h4" gutterBottom>Your Favourites</Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3, flexWrap: "wrap" }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="inherit">
          <Tab label="Top Tracks" />
          <Tab label="Top Artists" />
        </Tabs>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          size="small"
          sx={{ color: "white", ".MuiOutlinedInput-notchedOutline": { borderColor: "grey.600" } }}
        >
          {TIME_RANGES.map((r) => (
            <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : tab === 0
          ? tracks?.items.map((track, i) => (
              <Grid item xs={12} sm={6} md={3} key={track.id}>
                <Card sx={{ bgcolor: "background.paper" }}>
                  {track.album.images[0] && (
                    <CardMedia component="img" height="140" image={track.album.images[0].url} alt={track.name} />
                  )}
                  <CardContent>
                    <Typography variant="body2" fontWeight="bold">
                      {i + 1}. {track.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {track.artists.map((a) => a.name).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : artists?.items.map((artist, i) => (
              <Grid item xs={12} sm={6} md={3} key={artist.id}>
                <Card sx={{ bgcolor: "background.paper" }}>
                  {artist.images[0] && (
                    <CardMedia component="img" height="140" image={artist.images[0].url} alt={artist.name} />
                  )}
                  <CardContent>
                    <Typography variant="body2" fontWeight="bold">
                      {i + 1}. {artist.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {artist.genres.slice(0, 2).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default FavoritesPage;
