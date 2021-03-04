import React from 'react';
import Logo from './Logo'
import { Flex, Spacer, Box, Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const NavBar = ({ currentUser, setCurrentUser, userProfile }) => {
    const history = useHistory();
    const handleClick = (URL) => {
        history.push(URL)
    };

    const logOut = () => {
        localStorage.removeItem("token")
        setCurrentUser(null)
    }
    return (
        <Flex as="nav" mr="2" ml="2" mt="2" p="4">
            {currentUser
            ? <>
            <Box >
                <Button 
                    size="lg" 
                    onClick={() => userProfile ? handleClick('/') : handleClick('/user_profile')} 
                    variant="ghost">
                        {userProfile ? "Discover Jobs" : "My Profile"}
                </Button>
            </Box>
            <Spacer/>
            </>  
            : null}
            <Logo/>
            <Spacer />
            {currentUser
            ? <Box pt="1">
                <Button onClick={logOut} backgroundColor="black" color="white" mr="4">
                    Log Out
                </Button>
            </Box>
            : <Box pt="1">
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