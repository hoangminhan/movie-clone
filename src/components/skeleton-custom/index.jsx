import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-title {
    width: 100% !important;
  }
  .ant-skeleton-paragraph li {
    width: 100% !important;
  }
`;

export const SkeletonCustom = ({ quantity = 5 }) => {
  return (
    <div className="flex justify-around gap-x-2 gap-y-8 flex-wrap my-5">
      {Array.from(Array(quantity).keys()).map((item, index) => {
        return (
          <div className="w-[250px] h-[185px]" key={index}>
            <StyledSkeleton active paragraph={{ rows: 5 }} />
          </div>
        );
      })}
    </div>
  );
};
