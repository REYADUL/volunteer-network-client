import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import SelectedEvent from './components/SelectedEvent/SelectedEvent';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value ={[loggedInUser,setLoggedInUser]}>

    
    <Router>
      <Switch>
        <Route  path="/home">
          <Home></Home>
        </Route>
        
        <Route exact path="/">
          <Home></Home>
        </Route>

        <PrivateRoute path="/register/:taskId">
          <Register></Register>
        </PrivateRoute>

        <Route  path="/login">
          <Login></Login>
        </Route>

        <Route path="/userEvent">
          <SelectedEvent></SelectedEvent>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>

    </UserContext.Provider>
  );
}

export default App;
