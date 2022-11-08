import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const apiKey = 'e1286a6c2ff2e3ef70820547c51ccc29';

  const [whetherData, setWetherData] = useState([{}])
  const [city, setCity] = useState("") 


  const getWether = (event) => {
    if(event.key == "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
      .then(response => response.json())
      .then(data => setWetherData(data))
    }
  }


  const [objType, setPosts] = useState("posts");
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/${objType}`).then((response) => {
      setItems(response.data)
      })
  }, [objType]);


  return (
    <>

    <div>
      <input onChange={e => setCity(e.target.value) } value={city} onKeyPress={getWether} placeholder="Enter city..."></input>

      {typeof whetherData.main === "undefined" ? (
        <div>
          <p>Welcome back !!</p>
        </div>
      ):(

        <div>
          <p>Country Name : {whetherData.name}</p>
          <p>Temperautre : {Math.round(whetherData.main.temp)}F</p>
          <p>Weather State : {whetherData.weather[0].main}</p>
        </div>
      )}
      
      </div>
   
      <h1>Fetch type : {objType}</h1>
      <button
        onClick={() => {
          setPosts("posts");
        }}>
        Posts
      </button>
      <button onClick={() => setPosts("comments")}>Commments</button>
      <button onClick={() => setPosts("users")}>Users</button>

      {items?.map((item) => {
        return <>
        <pre key={item.id}>{JSON.stringify(item)}</pre>;
        <div></div>
        </>
      })}
      </>

      );
    }

export default App;
