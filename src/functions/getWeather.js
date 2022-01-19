const APIKey = process.env.REACT_APP_API_KEY;

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

async function getWeatherArrayHourly(obj) {
  const weatherArray = [];
  for (let i = 0; i < obj.length; i += 1) {
    const arrayItem = {
      date: new Date(obj[i].dt * 1000).getHours(),
      temperature: obj[i].temp,
      description: obj[i].weather[0].main,
    };
    weatherArray.push(arrayItem);
  }
  return weatherArray;
}

async function getWeatherArrayDaily(obj) {
  const weatherArray = [];
  for (let i = 0; i < obj.length; i += 1) {
    const arrayItem = {
      date: new Date(obj[i].dt * 1000).getDay(),
      minTemperature: obj[i].temp.min,
      maxTemperature: obj[i].temp.max,
    };
    weatherArray.push(arrayItem);
  }
  return weatherArray;
}

export async function getCurrentCityWeather(city, units) {
  try {
    const currentCityCoord = await getCurrentCity(city);
    const { lat, lon } = currentCityCoord;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely&appid=${APIKey}`);
    const data = await response.json();

    const { current, hourly, daily } = data;

    const currentWeather = {
      currentTime: new Date(current.dt * 1000),
      currentTemp: current.temp,
      currentFeelsLike: current.feels_like,
      currentHumidity: current.humidity,
      currentWindSpeed: current.wind_speed,
      currentDescription: current.weather.main,
      currentDetails: current.weather.description,
    };

    const hourlyWeather = await getWeatherArrayHourly(hourly);

    const dailyWeather = await getWeatherArrayDaily(daily);

    const allWeather = {
      currentWeather,
      hourlyWeather,
      dailyWeather,
    };

    return allWeather;
  } catch (error) {
    return console.log(error);
  }
}

export async function getCurrentCoordinatesWeather(lat, lon, units) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely&appid=${APIKey}`);
    const data = await response.json();

    const { current, hourly, daily } = data;

    const currentWeather = {
      currentTime: new Date(current.dt * 1000),
      currentTemp: current.temp,
      currentFeelsLike: current.feels_like,
      currentHumidity: current.humidity,
      currentWindSpeed: current.wind_speed,
      currentDescription: current.weather[0].main,
      currentDetails: current.weather[0].description,
    };

    const hourlyWeather = await getWeatherArrayHourly(hourly);

    const dailyWeather = await getWeatherArrayDaily(daily);

    const allWeather = {
      currentWeather,
      hourlyWeather,
      dailyWeather,
    };

    return allWeather;
  } catch (error) {
    return console.log(error);
  }
}
