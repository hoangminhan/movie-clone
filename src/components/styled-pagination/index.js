const { Pagination } = require("antd");
const { default: styled } = require("styled-components");

export const StyledPagination = styled(Pagination)`
  .ant-pagination-item {
    border-radius: 999px;
  }
  .ant-pagination-prev {
    /* display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px; */
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
  }
  .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: #fff;
  }
`;
