import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import LoginForm from './components/LoginForm'
import UserProfile from './components/UserProfile'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <Router>
      <Route exact path="/login" render={() => (
        currentUser === null
        ? <LoginForm setCurrentUser={setCurrentUser}/>
        : <Redirect to="/user_profile"/>
      )}/> 
      <Route exact path="/user_profile" render={() => (
        currentUser
        ? <UserProfile currentUser={currentUser}/>
        : <Redirect to="/login"/>
      )}/>
    </Router> 
  );
}

export default App;
