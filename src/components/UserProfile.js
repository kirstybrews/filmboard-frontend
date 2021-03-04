import React, { useEffect } from 'react';
import NavBar from './NavBar';
import SideContainer from './SideContainer';
import MainContainer from './MainContainer';
import Footer from './Footer'
import { Flex, Spacer } from "@chakra-ui/react";

const UserProfile = ({ currentUser, jobPostings, setCurrentUser, userProfile, setUserProfile, setJobPostings }) => {

    useEffect(() => {
      setUserProfile(true);
      return () => {
        setUserProfile(false)
      };
    })
    return (
        
          <Flex minH="100vh" direction="column">
            <NavBar userProfile={userProfile} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <Flex mr="6" ml="6" mb="150px">
              <SideContainer 
                setCurrentUser={setCurrentUser} 
                userProfile={userProfile} 
                {...currentUser} 
              />
              <Spacer />
              <MainContainer 
                setJobPostings={setJobPostings} 
                currentUser={currentUser} 
                userProfile={userProfile} 
                jobPostings={jobPostings}
                setCurrentUser={setCurrentUser}
              />
            </Flex>
            <Footer/>
          </Flex>
       
    )
}

export default UserProfile;