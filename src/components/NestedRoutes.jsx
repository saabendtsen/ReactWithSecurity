import "../css/style2.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import CatFacts from "./CatFacts";
import HomeNested from "./HomeNested";
import facade from "../apiFacade";
// import Products from "./Products";

export default function Nesting() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/topics">
              <Topics />
            </Route>
            <Route path="/catfacts">
              <CatFacts facade={facade}/>
            </Route>
            <Route path="/products">{/* <Products /> */}</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = () => {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="selected" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/topics">
          Topics
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/catfacts">
          Cat Facts
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/products">
          Products
        </NavLink>
      </li>
    </ul>
  );
};

function Home() {
  return (
    <div>
      <HomeNested />
    </div>
  );
}

function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div>
      <h3>{topicId}</h3>
    </div>
  );
}
