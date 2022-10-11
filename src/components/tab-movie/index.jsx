import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider, Filter } from "components";
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
      <Row gutter={[12, 12]}>
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
      </Row>
    </>
  );
});
