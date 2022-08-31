import { Banner, Popular } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabMovie = React.memo(() => {
  const { listMovie } = useHomePage();

  return (
    <div>
      <Banner />
      <Popular dataPopular={listMovie} />
    </div>
  );
});
