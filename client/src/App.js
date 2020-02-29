import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "./util/route_util";
import Main from "./Main";


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  )
};

export default App;