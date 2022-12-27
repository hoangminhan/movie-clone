import { Col, Row, Skeleton } from "antd";
import { Banner, ComponentSlider, Filter, SkeletonCustom } from "components";
import { useTitle } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

export const TabMovie = React.memo(({ isLoading }) => {
  const {
    listMovie,
    listTrending,
    listMovieTopRated,
    listMovieUpComing,
    isLoadingChangeTab,
  } = useHomePage();
  const { handleChangeTitle } = useTitle();
  const [t] = useTranslation();
  useEffect(() => {
    handleChangeTitle(t("Home page"));
  }, []);

  return (
    <>
      <div className="min-h-[100vh]">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div className="relative">
              <Banner listTrending={listTrending} isLoading={isLoading} />
              <ComponentSlider
                dataPopular={listMovie}
                type="movie"
                isLoading={isLoading}
              />
            </div>
            <ComponentSlider
              dataPopular={listMovieUpComing}
              isLoading={isLoading}
              title="Up Coming"
              type="movie"
            />
            <ComponentSlider
              dataPopular={listTrending}
              isLoading={isLoading}
              title="Trending"
              type="movie"
            />
            <ComponentSlider
              dataPopular={listMovieTopRated}
              isLoading={isLoading}
              title="Top Rated"
              type="movie"
            />
          </Col>
        </Row>
      </div>
    </>
  );
});
