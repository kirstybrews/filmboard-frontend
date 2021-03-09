import React from 'react';
import { Flex, Box, Spacer, Text, Link, HStack } from "@chakra-ui/react";

const Footer = () => {
    return (
            <Flex as="footer" w="100%" bg="black" bottom="0" pos="absolute" p="4">
                <Box >
                    <HStack spacing="1">
                        <Text color="white" fontSize="sm">Created by</Text>
                        <Link color="white" fontSize="sm" href="https://github.com/kirstybrews">Kirsty Brewster</Link>
                    </HStack>
                </Box>
                <Spacer/>
                <Box >
                    <Text color="white" fontSize="sm">&copy; Copyright 2021 - ReelWork.  All rights reserved.</Text>
                </Box>
            </Flex>
       
    )
}

export default Footer;