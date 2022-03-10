import { useEffect, useState } from "react";
import React from "react";
import "./index.css";
import "./App.css";
import { logRoles } from "@testing-library/react";

function App() {
  let [data, setData] = useState([]);
  let [index, setIndex] = useState(0);
  let [answer, setAnswer] = useState();
  let [points, setPoints] = useState(0);
  let [disable, setDisable] = useState(false);
  let [resulttext, setResulttext] = useState("");

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      if (index >= data.length) {
        setResulttext("lalallal");
      } else {
        setAnswer(
          [...data[index].incorrect_answers, data[index].correct_answer].sort(
            () => {
              return 0.5 - Math.random();
            }
          )
        );
      }
    }
  }, [data, index]);

  let checkanswer = (e) => {
    if (data && data.length > 0 && data.length > index) {
      setDisable(true);
      if (e.innerHTML === data[index].correct_answer) {
        e.classList.add("green");
        setTimeout(() => {
          setIndex(index + 1);
          setPoints(points + 1);
          e.classList.remove("green");
          setDisable(false);
        }, 1000);
      } else {
        e.classList.add("red");
        setTimeout(() => {
          setIndex(index + 1);
          e.classList.remove("red");
          setDisable(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      {resulttext ? (
        <div>

<h1 className="popuptext">Thanks for playing</h1>
<h3>Your score is {points} :))</h3>
<button onClick={()=>window.location.reload()} className="refresh">Play again</button>

        </div>
      ) : (
        <>
          {data[index] === undefined && <h1>Loading...</h1>}
          {data.length > 0 && data.length > index ? (
            <h1>{data[index].question}</h1>
          ) : (
            <></>
          )}
          <h2 className="points">
            You have <span>{points}</span> correct answers
          </h2>
          <div className="answers">
            {answer ? (
              answer.map((item) => {
                return (
                  <div className="divbutton">
                    <button
                      disabled={disable ? "disabled" : ""}
                      onClick={(e) => checkanswer(e.target)}
                    >
                      {item}
                    </button>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App