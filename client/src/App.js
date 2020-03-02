import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./util/route_util";
import Main from "./Main";
import Splash from "./components/session/splash";
import "./assets/css/reset.css";
import "./assets/css/splash.css";

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute exact path="/" component={Main}/>
        <AuthRoute exact path="/login" component={Splash} routeType="auth"/>
      </Switch>
    </div>
  )
};

export default App;