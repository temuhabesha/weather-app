import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_icon from '../assets/search.png'
import Clear_icon from '../assets/clear.png'
import drizzel_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import cloud_icon from '../assets/cloud.png'


const Weather = () => {

  const inputRef=useRef()

const [weatherdata,setweatherdata] = useState(false)

const allIcons={
  "01d":Clear_icon,
  "01n":Clear_icon,
  "02d":cloud_icon,
  "02n":cloud_icon,
  "03d":cloud_icon,
  "03n":cloud_icon,
  "04d":drizzel_icon,
  "04n":drizzel_icon,
  "09d":rain_icon,
  "09n":rain_icon,
  "10d":rain_icon,
  "10nn":rain_icon,
  "13d":snow_icon,
  "13n":snow_icon,
}

const search=async (city)=>{
  if(city===""){
    alert("please enter city name")
    return;
  }
  
  try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`


  const responce=await fetch(url);
  const data=await responce.json();

  if(!responce.ok){
    alert(data.message)
    return;
  }

  const icon=allIcons[data.weather[0].icon]||Clear_icon;

console.log(data)

  setweatherdata({
    humidity:data.main.humidity,
    windspeed:data.wind.speed,
    tempreture:Math.floor(data.main.temp),
    location:data.name,
    icon:icon
  })

  } catch (error) {
    setweatherdata(false);
    console.error("Error in fetching weather data")
  }
}


useEffect(()=>{
search("Bahir Dar")
},[])


  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={Search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherdata?<>

        <img src={weatherdata.icon} alt="" className='weather_icon'/>
    <p className='temperature'>{weatherdata.tempreture}°c</p>
    <p className='location'>{weatherdata.location}</p>
    <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherdata.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherdata.windspeed} km/h</p>
                <span>wind speed</span>
            </div>
        </div>
    </div>
      </>:<></>}
    
    
    </div>
  )
}

export default Weather

