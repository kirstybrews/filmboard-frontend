import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserProfile from './components/UserProfile';
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer';
import SideContainer from './components/SideContainer';
import { Flex, Spacer } from "@chakra-ui/react";

const JOB_POSTINGS_URL = 'http://localhost:3000/job_postings/';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Promise.all([fetch("http://localhost:3000/decode_token", {
        headers: {
          "Authenticate": localStorage.token
        }
      }), fetch(JOB_POSTINGS_URL)
    ])
        .then(responses => {
          return Promise.all(responses.map(r => r.json()))
        })
        .then(data => {
          setCurrentUser(data[0])
          setJobPostings(data[1])
        })
        // .then(userData => {
        //   setCurrentUser(userData)
        // })
    } else {
      fetch(JOB_POSTINGS_URL)
        .then(r => r.json())
        .then(data => setJobPostings(data))
    }
  }, []);

  return (
    <Router>
      <Route exact path="/" render={() => 
        <>
          <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
          <Flex m="6">
            <SideContainer/>
            <Spacer />
            <MainContainer jobPostings={jobPostings}/>
          </Flex>
        </>
      }/>

      <Route exact path="/login" render={() => (
        currentUser === null
        ? <LoginForm setCurrentUser={setCurrentUser}/>
        : <Redirect to="/user_profile"/>
      )}/> 

      <Route exact path="/signup" render={() => (
        currentUser === null
        ? <SignUpForm setCurrentUser={setCurrentUser}/>
        : <Redirect to="/user_profile"/>
      )}/> 
      
      <Route exact path="/user_profile" render={() => (
        currentUser
        ? <UserProfile setCurrentUser={setCurrentUser} jobPostings={jobPostings} currentUser={currentUser}/>
        : <Redirect to="/login"/>
      )}/>
    </Router> 
  );
}

export default App;
