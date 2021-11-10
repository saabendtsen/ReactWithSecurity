import React from "react";



const CatFacts = (props) => {
    const catFact = props.facade.getCatFacts();
    return (<div>{catFact.fact} {catFact.length}</div>)
  };


export default CatFacts;