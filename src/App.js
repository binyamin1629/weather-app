import React, { useState } from 'react';
import './App.css';

function App() {

  const api = {
    key: "944760be0a2cde777ae78f77f14b8e78",
    baseurl: "https:/api.openweathermap.org/data/2.5",
    base: "api.openweathermap.org/data/2.5/"
  }

  const [query, setquery] = useState('jerusalem');
  const [weather, setweather] = useState({});

  const Search = evt => {
    
    if (evt.key === "Enter") {
      fetch(`${api.baseurl}/weather?q=${query.trim()}&units=metric&APPID=${api.key}`)
        .then(resp => resp.json())
        .then(resualt => {
          setweather(resualt);

          setquery("");
          console.log(resualt)
        });
      //.catch(err=>alert('type in a currect state or city'))


    }
  }

  const dateBuilder =(d)=>{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day=days[d.getDay()];
    let date1=d.getDate();
    let month=months[d.getMonth()]
    let year=d.getFullYear();
    return `${day}  ${date1} ${month} ${year}`
  }

  return (
    <div className="main-app">
       <div className={(typeof weather.main!="undefined") ? ((weather.main.temp>16)? 'warm':'cold'):'cold'}>
      <header>
       
        <input type="text" autocomplete="off" className="serch-box" placeholder="serch for a city..."
          onChange={e => setquery(e.target.value)}
          value={query}
          onKeyPress={Search}
        />
     
      </header>

      <main>

        {(typeof weather.main != "undefined") ? (

          <div>
            <section className="location">
              <div className="city">{weather.name} {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </section>
            <div className="current">
              <div className="temp">{Math.round(weather.main.temp)} <span>°c</span></div>
              <div className="weather">{weather.weather[0].main + " " + weather.weather[0].description} </div>
              <div className="hi-low">{Math.round(weather.main.temp_min)} °c / {Math.round(weather.main.temp_max)}°c</div>
            </div>
          </div>
        ) : ('')}
      </main>
      </div>
    </div>
  );
}

export default App;
