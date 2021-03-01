import React from 'react';
import { Flex, Spacer, Box, Heading, Button } from "@chakra-ui/react";
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
        <Flex m="2" p="10">
            {currentUser
            ? <>
            <Box >
                <Button 
                    size="lg" 
                    onClick={() => userProfile ? handleClick('/') : handleClick('/user_profile')} 
                    color="cyan.100" 
                    variant="ghost">
                        {userProfile ? "Discover Jobs" : "My Profile"}
                </Button>
            </Box>
            <Spacer/>
              </>  
            : null}
            <Box > 
                <Heading mt="2.5" pl="2" pb="2" size="md">ReelWork</Heading> 
            </Box>
            <Spacer />
            {currentUser
            ? <Box pt="1">
                <Button onClick={logOut} backgroundColor="cyan.100" mr="4">
                    Log Out
                </Button>
            </Box>
            : <Box pt="1">
                <Button onClick={() => handleClick('/login')} backgroundColor="cyan.100" mr="4">
                    Log In
                </Button>
                <Button onClick={() => handleClick('/signup')} backgroundColor="cyan.100">
                    Sign Up
                </Button>
            </Box>}
            
        </Flex>
    )
}

export default NavBar;