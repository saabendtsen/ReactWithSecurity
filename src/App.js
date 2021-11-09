import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
  Navigate,
  useLocation
} from "react-router-dom";
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

  const Header = () => {
    return (
    <ul className="header">
    <li>
      <NavLink exact activeClassName="selected" to="/">Home</NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="selected" to="/old-match">Old Match, to be redirected</NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="selected" to="/will-match">Will Match</NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="selected" to="/will-not-match">Will Not Match</NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="selected" to="/also/will/not/match">Also Will Not Match</NavLink>
    </li>
  </ul>)
  }

  return (
    <div>
      <Router>
      <div>
        <Header/>
        <hr/>
        <div className="content">
        <Routes>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/old-match">
            <Navigate to="/will-match" />
          </Route>
          <Route path="/will-match">
            <WillMatch />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  )

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