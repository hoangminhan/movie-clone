import { lazy } from "react";

const NotFound = lazy(() => import("./pages/not-found"));
const HomePage = lazy(() => import("./pages/home-page/index"));
const PageMovie = lazy(() => import("./pages/movie-page"));

export const RouteList = [
  {
    path: "*",
    component: NotFound,
    layout: null,
  },
  {
    path: "/",
    component: HomePage,
    layout: true,
  },
  {
    path: "/movie",
    component: PageMovie,
    layout: true,
  },
];
export default RouteList;
