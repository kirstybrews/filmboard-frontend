import React from 'react';
import logo from './logo.png';
import { Image, Box } from "@chakra-ui/react";

const Logo = () => {
    return (
        <Box align="center" mb="24px">
            <Image src={logo} alt="logo" boxSize="84px" />
        </Box>
    )
}

export default Logo;