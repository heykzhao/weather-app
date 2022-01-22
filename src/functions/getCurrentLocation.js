function getCurrentPositionPromise() {
  const options = {
    enableHighAccuracy: false,
    maximumAge: 0,
  };
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve, reject) => navigator
    .geolocation.getCurrentPosition(resolve, reject, options));
}

async function returnCoordinates() {
  try {
    const location = await getCurrentPositionPromise();
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    return { lat, lon };
  } catch (error) {
    // eslint-disable-next-line no-alert
    return alert(
      `There was an error getting your location. 
      We will now default to Chicago.

      ${error.code}: ${error.message}
      `,
    );
  }
}

export default returnCoordinates;
