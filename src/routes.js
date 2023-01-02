import { TabMovie, TabSeries, TabTvShow } from "components";
import { PrivateRouter } from "components/commons";
import { DefaultLayout } from "layout";

import { lazy } from "react";

const NotFound = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page/index"));
const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));
const PeoplePage = lazy(() => import("./pages/people-page"));
const DiscoveryPage = lazy(() => import("./pages/discovery-page"));
const SearchPage = lazy(() => import("./pages/search-page"));
const KeywordPage = lazy(() => import("./pages/keyword-page"));
const GenresPage = lazy(() => import("./pages/genres-page"));
const CastPage = lazy(() => import("./pages/cast-page"));
const UserPage = lazy(() => import("./pages/user-page"));
const BookMarkedPage = lazy(() => import("./pages/bookmark-page"));
const HistoryPage = lazy(() => import("./pages/history-page"));
const WatchMovieTv = lazy(() => import("./pages/watch-movie-tv"));

let RouteList = [
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: (
      <DefaultLayout showTab>
        <HomePage />
      </DefaultLayout>
    ),
  },

  {
    path: "/tv-show",
    element: (
      <DefaultLayout showTab>
        <TabTvShow />
      </DefaultLayout>
    ),
  },
  {
    path: "/people",
    element: (
      <DefaultLayout showTab>
        <PeoplePage />
      </DefaultLayout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/account",
    element: (
      <DefaultLayout page="Account Settings">
        <PrivateRouter>
          <UserPage />
        </PrivateRouter>
      </DefaultLayout>
    ),
  },
  {
    path: "/discovery",
    element: (
      <DefaultLayout page="discovery">
        <DiscoveryPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/search",
    element: (
      <DefaultLayout page="Search">
        <SearchPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/favorite",
    element: (
      <DefaultLayout page="Favorite">
        <PrivateRouter>
          <BookMarkedPage />
        </PrivateRouter>
      </DefaultLayout>
    ),
  },
  {
    path: "/history",
    element: (
      <DefaultLayout page="History">
        <PrivateRouter>
          <HistoryPage />
        </PrivateRouter>
      </DefaultLayout>
    ),
  },
  {
    path: "/keyword/:idKeyword",
    element: (
      <DefaultLayout page="keyword">
        <KeywordPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/genres/:id",
    element: (
      <DefaultLayout page="genres">
        <GenresPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/cast/:idCast",
    element: (
      <DefaultLayout page="Cast">
        <CastPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/:type/:idDetail",
    element: (
      <DefaultLayout page="movie">
        <WatchMovieTv />
      </DefaultLayout>
    ),
  },
];
export default RouteList;
