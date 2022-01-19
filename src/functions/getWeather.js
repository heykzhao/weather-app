const APIKey = process.env.REACT_APP_API_KEY;
console.log(APIKey);

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

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
