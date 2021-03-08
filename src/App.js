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
import Footer from './components/Footer'
import { Flex, Spacer } from "@chakra-ui/react";

const JOB_POSTINGS_URL = 'http://localhost:3000/job_postings/';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [userProfile, setUserProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sort, setSort] = useState("")

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
    } else {
      fetch(JOB_POSTINGS_URL)
        .then(r => r.json())
        .then(data => setJobPostings(data))
    }
  }, []);

  const filter = () => {
    let filterJobPostings = jobPostings;

    if (search !== "") {
      filterJobPostings = filterJobPostings.filter(jobPosting => jobPosting.role.toLowerCase().includes(search.toLowerCase()));
    }
    if (searchLocation !== "") {
      filterJobPostings = filterJobPostings.filter(jobPosting => jobPosting.location.toLowerCase().includes(searchLocation.toLowerCase()));
    }

    if (sort !== "") {
      if (sort === "Start Date") {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        filterJobPostings = filterJobPostings.sort((a, b) => (+(a.start_date.split(" ")[2]) > +(b.start_date.split(" ")[2])) ? 1 : (+(a.start_date.split(" ")[2]) === +(b.start_date.split(" ")[2])) ? ((months.indexOf(a.start_date.split(" ")[0]) > months.indexOf(b.start_date.split(" ")[0])) ? 1 : -1) : (months.indexOf(a.start_date.split(" ")[0]) === months.indexOf(b.start_date.split(" ")[0])) ? ((+(a.start_date.split(/[\s,]+/)[1]) > +(b.start_date.split(/[\s,]+/)[1])) ? 1 : -1) : -1)
      } else {
        const times = ["day(s)", 'week(s)', "month(s)", "year(s)"]
        const sorter = (a, b) => {
          if(a.length_of_time.split(" ")[1] !== b.length_of_time.split(" ")[1]){
             return times.indexOf(a.length_of_time.split(" ")[1]) - times.indexOf(b.length_of_time.split(" ")[1]);
          }else if (a.length_of_time.split(" ")[1] === b.length_of_time.split(" ")[1]) {
             return +a.length_of_time.split(" ")[0] - +b.length_of_time.split(" ")[0]
          };
        };
        filterJobPostings = filterJobPostings.sort(sorter)
      }
    };

    return filterJobPostings
  }

  return (
    <Router>
      <Route exact path="/" render={() => 
        <Flex minH="100vh" direction="column" >
          <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} setSearch={setSearch} setSearchLocation={setSearchLocation} setSort={setSort}/>
          <Flex mr="6" ml="6" mb="150px" >
            <SideContainer 
              searchLocation={searchLocation} 
              setSearchLocation={setSearchLocation} 
              search={search} 
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
            />
            <Spacer />
            <MainContainer userProfile={userProfile} currentUser={currentUser} jobPostings={filter()}/>
          </Flex>
          <Footer/>
        </Flex>
      }/>

      <Route exact path="/login" render={() => (
        currentUser === null
        ? <LoginForm setCurrentUser={setCurrentUser}/>
        : <Redirect to="/user_profile"/>
      )}/> 

      <Route exact path="/signup" render={() => (
        currentUser === null
        ? <SignUpForm />
        : <Redirect to="/user_profile"/>
      )}/> 
      
      <Route exact path="/user_profile" render={() => (
        currentUser
        ? <UserProfile 
            setJobPostings={setJobPostings} 
            userProfile={userProfile} 
            setUserProfile={setUserProfile} 
            setCurrentUser={setCurrentUser} 
            jobPostings={jobPostings} 
            currentUser={currentUser}
            setSearch={setSearch}
            setSearchLocation={setSearchLocation}
            setSort={setSort}
          />
        : <Redirect to="/login"/>
      )}/>
    </Router> 
  );
}

export default App;
