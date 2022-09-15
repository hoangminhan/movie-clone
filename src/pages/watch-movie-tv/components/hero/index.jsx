import { Col, Row } from "antd";
import { ImageCustom } from "components";
import React from "react";
import { getImage } from "utils";

export const Hero = ({ dataDetail }) => {
  console.log({ dataDetail });
  return (
    <Row>
      <Col span={24}>
        <div className="max-h-[400px] w-full">
          <ImageCustom
            src={getImage(dataDetail.backdrop_path)}
            className="object-contain"
          />
          {/* <img src={getImage(dataDetail.backdrop_path)} alt="" /> */}
        </div>
      </Col>
    </Row>
  );
};
