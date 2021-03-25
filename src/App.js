import React from "react";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import Search from "./Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoDetail from "./VideoDetail";
import SignUp from "./SignUp";
import Login from "./Login";
import List from "./List";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/query/:searchItem" component={Search} />
          <Route path="/video/:videoId" component={VideoDetail} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/mylist" component={List} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
