import React, { useEffect, useState } from 'react'
import { IForecast } from "@/services/interfaces"

const FetchData: React.FC = () => {
  const [forecasts, setForecasts] = useState<Array<IForecast>>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    populateWeatherData().then(data => {
      setForecasts(data);
      setLoading(false)
    })
  }, [])

  async function populateWeatherData() {
    const response = await fetch('WeatherForecast');
    return await response.json();
  }

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      { loading ? <p><em>Loading...</em></p> : renderForecastsTable(forecasts) }
    </div>
  );

  function renderForecastsTable(forecasts: Array<IForecast>) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
        </thead>
        <tbody>
        { forecasts.map(forecast =>
          <tr key={ forecast.date }>
            <td>{ forecast.date }</td>
            <td>{ forecast.temperatureC }</td>
            <td>{ forecast.temperatureF }</td>
            <td>{ forecast.summary }</td>
          </tr>
        ) }
        </tbody>
      </table>
    );
  }
}

export default FetchData