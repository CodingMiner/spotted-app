import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useGetProfileQuery, useUpdateDisplayNameMutation } from "./profileApi";
import { PATH_ROUTES } from "../../routes/Routes";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateName, { isLoading: updating }] = useUpdateDisplayNameMutation();
  const [editName, setEditName] = useState("");
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (profile) setEditName(profile.display_name || "");
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateName(editName).unwrap();
      setSnackbar({ open: true, message: "Profile updated!", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to update profile", severity: "error" });
    }
  };

  return (
    <Box sx={{ p: 4, color: "white", maxWidth: 600, mx: "auto" }}>
      <Button onClick={() => navigate(PATH_ROUTES.MAIN_PAGE)} sx={{ mb: 2 }}>← Back</Button>
      <Typography variant="h4" gutterBottom>Your Profile</Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      ) : profile ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {profile.images[0] ? (
            <Avatar src={profile.images[0].url} sx={{ width: 100, height: 100 }} />
          ) : (
            <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
              {profile.display_name?.[0]?.toUpperCase()}
            </Avatar>
          )}

          <Box>
            <Typography color="text.secondary">Display Name</Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
              <TextField
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                size="small"
                sx={{ input: { color: "white" } }}
              />
              <Button variant="contained" onClick={handleSave} disabled={updating || editName === profile.display_name}>
                {updating ? <CircularProgress size={20} /> : "Save"}
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography color="text.secondary">Email</Typography>
            <Typography>{profile.email}</Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">Subscription</Typography>
            <Typography sx={{ textTransform: "capitalize" }}>{profile.product}</Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">Country</Typography>
            <Typography>{profile.country}</Typography>
          </Box>

          <Box>
            <Typography color="text.secondary">Followers</Typography>
            <Typography>{profile.followers.total.toLocaleString()}</Typography>
          </Box>

          <Button
            variant="outlined"
            href={profile.external_urls.spotify}
            target="_blank"
            rel="noopener"
          >
            Open in Spotify
          </Button>
        </Box>
      ) : null}

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;
