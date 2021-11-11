import React, { useEffect, useState } from "react";
import { catFacts_URL } from "./Urls";
const GetCatFacts = () =>  {
 
  const [items,setItems] = useState();
  const [DataisLoaded, setDataisLoaded] = useState(false)


  useEffect(() => {
    setDataisLoaded(false);

    fetch(catFacts_URL)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setDataisLoaded(true);
      }) },[])

    if (!DataisLoaded)
      return (
        <div>
          <h1> Fetching Data! Please wait.... </h1>{" "}
        </div>
      );

    return (
      <div>
        {items.map((e) => (
          <ol key={e.fact}>
            Fact: {e.fact}
            {/* Length: {e.length} */}
          </ol>
        ))}
      </div>
    );
  }

export default GetCatFacts;
