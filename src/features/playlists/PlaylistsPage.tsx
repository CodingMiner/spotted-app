import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  useGetUserPlaylistsQuery,
  useCreatePlaylistMutation,
  useAddTracksToPlaylistMutation,
  useSearchTracksQuery,
  useGetCurrentUserQuery,
} from "./playlistsApi";
import { PATH_ROUTES } from "../../routes/Routes";

const PlaylistsPage = () => {
  const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedUris, setSelectedUris] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: user } = useGetCurrentUserQuery();
  const { data: playlists, isLoading: loadingPlaylists } = useGetUserPlaylistsQuery();
  const { data: searchResults, isFetching: searching } = useSearchTracksQuery(searchQuery, {
    skip: !searchQuery,
  });
  const [createPlaylist, { isLoading: creating }] = useCreatePlaylistMutation();
  const [addTracks] = useAddTracksToPlaylistMutation();

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const toggleTrack = (uri: string) => {
    setSelectedUris((prev) =>
      prev.includes(uri) ? prev.filter((u) => u !== uri) : [...prev, uri]
    );
  };

  const handleCreate = async () => {
    if (!playlistName || !user) return;
    try {
      const playlist = await createPlaylist({ userId: user.id, name: playlistName }).unwrap();
      if (selectedUris.length > 0) {
        await addTracks({ playlistId: playlist.id, uris: selectedUris }).unwrap();
      }
      setSnackbar({ open: true, message: "Playlist created!", severity: "success" });
      setPlaylistName("");
      setSelectedUris([]);
    } catch {
      setSnackbar({ open: true, message: "Failed to create playlist", severity: "error" });
    }
  };

  return (
    <Box sx={{ p: 4, color: "white" }}>
      <Button onClick={() => navigate(PATH_ROUTES.MAIN_PAGE)} sx={{ mb: 2 }}>← Back</Button>
      <Typography variant="h4" gutterBottom>Create a Playlist</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          sx={{ input: { color: "white" }, label: { color: "grey.400" } }}
        />
        <Button variant="contained" onClick={handleCreate} disabled={!playlistName || creating}>
          {creating ? <CircularProgress size={20} /> : "Create"}
        </Button>
      </Box>

      {selectedUris.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="grey.400">{selectedUris.length} tracks selected</Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search tracks"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          sx={{ input: { color: "white" }, label: { color: "grey.400" } }}
        />
        <Button variant="outlined" onClick={handleSearch}>Search</Button>
      </Box>

      {searching && <CircularProgress />}

      {searchResults?.tracks.items && (
        <List dense>
          {searchResults.tracks.items.map((track) => (
            <ListItem key={track.id} disablePadding>
              <ListItemButton onClick={() => toggleTrack(track.uri)}>
                <ListItemText
                  primary={track.name}
                  secondary={track.artists.map((a) => a.name).join(", ")}
                />
                {selectedUris.includes(track.uri) && <Chip label="Selected" size="small" color="primary" />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Your Playlists</Typography>
      {loadingPlaylists ? (
        <CircularProgress />
      ) : (
        <List dense>
          {playlists?.items.map((p) => (
            <ListItem key={p.id}>
              <ListItemText primary={p.name} secondary={`${p.tracks.total} tracks`} />
            </ListItem>
          ))}
        </List>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default PlaylistsPage;
