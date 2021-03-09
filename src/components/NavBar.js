import React from 'react';
import Logo from './Logo'
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const NavBar = ({ currentUser, setCurrentUser, userProfile, setSearch, setSearchLocation, setSort }) => {
    const history = useHistory();
    const handleClick = (URL) => {
        history.push(URL)
    };

    const logOut = () => {
        localStorage.removeItem("token")
        setCurrentUser(null)
        setSearch("")
        setSearchLocation("")
        setSort("")
    }
    return (
        <Flex as="nav" mr="2" ml="2" mt="2" pl="2" pr="2">
            <Logo/>
            <Spacer />
            {currentUser
            ? <Box pt="7">
                <Button  
                    onClick={() => userProfile ? handleClick('/jobs') : handleClick('/user_profile')} 
                    backgroundColor="black"
                    color="white"
                    mr="4"
                >
                    {userProfile ? "Discover Jobs" : "My Profile"}
                </Button>
                <Button onClick={logOut} backgroundColor="black" color="white" mr="4">
                    Log Out
                </Button>
            </Box>
            : <Box pt="7">
                <Button onClick={() => handleClick('/login')} backgroundColor="black" color="white" mr="4">
                    Log In
                </Button>
                <Button onClick={() => handleClick('/signup')} backgroundColor="black" color="white">
                    Sign Up
                </Button>
            </Box>}
            
        </Flex>
    )
}

export default NavBar;