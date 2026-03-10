import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { useGetTopArtistsQuery } from "../favorites/favoritesApi";
import { useGetArtistTopTracksQuery } from "./recommendationsApi";
import { PATH_ROUTES } from "../../routes/Routes";

const TRACKS_PER_ARTIST = 5;

const ArtistSection = ({ artistId, artistName }: { artistId: string; artistName: string }) => {
  const { data, isLoading } = useGetArtistTopTracksQuery(artistId);

  if (isLoading) return <CircularProgress size={24} sx={{ display: "block", my: 1 }} />;
  if (!data) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "#2ebc58" }}>
        {artistName}
      </Typography>
      <List dense disablePadding>
        {data.tracks.slice(0, TRACKS_PER_ARTIST).map((track, i) => (
          <ListItem key={track.id} disablePadding sx={{ py: 0.5 }}>
            <ListItemAvatar>
              <Avatar
                src={track.album.images[0]?.url}
                variant="rounded"
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${i + 1}. ${track.name}`}
              secondary={track.album.name}
            />
            <Button
              size="small"
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener"
            >
              Open
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { data: topArtists, isLoading } = useGetTopArtistsQuery("medium_term");

  const top5 = topArtists?.items.slice(0, 5) ?? [];

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Button onClick={() => navigate(PATH_ROUTES.MAIN_PAGE)} sx={{ mb: 2 }}>← Back</Button>
      <Typography variant="h4" gutterBottom>Recommended for You</Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
        Top tracks from your most-played artists over the last 6 months
      </Typography>

      {isLoading && <CircularProgress sx={{ display: "block" }} />}

      {top5.map((artist, i) => (
        <Box key={artist.id}>
          {i > 0 && <Divider sx={{ mb: 3 }} />}
          <ArtistSection artistId={artist.id} artistName={artist.name} />
        </Box>
      ))}
    </Box>
  );
};

export default RecommendationsPage;
