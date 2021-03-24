import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserProfile from './components/UserProfile';
import NavBar from './components/NavBar';
import NavBarCopy from './components/NavBarCopy';
import MainContainer from './components/MainContainer';
import SideContainer from './components/SideContainer';
import Footer from './components/Footer'
import { Flex, Spacer, Image, Box } from "@chakra-ui/react";
import LandingPage from './components/landing_page.png';

// const JOB_POSTINGS_URL = 'http://localhost:3000/job_postings/';
const JOB_POSTINGS_URL = 'https://filmboard-backend.herokuapp.com/job_postings/';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  const [userProfile, setUserProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [sort, setSort] = useState("")
  const [gearNeeds, setGearNeeds] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Promise.all([fetch("https://filmboard-backend.herokuapp.com/decode_token", {
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
        const sorter = (a, b) => {
          if (+(a.start_date.split(" ")[2]) !== +(b.start_date.split(" ")[2])) {
            return +(a.start_date.split(" ")[2]) - +(b.start_date.split(" ")[2])
          } else if (+(a.start_date.split(" ")[2]) === +(b.start_date.split(" ")[2])) {
            if (months.indexOf(a.start_date.split(" ")[0]) === months.indexOf(b.start_date.split(" ")[0])) {
              return +(a.start_date.split(/[\s,]+/)[1]) - +(b.start_date.split(/[\s,]+/)[1])
            } else {
              return months.indexOf(a.start_date.split(" ")[0]) - months.indexOf(b.start_date.split(" ")[0])
            }
          }
        }
        filterJobPostings = filterJobPostings.sort(sorter)
      } else {
        const times = ["day(s)", 'week(s)', "month(s)", "year(s)"]
        const sorter = (a, b) => {
          if(times.indexOf(a.length_of_time.split(" ")[1]) !== times.indexOf(b.length_of_time.split(" ")[1])){
             return times.indexOf(a.length_of_time.split(" ")[1]) - times.indexOf(b.length_of_time.split(" ")[1]);
          }else if (times.indexOf(a.length_of_time.split(" ")[1]) === times.indexOf(b.length_of_time.split(" ")[1])) {
             return +a.length_of_time.split(" ")[0] - +b.length_of_time.split(" ")[0]
          };
        };
        filterJobPostings = filterJobPostings.sort(sorter)
      }
    };

    if (gearNeeds) {
      filterJobPostings = filterJobPostings.filter(job => !job.need_gear)
    }

    return filterJobPostings
  }


  return (
    <Router>
      <Route exact path="/jobs" render={() => 
        <Flex minH="100vh" direction="column">
          <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser} setSearch={setSearch} setSearchLocation={setSearchLocation} setSort={setSort} setGearNeeds={setGearNeeds}/>
          <Box w="100%" h="20px" bgGradient="linear(to-r, green.200, purple.200)"/>
          <Flex pt="8" mr="6" ml="6" mb="150px">
            <SideContainer 
              searchLocation={searchLocation} 
              setSearchLocation={setSearchLocation} 
              search={search} 
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              gearNeeds={gearNeeds}
              setGearNeeds={setGearNeeds}
            />
            <Spacer />
            <MainContainer userProfile={userProfile} currentUser={currentUser} jobPostings={filter()}/>
          </Flex>
          <Footer/>
        </Flex>
      }/>
      <Route exact path="/" render={() => (
        <Flex minH="100vh" direction="column" bg="black">
          <Flex bg="black">
          <NavBarCopy />
            <Image src={LandingPage} minH="100vh"/>
          </Flex>
        </Flex>
      )}/>

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
            setGearNeeds={setGearNeeds}
          />
        : <Redirect to="/login"/>
      )}/>
    </Router> 
  );
}

export default App;
