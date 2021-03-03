import React, { useEffect } from 'react';
import NavBar from './NavBar';
import SideContainer from './SideContainer';
import MainContainer from './MainContainer';
import { Flex, Spacer } from "@chakra-ui/react";

const UserProfile = ({ currentUser, jobPostings, setCurrentUser, userProfile, setUserProfile, setJobPostings, userJobPostings }) => {

    useEffect(() => {
      setUserProfile(true);
      return () => {
        setUserProfile(false)
      };
    })
    return (
        <>
          <NavBar userProfile={userProfile} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
          <Flex m="6">
            <SideContainer setCurrentUser={setCurrentUser} userProfile={userProfile} {...currentUser} />
            <Spacer />
            <MainContainer 
              setJobPostings={setJobPostings} 
              currentUser={currentUser} 
              userProfile={userProfile} 
              jobPostings={jobPostings}
              setCurrentUser={setCurrentUser}
            />
          </Flex>
        </>
    )
}

export default UserProfile;