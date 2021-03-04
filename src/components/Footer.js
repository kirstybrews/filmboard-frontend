import React from 'react';
import FooterLogo from './footer_logo.png';
import { Flex, Box, Image, Spacer, Text, Link, HStack } from "@chakra-ui/react";

const Footer = () => {
    return (
            <Flex as="footer" w="100%" bg="black" bottom="0" pos="absolute" p="4">
                <Box >
                    <Image src={FooterLogo} alt="logo" boxSize="84px" />
                </Box>
                <Spacer/>
                <Box pt="5">
                    <HStack ml="135px">
                        <Text color="white" fontSize="sm">Created By: </Text>
                        <Link color="white" fontSize="sm" href="https://github.com/kirstybrews">Kirsty Brewster</Link>
                    </HStack>
                    <Text color="white" fontSize="sm">&copy; Copyright 2021 - ReelWork.  All rights reserved.</Text>
                </Box>
            </Flex>
       
    )
}

export default Footer;