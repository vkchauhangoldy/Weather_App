import React, { Fragment, useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("London");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componetMonted = true;
  useEffect(() => {
    const fetchWeather = async () => {
      const response =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}
        &APPID=2e15f17ec23c808056e6eaa9abf5ecbe`);
      if (componetMonted) {
        setData(await response.json());
        // console.log(data);
      }
      return () => {
        componetMonted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-cloud-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  //date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default", { month: "long" });
  let day = d.toLocaleDateString("default", { weekday: "long" });

  //time
  let time = d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(input);
  };
  return (
    <Fragment>
      <div className="container- pt-5 mt-100">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div class="card text-white text-center border-0">
              <img
                src="https://images.unsplash.com/photo-1572099606223-6e29045d7de3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by
                            1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form onSubmit={submitHandler}>
                  <div class="input-group mb-2 mt-5 w-50 mx-auto">
                    <input
                      type="search"
                      class="form-control "
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      class="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h5 class="card-title fa-2x">{data.name}</h5>
                  <p class="card-text fa-2x">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <p class="card-text"></p>
                  <hr />
                  <i className={`fas ${emoji} fa-6x`}></i>
                  <h1 className="fw-bolder mb-10">{temp} &deg;C</h1>
                  <h1 className="lead fw-bolder mb-0 ">
                    {data.weather[0].main}
                  </h1>
                  <br />
                  <p className="lead">
                    {temp_min} &deg;C | {temp_max} &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
