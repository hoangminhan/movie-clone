import { TabMovie, TabSeries, TabTvShow } from "components";
import { DefaultLayout } from "layout";
import { lazy } from "react";

const NotFound = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page/index"));
const LoginPage = lazy(() => import("./pages/login-page"));
const RegisterPage = lazy(() => import("./pages/register-page"));
const PeoplePage = lazy(() => import("./pages/people-page"));
const DiscoveryPage = lazy(() => import("./pages/discovery-page"));
const CastPage = lazy(() => import("./pages/cast-page"));
const WatchMovieTv = lazy(() => import("./pages/watch-movie-tv"));

//  const RouteList = [
//   {
//     path: "*",
//     component: NotFound,
//     layout: null,
//   },
//   {
//     path: "/",
//     component: HomePage,
//     layout: true,
//     routes: [
//       {
//         component: TabMovie,
//         layout: true,
//       },
//       {
//         path: "/tab-tv-show",
//         component: TabTvShow,
//         layout: true,
//       },
//     ],
//   },
//   {
//     path: "/movie",
//     component: PageMovie,
//     layout: true,
//   },
// ];
let RouteList = [
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: (
      <DefaultLayout showTab>
        <HomePage />
      </DefaultLayout>
    ),
    children: [
      {
        index: true,
        element: <TabMovie />,
      },
      {
        element: <TabTvShow />,
        path: "/tv-show",
      },
      {
        element: <PeoplePage />,
        path: "/people",
      },
    ],
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
    path: "/discovery",
    element: (
      <DefaultLayout showTab>
        <DiscoveryPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/cast/:idCast",
    element: (
      <DefaultLayout>
        <CastPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/movie/:idDetail",
    element: (
      <DefaultLayout>
        <WatchMovieTv />
      </DefaultLayout>
    ),
  },
];
export default RouteList;
