import React from 'react';
import Logo from './Logo';
import FooterLogo from './footer_logo.png';
import { Flex, Box, Button, Image } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';

const NavBarCopy = () => {
    const history = useHistory();
    const handleClick = (URL) => {
        history.push(URL)
    };

    return (
        <Flex as="nav" mr="2" ml="2" mt="2" pl="2" pr="2">
            <Box pt="6">
                <Box align="center" mb="24px" pt="2">
                    <Image src={FooterLogo} alt="logo" boxSize="74px" />
                </Box>
                <Button onClick={() => handleClick('/jobs')} backgroundColor="black" color="white" mr="4">
                    Jobs
                </Button>
                <Button onClick={() => handleClick('/login')} backgroundColor="black" color="white" mr="4">
                    Log In
                </Button>
                <Button onClick={() => handleClick('/signup')} backgroundColor="black" color="white">
                    Sign Up
                </Button>
            </Box>
        </Flex>
    )
}

export default NavBarCopy;