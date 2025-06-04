

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

  // Optionally filter the forecast to match the trip's startDate (next step)
  const filteredForecast = data.list.filter(entry =>
    entry.dt_txt.startsWith(startDate)
  );

  return {
    city: data.city.name,
    country: data.city.country,
    forecasts: filteredForecast.map(entry => ({
      time: entry.dt_txt,
      temp: entry.main.temp,
      weather: entry.weather[0].description,
      icon: entry.weather[0].icon,
    }))
  };
}
