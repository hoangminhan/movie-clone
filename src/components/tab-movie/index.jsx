import { Banner, ComponentSlider } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabMovie = React.memo(() => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
  } = useHomePage();

  return (
    <>
      <Banner />
      <ComponentSlider dataPopular={listMovie} />
      <ComponentSlider dataPopular={listMovieUpComing} title="Up Coming" />
      <ComponentSlider dataPopular={listTrending} title="Trending" />
      <ComponentSlider dataPopular={listMovieTopRated} title="Top Rated" />
    </>
  );
});
