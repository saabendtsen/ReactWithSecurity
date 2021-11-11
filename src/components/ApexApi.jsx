import React, { useState, useEffect } from "react";
import { ApexApi_URL } from "./Urls";

function ApexApi() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentMapData, setCurrentMapData] = useState();
  const [nextMapData, setNextMapData] = useState();

  useEffect(() => {
    fetch(ApexApi_URL + "maprotation?version=2&auth=neoWHFfqrUVApKdUZXUe")
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentMapData({
            map: result.battle_royale.current.map,
            duration: result.battle_royale.current.DurationInMinutes,
            remainingTimer: result.battle_royale.current.remainingTimer,
            asset: result.battle_royale.current.asset,
          });
          setNextMapData({
            map: result.battle_royale.next.map,
            duration: result.battle_royale.next.DurationInMinutes,
          });
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <h1> Fetching Data! Please wait.... </h1>{" "}
      </div>
    );
  } else {
    return (
      <div>
        <p>Current Map: {currentMapData.map}</p>
        <p>duration: {currentMapData.duration} mins</p>
        <p>Next map starts in: {currentMapData.remainingTimer} mins</p>
        <button onClick={} type="submit">
          Update Timer
        </button>
        <p>Next Map: {nextMapData.map}</p>

        {/* <img src={currentMapData.asset} /> */}
      </div>
    );
  }
}

export default ApexApi;
