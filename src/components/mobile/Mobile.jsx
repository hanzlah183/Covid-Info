import React from "react";
import "./mobile.css";

import { Layout, Typography } from "antd";

const Mobile = () => {
  return (
    <Layout.Content style={{ margin: "0 16px" }}>
      <div
        className=" mobile"
        style={{
          paddingTop: 410,
          paddingLeft: 130,
          minHeight: 1400,
          margin: "16px 0"
        }}
      >
        <Typography.Text strong type="warning">
          <Typography.Title type="warning">
            This App is not Yet Responsive For <br /> Mobile Please Open It{" "}
            <br /> On Pc or Laptop
          </Typography.Title>
        </Typography.Text>
      </div>
    </Layout.Content>
  );
};

export default Mobile;
