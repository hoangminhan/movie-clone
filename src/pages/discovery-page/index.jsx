import { Col, Row } from "antd";
import { Filter } from "components";
import React from "react";

const DiscoveryPage = () => {
  return (
    <div>
      <Row>
        <Col span={4}>
          <Filter />
          {/* <Filter listGenresMovie={listGenresMovie} /> */}
        </Col>
      </Row>
    </div>
  );
};
export default DiscoveryPage;
