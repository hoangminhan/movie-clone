import { Col, Row } from "antd";
import { useHomePage } from "hooks/use-homepage";
import { useState } from "react";
import { useLayoutEffect } from "react";
import Iframe from "react-iframe";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Hero } from "./components";

const WatchMovieTv = () => {
  let { idDetail } = useParams();
  const { handleGetDetailMovie, dataDetail } = useHomePage();

  //   get data detail movie
  useLayoutEffect(() => {
    handleGetDetailMovie(idDetail, { api_key: process.env.REACT_APP_API_KEY });
  }, [idDetail]);

  const [currentUrl, setCurrentUrl] = useState("");
  const handleChangeUrl = (newUrl) => {
    setCurrentUrl(newUrl);
  };
  return (
    <div>
      <Row>
        <Col span={19}>
          {/* hero */}
          <Hero dataDetail={dataDetail} handleChangeUrl={handleChangeUrl} />
          <div className="h-[1000px] w-full mt-10">
            {currentUrl && (
              <Iframe
                src={currentUrl}
                height="800px"
                width="100%"
                allowFullScreen
              ></Iframe>
            )}
          </div>
        </Col>
        <Col span={5}>
          <div>Filter</div>
        </Col>
      </Row>
    </div>
  );
};

export default WatchMovieTv;
