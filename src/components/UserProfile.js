import React, { useEffect } from 'react';
import NavBar from './NavBar';
import SideContainer from './SideContainer';
import MainContainer from './MainContainer';
import Footer from './Footer';
import { Flex, Spacer, Box } from "@chakra-ui/react";

const UserProfile = ({ currentUser, jobPostings, setCurrentUser, userProfile, setUserProfile, setJobPostings, setSearch, setSearchLocation, setSort, setGearNeeds }) => {

    useEffect(() => {
      setUserProfile(true);
      return () => {
        setUserProfile(false)
      };
    })
    return (
        
          <Flex minH="100vh" direction="column">
            <NavBar setSearchLocation={setSearchLocation} setSort={setSort} setSearch={setSearch} userProfile={userProfile} setCurrentUser={setCurrentUser} currentUser={currentUser} setGearNeeds={setGearNeeds}/>
            <Box w="100%" h="20px" bgGradient="linear(to-r, green.200, purple.200)"/>
            <Flex pt="8" mr="6" ml="6" mb="150px">
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