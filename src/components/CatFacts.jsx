import React, { useState } from "react";


const CatFacts = (props) => {
    props.facade.getCatFacts().then(data => {
      return <div>{data}</div>
    })
  };


  // const getCatFacts = () => {
  //   const options = makeOptions("GET",true);
  //   const res = fetch(URL + CatFactURL,options).then(handleHttpErrors).then(response => response.json()).then((data) =>{
  //     const catfacts = {fact: data.fact, length: data.length}
  //   return catfacts;
  //       })
  // };

export default CatFacts;