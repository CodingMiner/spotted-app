import { Routes, Route } from "react-router-dom";
import WelcomePage from "./screens/WelcomePage";
import MainPage from "./screens/MainPage";
import AuthGuard from "./components/AuthGuard";
import PlaylistsPage from "./features/playlists/PlaylistsPage";
import FavoritesPage from "./features/favorites/FavoritesPage";
import NewReleasesPage from "./features/newReleases/NewReleasesPage";
import RecommendationsPage from "./features/recommendations/RecommendationsPage";
import ProfilePage from "./features/profile/ProfilePage";
import { PATH_ROUTES } from "./routes/Routes";

const App = () => {
  return (
    <Routes>
      <Route path={PATH_ROUTES.EMPTY} element={<WelcomePage />} />
      <Route element={<AuthGuard />}>
        <Route path={PATH_ROUTES.MAIN_PAGE} element={<MainPage />} />
        <Route path={PATH_ROUTES.PLAYLISTS} element={<PlaylistsPage />} />
        <Route path={PATH_ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={PATH_ROUTES.NEW_RELEASES} element={<NewReleasesPage />} />
        <Route path={PATH_ROUTES.RECOMMENDATIONS} element={<RecommendationsPage />} />
        <Route path={PATH_ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
