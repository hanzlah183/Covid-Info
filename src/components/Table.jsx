import React, { useState, useEffect } from "react";
import Axios from "axios";

//Ant-design components
import { Layout, Form, Row, Col, Input, Spin } from "antd";
import { Table } from "antd";

const { Content } = Layout;

const Tabl = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [sort, setSort] = useState({ sortBy: "confirmed" });
  const [page, setPage] = useState({ current: 1 });
  const [search, setSearch] = useState({ words: "" });

  const { sortBy } = sort;

  useEffect(() => {
    getData();
  }, [sort, setData]);

  const getData = async query => {
    try {
      const res = await Axios.get(
        `https://corona.lmao.ninja/countries?sort=${query}`
      );
      setloading(false);
      setData(
        res.data.map((row, indx) => ({
          Country: row.country,
          Cases: row.cases,
          Active: row.active,
          Death: row.deaths,
          Critical: row.critical,
          Recovered: row.recovered,
          Id: indx
        }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = [
    {
      title: "Ranking",
      dataIndex: "Id",
      key: "Id"
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country"
    },
    {
      title: "Cases",
      dataIndex: "Cases",
      key: "Cases"
    },
    {
      title: "Active",
      dataIndex: "Active",
      key: "Active"
    },
    {
      title: "Death",
      dataIndex: "Death",
      key: "Death"
    },
    {
      title: "Critical",
      dataIndex: "Critical",
      key: "Critical"
    },
    {
      title: "Recovered",
      dataIndex: "Recovered",
      key: "Recovered"
    }
  ];

  const handleChange = e => {
    setSort({ sortBy: e.target.value });
  };

  const onSubmit = async () => {
    setloading(true);
    getData(sortBy);
    setPage({ current: 1 });
  };

  const onChange = page => {
    setPage({
      current: page
    });
  };

  const handleSearch = e => {
    setSearch({ words: e.target.value });
  };

  const filtered = data.filter(item =>
    item.Country.toLowerCase().includes(search.words.toLowerCase())
  );

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
          margin: "16px 0"
        }}
      >
        <Row>
          <Col span={7}>
            <form onClick={onSubmit}>
              <Form.Item label="Sort By">
                <select
                  className="form-control form-control-sm"
                  value={sortBy}
                  onChange={e => handleChange(e)}
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="critical">Critical</option>
                  <option value="deaths">Deaths</option>
                  <option value="recovered">Recovered</option>
                </select>
              </Form.Item>
            </form>
          </Col>
          <Col span={12} style={{ paddingLeft: 180 }}>
            <Form.Item label="Search By">
              <Input placeholder="enter country name" onChange={handleSearch} />
            </Form.Item>
          </Col>
        </Row>
        {loading ? (
          <Spin size="large" style={{ paddingTop: 100, width: 900 }} />
        ) : (
          <Table
            rowKey={obj => obj.Id}
            columns={columns}
            dataSource={filtered}
            pagination={{
              pageSize: 20,
              current: page.current,
              onChange: onChange
            }}
            scroll={{ y: 240 }}
          />
        )}
      </div>
    </Content>
  );
};

export default Tabl;
