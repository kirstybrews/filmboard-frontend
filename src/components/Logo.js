import React from 'react';
import logo from './logo.png';
import { Image, Box } from "@chakra-ui/react";

const Logo = () => {
    return (
        <Box align="center" mb="20px" pt="2">
            <Image src={logo} alt="logo" boxSize="74px" />
        </Box>
    )
}

export default Logo;