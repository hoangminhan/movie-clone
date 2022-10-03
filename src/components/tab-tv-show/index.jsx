import { Col, Row } from "antd";
import { Banner } from "components";
import { useHomePage } from "hooks/use-homepage";
import React from "react";

export const TabTvShow = () => {
  const { listTrending } = useHomePage();

  return (
    <div>
      {" "}
      <>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Banner listTrending={listTrending} />
            {/* <ComponentSlider dataPopular={listMovie} />
      <ComponentSlider dataPopular={listMovieUpComing} title="Up Coming" />
      <ComponentSlider dataPopular={listTrending} title="Trending" />
      <ComponentSlider dataPopular={listMovieTopRated} title="Top Rated" /> */}
          </Col>
        </Row>
      </>
    </div>
  );
};
