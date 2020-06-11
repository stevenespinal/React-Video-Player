import React from 'react';
import VideoPlayer from "./WbnPlayer";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={VideoPlayer}/>
      <Route exact path="/:activeVideo" component={VideoPlayer}/>
    </Switch>
    <GlobalStyle/>
  </Router>
)

export default App;