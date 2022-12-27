import { TabMovie } from "components";
import { UserContext } from "contexts";
import { useHomePage } from "hooks/use-homepage";
import React, { useContext, useEffect } from "react";
import { useState } from "react";

const HomePage = ({ children }) => {
  const stateContext = useContext(UserContext);
  const { handleGetApiForMovieAndTvPage } = useHomePage();
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoadingMovie(true);
      await handleGetApiForMovieAndTvPage();
      setIsLoadingMovie(false);
    };
    getData();
  }, [stateContext.localeGlobal[0], stateContext.currentTabGlobal[0]]);

  return (
    <div className="py-6">
      <TabMovie isLoading={isLoadingMovie} />
    </div>
  );
};

export default HomePage;
