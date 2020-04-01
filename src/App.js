import React, { useState } from "react";

import Tabl from "./components/Table";
import DashBoard from "./components/DashBoard";

//Ant-design components
import { Layout, Menu, Typography } from "antd";
import { RiseOutlined, PieChartOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Sider, Header, Footer } = Layout;

function App() {
  const [state, setstate] = useState({ collapsed: false });
  const [table, settable] = useState({ value: false });

  const onCollapse = collapsed => {
    setstate({ collapsed });
  };

  const onClick = () => {
    settable({ value: true });
  };

  const onClick1 = () => {
    settable({ value: false });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" onClick={() => onClick1()}>
            <PieChartOutlined />
            <span>DashBoard</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => onClick()}>
            <RiseOutlined />
            <span>Cases Ranking</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className=" header-color" style={{ padding: 0 }}>
          <Text style={{ paddingLeft: 250 }}>
            <font className="text-color" style={{ fontSize: "2rem" }}>
              <i className="fas fa-viruses virus" />
              COVID-19 CORONAVIRUS PANDEMIC
            </font>
          </Text>
        </Header>
        {table.value ? <Tabl /> : <DashBoard />}
        <Footer style={{ textAlign: "center" }}>
          <Text strong>
            Data Source From WorldoMeter, (JHU CSSE GISand Data)
          </Text><br />
          <Text>
            <font>Developed By Hanzlah</font>
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
