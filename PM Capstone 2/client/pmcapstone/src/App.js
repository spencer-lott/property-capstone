import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import { useState, useEffect } from "react";
import Authorize from "./Auth/Authorize";
import { ApplicationViews } from "./Views/ApplicationViews";
import Header from "./Nav/Header";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userProfile")) {
        setIsLoggedIn(false)
    }
}, [isLoggedIn])

  return (

    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    {isLoggedIn ? <ApplicationViews />
    :
    <Authorize setIsLoggedIn={setIsLoggedIn} />}
    </Router>
  );
}

export default App;
