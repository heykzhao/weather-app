const APIKey = process.env.REACT_APP_API_KEY;
console.log(APIKey);

async function getCurrentCity(city) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
    const data = await response.json();
    const currentCityCoord = {
      lon: data.coord.lon,
      lat: data.coord.lat,
    };
    return currentCityCoord;
  } catch (error) {
    return console.log(error);
  }
}

export default async function getCurrentCityWeather(city) {
  try {
    const currentCityCoord = await getCurrentCity(city);
    const { lat, lon } = currentCityCoord;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${APIKey}`);
    const data = await response.json();
    const currentCityWeather = {
      currentTemp: data.current.temp,
    };
    return currentCityWeather;
  } catch (error) {
    return console.log(error);
  }
}

export default getCurrentWeather;
