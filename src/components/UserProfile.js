import React from 'react';
import NavBar from './NavBar';
import SideContainer from './SideContainer';
import MainContainer from './MainContainer';
import { Flex, Spacer } from "@chakra-ui/react";

const UserProfile = ({ currentUser, jobPostings, setCurrentUser }) => {
    return (
        <>
          <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
          <Flex m="6">
            <SideContainer/>
            <Spacer />
            <MainContainer jobPostings={jobPostings.filter(jobPosting => jobPosting.user_id === currentUser.id)}/>
          </Flex>
        </>
    )
}

export default UserProfile;