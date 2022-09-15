import { Col, Row } from "antd";
import { useHomePage } from "hooks/use-homepage";
import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Hero } from "./components";

const WatchMovieTv = () => {
  let { idDetail } = useParams();
  const { handleGetDetailMovie, dataDetail } = useHomePage();

  //   get data detail movie
  useLayoutEffect(() => {
    console.log("get detail");
    handleGetDetailMovie(idDetail, { api_key: process.env.REACT_APP_API_KEY });
  }, [idDetail]);
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col span={18}>
          {/* hero */}
          <Row>
            <Hero dataDetail={dataDetail} />
          </Row>
        </Col>
        <Col span={6}>
          <div>Filter</div>
        </Col>
      </Row>
    </div>
  );
};

export default WatchMovieTv;
