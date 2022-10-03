import { Col, Row } from "antd";
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
  } = useHomePage();

  return (
    <div className="min-h-[100vh]">
      <>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Banner listTrending={listTrending} />
            <ComponentSlider dataPopular={listMovie} />
            <ComponentSlider
              dataPopular={listMovieUpComing}
              title="Up Coming"
            />
            <ComponentSlider dataPopular={listTrending} title="Trending" />
            <ComponentSlider
              dataPopular={listMovieTopRated}
              title="Top Rated"
            />
          </Col>
        </Row>
      </>
    </div>
  );
};
