import { useHomePage } from "hooks/use-homepage";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { handleGetMovie, handleGetListTrending } = useHomePage();
  useEffect(() => {
    const getDataApi = async () => {
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

      const type = "movie";
      await handleGetListTrending(
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        type
      );
      await handleGetMovie("popular", {
        page: 1,
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      await handleGetMovie("top_rated", {
        page: 1,
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
      await handleGetMovie("upcoming", {
        page: 1,
        api_key: process.env.REACT_APP_API_KEY,
        language: locale,
      });
    };
    getDataApi();
  }, []);
  return (
    <div className="py-8">
      <Outlet />
    </div>
  );
};

export default HomePage;
