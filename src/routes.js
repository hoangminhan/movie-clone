import { TabMovie, TabSeries, TabTvShow } from "components";
import { DefaultLayout } from "layout";
import { lazy } from "react";

const NotFound = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page/index"));
const PageMovie = lazy(() => import("./pages/movie-page"));
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
      },
      {
        element: <TabSeries />,
      },
    ],
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
