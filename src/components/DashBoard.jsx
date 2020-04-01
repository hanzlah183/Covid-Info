import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

import Search from "./Search";
import Map from "./Map";
import Graph from "./Graph";

//Ant-design components
import { Layout, Typography, Card, Row, Col, Avatar } from "antd";

const { Content } = Layout;
const { Meta } = Card;

const DashBoard = () => {
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState({ name: "" });
  const [country, setCountry] = useState({});
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [chart, setChart] = useState({});

  useEffect(() => {
    getData();
    getDataByCountry("pakistan");
    getHistoryByCountry("pakistan");
  }, [setdata, loading, setCountry]);

  const getData = async () => {
    try {
      const res = await axios.get("https://corona.lmao.ninja/all");
      setloading(false);
      setdata(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataByCountry = async country => {
    try {
      const res = await axios.get(
        `https://corona.lmao.ninja/countries/${country}`
      );
      setLoadingCountry(false);
      setCountry(res.data);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const getHistoryByCountry = async country => {
    try {
      const res = await axios.get(
        `https://corona.lmao.ninja/v2/historical/${country}`
      );
      setChart({
        labels: Object.keys(res.data.timeline.cases),
        datasets: [
          {
            label: "Cases",
            fill: false,
            lineTension: 0.58,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "round",
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3.5,
            pointHitRadius: 10,
            data: Object.values(res.data.timeline.cases)
          },
          {
            label: "Deaths",
            fill: false,
            lineTension: 0.58,
            backgroundColor: "rgba(204, 62, 19, 0.986)",
            borderColor: "rgba(204, 62, 19, 0.986)",
            borderCapStyle: "round",
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(204, 62, 19, 0.986)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(204, 62, 19, 0.986)",
            pointHoverBorderColor: "rgba(204, 62, 19, 0.986)",
            pointHoverBorderWidth: 2,
            pointRadius: 3.5,
            pointHitRadius: 10,
            data: Object.values(res.data.timeline.deaths)
          },
          {
            label: "Recovered",
            fill: false,
            lineTension: 0.58,
            backgroundColor: "rgba(15, 199, 61)",
            borderColor: "rgba(15, 199, 61)",
            borderCapStyle: "round",
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(15, 199, 61)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(15, 199, 61)",
            pointHoverBorderColor: "rgba(15, 199, 61)",
            pointHoverBorderWidth: 2,
            pointRadius: 3.5,
            pointHitRadius: 10,
            data: Object.values(res.data.timeline.recovered)
          }
        ]
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //parsing date to original format
  const date = new Date(data.updated);

  //calculating fatality rate
  const decimal = (data.deaths / data.cases) * 100;
  const result = Math.floor(decimal * 100) / 100;

  const onChange = e => {
    setSearch({ name: e.target.value });
  };

  const onSubmit = async e => {
    setLoadingCountry(true);
    e.preventDefault();
    getDataByCountry(search.name);
    getHistoryByCountry(search.name);
  };

  //getting flag and longitude and latitude because this is nested object
  const flag = country.countryInfo ? country.countryInfo.flag : null;
  const latitude = country.countryInfo ? country.countryInfo.lat : null;
  const longitude = country.countryInfo ? country.countryInfo.long : null;

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, margin: "16px 0" }}
      >
        <Typography.Text>
          <font style={{ paddingLeft: 310 }}>
            Last-Update: <Moment date={date} />
          </font>
        </Typography.Text>
        <Typography.Text strong>
          <h3>World-Wide</h3>
        </Typography.Text>
        <Row>
          <Col span={6}>
            <Card
              style={{ width: 210, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loading}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user case" />}
                title="Cases"
                description={data.cases}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{
                width: 210,
                borderRadius: 17,
                borderColor: "#bfbfbf"
              }}
              size="small"
              loading={loading}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user-plus recover" />}
                title="Recovered"
                description={data.recovered}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              style={{ width: 210, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loading}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-procedures death"></i>}
                title="Deaths"
                description={data.deaths}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{ width: 210, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loading}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-exclamation-circle fatality"></i>}
                title="Fatality-Rate"
                description={`${result} percent`}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: 32 }}>
          <Typography.Text strong>
            <h3>Search By Country:</h3>
          </Typography.Text>

          <Col span={5} style={{ paddingLeft: 15 }}>
            <Search onChange={onChange} onSubmit={onSubmit} />
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<Avatar src={flag} className="flag" />}
                title="Country"
                description={country.country}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user case" />}
                title="Cases"
                description={country.cases}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={
                  <i className="fab fa-creative-commons-sampling-plus active"></i>
                }
                title="Active"
                description={country.active}
              />
            </Card>
          </Col>
          <Col span={5}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user-plus recover" />}
                title="Recovered"
                description={country.recovered}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-procedures death"></i>}
                title="Deaths"
                description={country.deaths}
              />
            </Card>
          </Col>
          <Col span={5} style={{ paddingTop: 12 }}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={
                  <i className="fas fa-exclamation-triangle critical"></i>
                }
                title="Critical"
                description={country.critical}
              />
            </Card>
          </Col>
          <Col span={5} style={{ paddingTop: 12 }}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user case" />}
                title="Today Cases"
                description={country.todayCases}
              />
            </Card>
          </Col>
          <Col span={5} style={{ paddingTop: 12 }}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-procedures death"></i>}
                title="Today Deaths"
                description={country.todayDeaths}
              />
            </Card>
          </Col>
          <Col span={5} style={{ paddingTop: 12 }}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-user case" />}
                title="CasePerOneMillion"
                description={country.casesPerOneMillion}
              />
            </Card>
          </Col>
          <Col span={4} style={{ paddingTop: 12 }}>
            <Card
              style={{ width: 200, borderRadius: 17, borderColor: "#bfbfbf" }}
              size="small"
              loading={loadingCountry}
            >
              <Meta
                style={{ paddingLeft: 30, paddingTop: 7 }}
                avatar={<i className="fas fa-procedures death"></i>}
                title="DeathPerOneMillion"
                description={country.deathsPerOneMillion}
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: 32 }}>
          <Col span={24}>
            <Graph chart={chart} country={country.country} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 25 }}>
          <Typography.Text strong>
            <h3>Infected Countries</h3>
          </Typography.Text>
          <Col span={24}>
            <Map long={longitude} lat={latitude} />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default DashBoard;
