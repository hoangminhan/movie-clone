import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabTvShow = () => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    isLoading,
    isLoadingChangeTab,
  } = useHomePage();

  return (
    <div className="min-h-[100vh]">
      <>
        <Row gutter={[12, 12]}>
          {isLoadingChangeTab ? (
            <Skeleton active paragraph={{ rows: 20 }} />
          ) : (
            <Col span={24}>
              <Banner listTrending={listTrending} />
              <ComponentSlider dataPopular={listMovie} type="tv" />
              <ComponentSlider
                dataPopular={listMovieUpComing}
                title="Up Coming"
                type="tv"
              />
              <ComponentSlider
                dataPopular={listTrending}
                title="Trending"
                type="tv"
              />
              <ComponentSlider
                dataPopular={listMovieTopRated}
                title="Top Rated"
                type="tv"
              />
            </Col>
          )}
        </Row>
      </>
    </div>
  );
};
