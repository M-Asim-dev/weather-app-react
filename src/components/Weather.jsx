import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"

const Weather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const onEnterKey = (e) => {
        if(e.key === 'Enter'){
            search(inputRef.current.value);
        }
    }

    const search = async (city) => {
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                inputRef.current.value = ""
                return;
            }

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error in Fetching Data")
        }
        inputRef.current.value = ""
    }

    useEffect(()=>{
        search("New York");
    },[])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type="text" placeholder='Search..' onKeyDown={onEnterKey} />
        <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)} />
      </div>

    {weatherData ? <>
        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
    </> : <></>}

      
    </div>
  )
}

export default Weather
