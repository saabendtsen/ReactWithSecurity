import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import CatFacts from "./components/CatFacts";
import Home from "./components/Home"
import Products from "./components/Products";

// import './style2.css';

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )

}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => { facade.fetchData().then(data=> setDataFromServer(data.msg));
  }, [])

  return (   
      <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products/>
          </Route>
          <Route path="/catfacts">
            <CatFacts facade={facade} />
          </Route>
          <Route path="/add-Book">
            <AddBook />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
    
  );

}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }

  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )

}
export default App;

//Alt herunder er kun til testing. Meningen er det også skal flyttes ind i et component for sig.






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



const NoMatch = () => {
  return (
    <div>
      <h3>404</h3>
    </div>
  );
};