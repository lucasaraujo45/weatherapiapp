import React from 'react';
import Titles from "./components/titles";
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = "831673e66f9dd391b6f19eec30207bc9";

class App extends React.Component{
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humdity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&mode=json&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country){
    console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humdity: data.main.humdity,
        description: data.weather[0].description,
        error: ""
      });
      }else{
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humdity: undefined,
          description: undefined,
          error: "Please enter the value"
        })
      }
  }

  render(){
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humdity={this.state.humdity}
        description={this.state.description}
        error={this.state.error}
        />

      </div>
    );
  }

}

export default App;