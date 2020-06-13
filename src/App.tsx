import React, {FC} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Users from "./user/pages/Users/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";

const App: FC = () => {

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Users}/>
        <Route path='/places/new' exact component={NewPlace}/>
        <Redirect to='/'/>
      </Switch>
    </Router>
  )
}

export default App;
