import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BubblePage from './components/BubblePage';
import PrivateRoute from './utils/PrivateRoute'
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Link to="/login"/>
        <Route exact path="/" render={(props)=><Login {...props}/>} />
        <PrivateRoute exact path="/protected" component={BubblePage} />
        
      </div>
    </Router>
  );
}

export default App;
