import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider, SkeletonCustom } from "components";
import { UserContext } from "contexts";
import { useTitle } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

export const TabTvShow = () => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    handleGetApiForMovieAndTvPage,
    isLoading,
  } = useHomePage();
  const { handleChangeTitle } = useTitle();
  const stateContext = useContext(UserContext);
  const [isLoadingTvShow, setIsLoadingTvShow] = useState(false);

  useEffect(() => {
    handleChangeTitle("Tv - show");
  }, []);
  useEffect(() => {
    const getData = async () => {
      setIsLoadingTvShow(true);

      const result = await handleGetApiForMovieAndTvPage();
      setIsLoadingTvShow(false);
    };
    getData();
  }, [stateContext.localeGlobal[0], stateContext.currentTabGlobal[0]]);
  return (
    <div className="min-h-[100vh] py-6">
      <>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Banner listTrending={listTrending} isLoading={isLoadingTvShow} />
            <ComponentSlider
              dataPopular={listMovie}
              isLoading={isLoadingTvShow}
              type="tv"
            />
            <ComponentSlider
              dataPopular={listMovieUpComing}
              isLoading={isLoadingTvShow}
              title="Up Coming"
              type="tv"
            />
            <ComponentSlider
              dataPopular={listTrending}
              isLoading={isLoadingTvShow}
              title="Trending"
              type="tv"
            />
            <ComponentSlider
              dataPopular={listMovieTopRated}
              isLoading={isLoadingTvShow}
              title="Top Rated"
              type="tv"
            />
          </Col>
        </Row>
      </>
    </div>
  );
};
