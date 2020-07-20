import React, {FC} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Users from "./user/pages/Users/Users";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import MainNavigation from "./shared/components/Navigation/Nav/Nav";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace/UpdatePlace";
import Auth from "./user/pages/Auth/Auth";
import {AuthContext} from "./shared/context/authContext";
import {useAuth} from "./shared/hooks/authHook/authHook";

const App: FC = () => {

  const {token, logout, login, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact component={Users}/>
        <Route path='/:userId/places' exact component={UserPlaces}/>
        <Route path='/places/new' exact component={NewPlace}/>
        <Route path='/places/:placeId' component={UpdatePlace}/>
        <Redirect to='/'/>
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Users}/>
        <Route path='/:userId/places' exact component={UserPlaces}/>
        <Route path='/auth' exact component={Auth}/>
        <Redirect to='/auth'/>
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, login, logout, userId, token}}>
      <Router>
        <MainNavigation/>
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
