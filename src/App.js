import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import axios from "axios";

const instance = {
  key: "5aeb7a4c5cd892d28307bcb471d2f344",
  base_url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const API = `${instance.base_url}weather?q=${query}&units=metric&APPID=${instance.key}`;

  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        const response = await axios.get(API);
        setWeather(response.data);
        setQuery("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = moment().format("MMMM Do YYYY");
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            type="text"
            className="search-bar"
            placeholder="search city or country ..."
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
