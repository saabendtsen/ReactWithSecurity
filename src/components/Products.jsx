import React, { useState } from "react";
import {
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
            {el.title} :<Link to={`${url}/${el.id}`}>Details</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a Book.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Details bookFacade={props.bookFacade} />
        </Route>
      </Switch>
    </div>
  );
};

const Details = (props) => {
  let { id } = useParams();
  const book = props.bookFacade.findBook(id);

  return (
    <>
      {book.id}
      <br />
      {book.info}
    </>
  );
};

export default Products;

//Alt herunder er kun til testing. Meningen er det også skal flyttes ind i et component for sig.
// eslint-disable-next-line
const AddBook = (props) => {
  const [book, setBook] = useState({ title: "", info: "" });

  const changeHandler = (evt) => {
    setBook({ ...book, [evt.target.id]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.bookFacade.addBook(book);
  };

  return (
    <>
      <h2>Add Book</h2>
      <form onChange={changeHandler} onSubmit={handleSubmit}>
        <label htmlFor="title">add title:</label>
        <br />
        <input type="text" id="title" name="title" placeholder="Add title" />
        <br />
        <label htmlFor="info">Info:</label>
        <br />
        <input type="text" id="info" name="info" placeholder="Add info" />
        <button type="submit">Save</button>
      </form>
      <p>{JSON.stringify(book)}</p>
    </>
  );
};
