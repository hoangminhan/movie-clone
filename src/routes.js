import { TabMovie, TabSeries, TabTvShow } from "components";
import { DefaultLayout } from "layout";

import { lazy } from "react";

const NotFound = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page/index"));
const PageMovie = lazy(() => import("./pages/movie-page"));

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
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
    children: [
      {
        index: true,
        element: <TabMovie />,
      },
      {
        path: "tab-tv-show",
        element: <TabTvShow />,
      },
      {
        path: "tab-series",
        element: <TabSeries />,
      },
    ],
  },
  {
    path: "/movie",
    element: (
      <DefaultLayout>
        <PageMovie />
      </DefaultLayout>
    ),
  },
];
export default RouteList;
