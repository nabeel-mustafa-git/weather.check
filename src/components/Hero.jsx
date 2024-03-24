import { useEffect, useState } from "react";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const [cityList, setCityList] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchText !== "") {
        const main_url = "https://city-and-state-search-api.p.rapidapi.com/search?q=";
        const limit_url = "&limit=10";

        const url = main_url + searchText + limit_url;

        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "7b913a2a12mshfd4828b3b334c31p155805jsn4abf06fd6f64",
            "X-RapidAPI-Host": "city-and-state-search-api.p.rapidapi.com",
          },
        };

        try {
          async function getData() {
            const response = await fetch(url, options);
            const result = await response.json();
            setCityList(result);
          }
          getData();
        } catch (error) {
          console.error(error);
        }
      } else {
        setCityList([]);
      }
    }, 300);

    return () => clearTimeout(getData);
  }, [searchText]);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setSearchText("");
  };

  const getWeatherData = (city, country) => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const api_url_forcast = "https://api.tomorrow.io/v4/weather/forecast?location=";
    const api_key_forcast = "&apikey=RBjwzwYymUH59vGh88GYmKtc4iPY4cjN";
    const api_url = "https://api.api-ninjas.com/v1/weather?city=";
    const api_key = "&X-Api-Key=NCoIhJMVK6FK1Kq5fUQoag==Sm8w2jeoqZLmKv3y";

    const cityName = city.replaceAll(" ", "%20");
    const countryName = country.replaceAll(" ", "%20");

    try {
      const getData = async () => {
        const data = await fetch(api_url + cityName + "&country=" + countryName + api_key);
        const result = await data.json();
        result["city"] = city;
        result["country"] = country;
        setWeatherData(result);
        setTemp(result.temp);
      };
      getData();
    } catch (err) {
      console.log("Error in Fetching Weather data: " + err);
    }
    setSearchText("");
    setCityList([]);
  };

  return (
    <div
      className={`bg-black bg-cover bg-no-repeat min-h-svh
      ${temp === 0 ? "bg-[url('https://burst.shopifycdn.com/photos/water-creates-glass-texture-on-city-street.jpg?exif=0&iptc=0')]" : ""}
      ${temp < 0 ? "bg-[url('https://wallpaperbat.com/img/508331-dark-winter-forest-wallpaper-top-free-dark-winter-forest-background.jpg')]" : ""}
      ${
        temp < 10 && temp > 0
          ? "bg-[url('https://static.vecteezy.com/system/resources/previews/017/399/505/large_2x/forest-in-fog-with-mist-fairy-spooky-looking-woods-in-a-misty-day-cold-foggy-morning-in-horror-forest-with-trees-free-photo.jpg')]"
          : ""
      }
      ${
        temp >= 10 && temp < 20
          ? "bg-[url('https://paweatheraction.com/wp-content/uploads/2023/12/410206451_10159984854840098_7361095795765035650_n.jpg')]"
          : ""
      }
      ${
        temp >= 20 && temp < 30
          ? "bg-[url('https://cdn.concreteplayground.com/content/uploads/2018/12/Rainbow-Beach_-Tourism-and-Events-Queensland.jpg')]"
          : ""
      }
      ${temp >= 30 ? "bg-[url('https://www.wallpaperflare.com/static/901/895/580/glow-day-brown-grass-wallpaper.jpg')]" : ""}`}
    >
      <div className="w-10/12 m-auto pt-7">
        <h3 className="text-white font-medium text-sm">weather.check</h3>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center pt-7 w-6/12 max-md:w-10/12 m-auto">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Enter City"
            className="w-full rounded-full py-2 px-4 outline-none text-gray-800 bg-slate-200"
          />
          <div className="relative">
            <div className="absolute z-99 top-0 w-full m-auto">
              {cityList.map((city, index) =>
                city.type === "city" ? (
                  <div
                    onClick={() => getWeatherData(city.name, city.country_name)}
                    key={city.id}
                    className={`flex justify-between mx-7 mb-[1px] py-2 px-4 bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 text-slate-200 border-blackb border-bb ${
                      index === cityList.length - 1 ? "rounded-b-xl border-none" : ""
                    } cursor-pointer hover:bg-gray-600`}
                  >
                    <p className="">
                      {city.name}, {city.state_name}, {city.country_name}
                    </p>
                    <p>{city.country_code}</p>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </form>
      </div>
      {weatherData !== null ? (
        <div className="flex flex-wrap justify-between text-white py-10 md:w-10/12 md:pt-24 m-auto gap-5 px-10">
          <div className="">
            <div className="flex">
              <p className="text-9xl font-medium">{Math.round(weatherData.temp)}</p>
              <p className="text-4xl font-medium">&deg;C</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[70px]">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                />
              </svg>
            </div>
            <p className="text-5xl font-medium py-2">
              {weatherData.city}
              <span className="text-xl font-light">, {weatherData.country}</span>
            </p>

            <div className="flex gap-1 font-light">
              <p>Humidity: {weatherData.humidity}%</p>
              <p>| H : {weatherData.max_temp}&deg;</p>
              <p>| L : {Math.round(weatherData.min_temp)}&deg;</p>
            </div>
          </div>
          <div className="bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 h-fit py-7 px-10 font-extralight leading-relaxed">
            <h2 className="text-wrap font-normal text-lg border-b border-gray-500 pb-2 mb-2">More about {weatherData.city} weather!</h2>
            <p>Feels like: {weatherData.feels_like}&deg;</p>
            <p>Max temperature: {weatherData.max_temp}&deg;</p>
            <p>Min temperature: {weatherData.min_temp}&deg;</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind speed: {weatherData.wind_speed}km</p>
          </div>
        </div>
      ) : (
        <div className="py-10 md:w-10/12 px-10 pt-24 m-auto text-white">
          <h1 className="font-bold text-6xl max-sm:text-4xl">
            Check Whether the <br />
            <span className="text-yellow-400">Weather</span> is Right!
          </h1>
          <p className="py-10 max-w-2xl font-light">
            Enter Any city name in the above search field to get suggestions of different cities across the world matching your search. Then click on
            the desired city to see its basic but accurate weather info!
          </p>
        </div>
      )}
    </div>
  );
};

export default Hero;
