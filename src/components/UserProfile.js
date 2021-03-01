import React, { useEffect } from 'react';
import NavBar from './NavBar';
import SideContainer from './SideContainer';
import MainContainer from './MainContainer';
import { Flex, Spacer } from "@chakra-ui/react";

const UserProfile = ({ currentUser, jobPostings, setCurrentUser, userProfile, setUserProfile }) => {

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
            <SideContainer/>
            <Spacer />
            <MainContainer jobPostings={jobPostings.filter(jobPosting => jobPosting.user_id === currentUser.id)}/>
          </Flex>
        </>
    )
}

export default UserProfile;