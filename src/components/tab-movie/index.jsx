import { Col, Row } from "antd";
import { Banner, ComponentSlider, Filter } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabMovie = React.memo(() => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    listGenresMovie,
  } = useHomePage();

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={20}>
          <Banner />
          <ComponentSlider dataPopular={listMovie} />
          <ComponentSlider dataPopular={listMovieUpComing} title="Up Coming" />
          <ComponentSlider dataPopular={listTrending} title="Trending" />
          <ComponentSlider dataPopular={listMovieTopRated} title="Top Rated" />
        </Col>
        <Col span={4}>
          <Filter listGenresMovie={listGenresMovie} />
        </Col>
      </Row>
    </>
  );
});
