import React from 'react';
import FooterLogo from './footer_logo.png';
import { Flex, Box, Image } from "@chakra-ui/react";

const Footer = () => {
    return (
            <Flex as="footer" w="100%" bg="black" bottom="0" pos="absolute" p="4">
                <Box >
                    <Image src={FooterLogo} alt="logo" boxSize="84px" />
                </Box>
            </Flex>
       
    )
}

export default Footer;