import { apiTrending } from "api";
import { Banner } from "components";
import React, { useEffect } from "react";

export const TabMovie = () => {
  const { getListTrendning } = apiTrending;
  useEffect(() => {
    getListTrendning("movie/day", {
      api_key: "aa4558fea3d7089f201a6677b51c63e7",
    });
  }, []);
  return (
    <div>
      TabMovie
      <Banner />
    </div>
  );
};
