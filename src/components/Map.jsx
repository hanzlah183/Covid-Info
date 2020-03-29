import React, { useState, useEffect, Fragment } from "react";
import ReactMapGl, { Marker, Popup, NavigationControl } from "react-map-gl";
import Axios from "axios";

const Map = ({ long, lat }) => {
  const [loading, setloading] = useState(true);
  const [state, setState] = useState([]);
  const [viewPort, setviewPort] = useState({
    latitude: lat ? lat : 30.3753,
    longitude: long ? long : 69.3451,
    width: "1100px",
    height: "400px",
    zoom: 1.5
  });
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      const res = await Axios.get(`https://corona.lmao.ninja/countries`);
      setloading(false);
      setState(
        res.data.map(item => ({
          Country: item.country,
          Cases: item.cases,
          Deaths: item.deaths,
          Recovered: item.recovered,
          Active: item.active,
          Id: item.countryInfo ? item.countryInfo._id : null,
          Lat: item.countryInfo ? item.countryInfo.lat : null,
          Lng: item.countryInfo ? item.countryInfo.long : null
        }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      {loading ? (
        []
      ) : (
        <ReactMapGl
          {...viewPort}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
          onViewportChange={viewPort => {
            setviewPort(viewPort);
          }}
          mapStyle="mapbox://styles/mapbox/navigation-guidance-night-v4"
        >
          {state.map((item, indx) => (
            <Marker latitude={item.Lat} longitude={item.Lng} key={indx}>
              <button
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  setSelectedCountry(item);
                }}
              >
                <div className="circle" />
              </button>
            </Marker>
          ))}
          {selectedCountry ? (
            <Popup
              latitude={selectedCountry.Lat}
              longitude={selectedCountry.Lng}
              onClose={() => {
                setSelectedCountry(null);
              }}
            >
              <div>
                <h2 className="country">{selectedCountry.Country}</h2>
                <p>Confirmed: {selectedCountry.Cases}</p>
                <p className="deaths">Deaths: {selectedCountry.Deaths}</p>
                <p className="recov ">Recovered: {selectedCountry.Recovered}</p>
                <p className="activ">Active: {selectedCountry.Active}</p>
              </div>
            </Popup>
          ) : null}
          <div style={{ position: "absolute", bottom: 30, paddingLeft: 6 }}>
            <NavigationControl />
          </div>
        </ReactMapGl>
      )}
    </Fragment>
  );
};

export default Map;
