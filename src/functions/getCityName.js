const APIKey = process.env.REACT_APP_API_KEY;

export default async function getCityNameByCoordinates(lat, lon) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKey}`);
    const data = await response.json();
    const { name, country, state } = data[0];
    const cityCountry = state === undefined ? `${name}, ${country}` : `${name}, ${state} ${country}`;
    return cityCountry;
  } catch (error) {
    return console.warn(error);
  }
}
