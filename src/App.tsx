import React, {FC} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Users from "./user/pages/Users/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import MainNavigation from "./shared/components/Navigation/Nav/Nav";

const App: FC = () => {

  return (
    <Router>
      <MainNavigation/>
      <main>
        <Switch>
          <Route path='/' exact component={Users}/>
          <Route path='/places/new' exact component={NewPlace}/>
          <Redirect to='/'/>
        </Switch>
      </main>
    </Router>
  )
}

export default App;
