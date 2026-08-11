import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (milliseconds) => {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}:${String(ms).padStart(2, "0")}`;
  };

  const handleLap = () => {
    if (running) {
      setLaps([formatTime(time), ...laps]);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="container">
      <div className="stopwatch">

        <h1>⏱ Stopwatch</h1>

        <div className="time">
          {formatTime(time)}
        </div>

        <div className="buttons">

          {!running ? (
            <button className="start" onClick={() => setRunning(true)}>
              Start
            </button>
          ) : (
            <button className="pause" onClick={() => setRunning(false)}>
              Pause
            </button>
          )}

          <button className="lap" onClick={handleLap}>
            Lap
          </button>

          <button className="reset" onClick={handleReset}>
            Reset
          </button>

        </div>

        <div className="laps">
          {laps.map((lap, index) => (
            <div className="lap-item" key={index}>
              <span>Lap {laps.length - index}</span>
              <span>{lap}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;