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

async function getCurrentWeather() {
  try {
    const response = await fetch(`api.openweathermap.org/data/2.5/weather?q={Cleveland}&appid=${APIKey}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error');
  }
}

export default getCurrentWeather;
