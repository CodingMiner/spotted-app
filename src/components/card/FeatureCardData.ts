import { ElementType } from "react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import TuneIcon from "@mui/icons-material/Tune";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { PATH_ROUTES } from "../../routes/Routes";

interface FeatureData {
  id: string;
  text: string;
  title: string;
  route: string;
  icon: ElementType;
}

export const featuresData: FeatureData[] = [
  {
    id: "1",
    text: "Create your own playlist with the best songs from your favourite artists!",
    title: "Create a Playlist",
    route: PATH_ROUTES.PLAYLISTS,
    icon: QueueMusicIcon,
  },
  {
    id: "2",
    text: "See your most listened to artists and favourite tracks",
    title: "Your Favourite",
    route: PATH_ROUTES.FAVORITES,
    icon: FavoriteIcon,
  },
  {
    id: "3",
    text: "Get all new releases on Spotify and let yourself be amazed",
    title: "New Releases",
    route: PATH_ROUTES.NEW_RELEASES,
    icon: NewReleasesIcon,
  },
  {
    id: "4",
    text: "Spotify recommendations which match your music taste",
    title: "Get Recommendations",
    route: PATH_ROUTES.RECOMMENDATIONS,
    icon: TuneIcon,
  },
  {
    id: "5",
    text: "Why not make some changes? Quickly update your profile",
    title: "Edit Your Profile",
    route: PATH_ROUTES.PROFILE,
    icon: AccountCircleIcon,
  },
];
