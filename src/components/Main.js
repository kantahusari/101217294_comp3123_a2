import React, { useState } from "react";
import axios from "axios";
import Header from "./Header"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeatherData"
import Context from "../Context"
import Error from "./Error"
import DateTime from "./DateTime"
import Tagline from "./Tagline"
import Footer from "./Footer"

const Main = () => {
    const [weather, setWeather] = useState();
    const [error, setError] = useState();
    const API_KEY = "8fc0a74115fb4677aa38433b07c4d737";
    const api_call = async (event) => {
        event.preventDefault();
        const location = event.target.elements.location.value;
        if (!location) {
            setError('Please enter the name of the city');
            setWeather(null);
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        await axios.get(url).then(
                (response) => {
                    //response = await request;
                    setWeather(response.data);
                    setError(null);
                }
            ).catch((error) => {
                setWeather(null);
                console.clear()
                setError("Wrong City Name");
            })
    }
    return (
        //<div className="App">
        <div className="main">
            <Header/>
            <Content >
            <DateTime />
                <Tagline />
                <Context.Provider value={{ api_call: api_call, weather: weather }}>
                    <WeatherSearch />
                    {error && <Error error={error} />}
                    {weather && <WeatherData />}
                </Context.Provider>
            </Content>
            <Footer />
        </div>
    )
}
export default Main