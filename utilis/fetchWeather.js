

import fetch from "node-fetch"


export async function fetchWeather(city, country, startDate) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const query = `${city},${country}`;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();

  // Parse dates from API response
  const forecastStartDate = new Date(data.list[0].dt_txt);
  const forecastEndDate = new Date(data.list[data.list.length - 1].dt_txt);
  const tripStart = new Date(startDate);

  // Check if trip start is within forecast range (5 days from now approx)
  const isInRange = tripStart >= forecastStartDate && tripStart <= forecastEndDate;

  // Prepare forecasts to return
  const forecasts = data.list.map(entry => ({
    time: entry.dt_txt,
    temp: entry.main.temp,
    weather: entry.weather[0].description,
    icon: entry.weather[0].icon,
  }));

  return {
    city: data.city.name,
    country: data.city.country,
    forecasts,
    warning: isInRange
      ? null
      : `Trip start date (${startDate}) is outside the available forecast range (${forecastStartDate.toISOString().slice(0,10)} to ${forecastEndDate.toISOString().slice(0,10)})`,
  };
}






// export async function fetchWeather(city, country, startDate) {
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   // Compose query as city,countryCode (country must be 2-letter ISO code)
//   const query = `${city},${country}`;

//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Weather API error: ${response.statusText}`);
//   }

//   const data = await response.json();

//   // Filter forecasts matching startDate YYYY-MM-DD
//   const filteredForecast = data.list.filter(entry =>
//     entry.dt_txt.startsWith(startDate)
//   );

//   return {
//     city: data.city.name,
//     country: data.city.country,
//     forecasts: filteredForecast.map(entry => ({
//       time: entry.dt_txt,
//       temp: entry.main.temp,
//       weather: entry.weather[0].description,
//       icon: entry.weather[0].icon,
//     })),
//   };
// }