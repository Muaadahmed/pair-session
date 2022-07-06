import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chosenFood, setChosenFood] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const fetchApi = () => {
    axios
      .get("/api/foods")
      .then((serverRes) => {
        setData(serverRes.data);
      })
      .catch((err) => console.log(err.response.status));
  };

  useEffect(fetchApi, []);

  const searchHandler = (e) => {
    e.preventDefault();

    if (userInput !== "") {
      const result = data.filter((obj) => {
        if (obj.foodName.includes(userInput.toLowerCase())) return obj;
      });
      if (result.length > 0) {
        setNotFound(false);
        setChosenFood(result);
      } else {
        setNotFound(true);
      }
      setUserInput("");
    } else {
      setInvalid(true);
    }
  };

  return (
    <main className="App">
      <div className="div">
        {chosenFood.map((obj, index) => {
          return (
            <section className="section" key={`FODD_${index}`}>
              <p>{obj.foodName}</p>
              <p>{obj.portion}</p>
              <p>{obj.calories}</p>
            </section>
          );
        })}
      </div>
      ;{notFound && <p>Not Found</p>}
      {invalid && <p>Input required</p>}
      <form onSubmit={searchHandler}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(() => e.target.value)}
          type="text"
          placeholder="Search Food"
        />
        <input type="submit" />
      </form>
    </main>
  );
}

export default App;
