import { useHomePage } from "hooks/use-homepage";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { handleGetMovie, handleGetListTrending } = useHomePage();
  // console.log({ listMovie, detail });
  useEffect(() => {
    const getDataApi = async () => {
      const type = "movie";
      await handleGetListTrending(
        {
          api_key: process.env.REACT_APP_API_KEY,
        },
        type
      );
      await handleGetMovie("popular", {
        page: 1,
        api_key: process.env.REACT_APP_API_KEY,
      });
      await handleGetMovie("top_rated", {
        page: 1,
        api_key: process.env.REACT_APP_API_KEY,
      });
    };
    getDataApi();
  }, []);
  return (
    <div className="pt-8">
      <Outlet />
    </div>
  );
};

export default HomePage;
