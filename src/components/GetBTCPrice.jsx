import React, { useEffect, useState } from "react";
import { bitCoinPrice_URL } from "./Urls";
const GetBTCPrice = () => {
  const [items, setItems] = useState();
  const [DataisLoaded, setDataisLoaded] = useState(false)


  useEffect(() =>{
    fetch(bitCoinPrice_URL)
    .then((res) => res.json())
    .then((json) => {
      setItems(json);
      setDataisLoaded(true)
    })},[]);


    if (!DataisLoaded)
      return (
        <div>
          <h1> Fetching Data! Please wait.... </h1>{" "}
        </div>
      );

    return <div>{JSON.stringify(items)}
        <p><h4> Current price on BTC in USD: {items.bpi.USD.rate}</h4></p>
    </div>;
  }


export default GetBTCPrice;
