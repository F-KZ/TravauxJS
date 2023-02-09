const loader = document.querySelector(".loader");
const key = "60de051bea1535bcdb603e8b5c025ac3";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const lon = location.coords.longitude;
      const lat = location.coords.latitude;
      getWeatherData(lon, lat);
    },
    () => {
      loader.textContent =
        "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer.";
    }
  );
}

async function getWeatherData(lon, lat) {
  try {
    const results = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metrics&appid=${key}`
    );

    if (!results.ok) {
      throw new Error(`Erreur: ${results.status}`);
    }
    const data = await results.json();

    populateMainInfo(data);
    //handleHours(data.hourly);
    //handleDays(data.daily);

    loader.classList.add("fade-out");
  } catch (e) {
    loader.textContent = e;
  }
}

const position = document.querySelector(".position");
const temperature = document.querySelector(".temperature");
const weatherImage = document.querySelector(".weather-image");

const currentHour = new Date().getHours();

function populateMainInfo(data) {
  temperature.textContent = `${Math.trunc(data.current.temp)}°`;
  position.textContent = data.timezone;

  if (currentHour >= 6 && currentHour < 21) {
    weatherImage.src = `ressources/jour/${data.current.weather[0].icon}.svg`;
  } else {
    weatherImage.src = `ressources/nuit/${data.current.weather[0].icon}.svg`;
  }
}
