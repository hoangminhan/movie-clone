import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider, Filter, SkeletonCustom } from "components";
import { useTitle } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const TabMovie = React.memo(() => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    isLoading,
    isLoadingChangeTab,
  } = useHomePage();
  const { handleChangeTitle } = useTitle();
  const [t] = useTranslation();
  useEffect(() => {
    handleChangeTitle(t("Home page"));
  }, []);

  return (
    <>
      {listTrending.length ? (
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div className="relative">
              <Banner listTrending={listTrending} isLoading={isLoading} />
              <ComponentSlider dataPopular={listMovie} type="movie" />
            </div>
            <ComponentSlider
              dataPopular={listMovieUpComing}
              title="Up Coming"
              type="movie"
            />
            <ComponentSlider
              dataPopular={listTrending}
              title="Trending"
              type="movie"
            />
            <ComponentSlider
              dataPopular={listMovieTopRated}
              title="Top Rated"
              type="movie"
            />
          </Col>
        </Row>
      ) : (
        <SkeletonCustom quantity={15} />
      )}
    </>
  );
});
