import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
  } from "react-router-dom";


const Products = (props) => {
    let { path, url } = useRouteMatch();
    return (
      <div>
      <ul>
        {props.bookFacade.getBooks().map((el, idx) => (
          <li key={idx}>
            {el.title} :  
            <Link to={`${url}/${el.id}`}>Details</Link>
          </li>
        ))}
      </ul>
      <Switch>
          <Route exact path={path}>
            <h3>Please select a Book.</h3>
          </Route>
          <Route path={`${path}/:id`}>
            <Details bookFacade={props.bookFacade}/>
          </Route>
        </Switch>
      </div>
    );
  };
  
  const Details = (props) =>{
    
    let {id} = useParams();
    const book = props.bookFacade.findBook(id);
  
    return(<>{book.id}<br/>{book.info}</>);
  };


  export default Products;