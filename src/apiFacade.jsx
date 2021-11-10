
import jwt_decode from "jwt-decode";

const URL = "http://localhost:8080/CA2_Group_war_exploded";
const CatFactURL = "https://catfact.ninja/fact";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}


function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  let decoded;

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
    decoded = jwt_decode(token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getCatFacts = () => {
    const options = makeOptions("GET",true);
    const res = fetch(CatFactURL,options).then(handleHttpErrors).then(response => response.json).then(data =>{
      const catfacts = {fact: data.fact, length: data.length}
    return catfacts;
        })
  };

  const fetchData = async () => {
    const options = makeOptions("GET", true); //True add's the token
    const res = await fetch(URL + "/api/info/" + decoded.roles, options);
    return handleHttpErrors(res);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getCatFacts
  };
}
const facade = apiFacade();
export default facade;
