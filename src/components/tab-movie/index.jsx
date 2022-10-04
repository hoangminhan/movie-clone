import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider, Filter } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabMovie = React.memo(() => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    isLoading,
    isLoadingChangeTab,
  } = useHomePage();

  return (
    <>
      <Row gutter={[12, 12]}>
        {isLoadingChangeTab ? (
          <Skeleton active paragraph={{ rows: 20 }} />
        ) : (
          <Col span={24}>
            <Banner listTrending={listTrending} isLoading={isLoading} />
            <ComponentSlider dataPopular={listMovie} type="movie" />
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
        )}
      </Row>
    </>
  );
});
