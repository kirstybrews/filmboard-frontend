import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Avatar,
    Text,
    HStack
} from "@chakra-ui/react";

const ApplicationAccordionItem = ({ user, message }) => {
    return (
        <AccordionItem bg="white">
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        <HStack>
                            <Avatar mr="4" src={user.avatar}/>
                            <Text mt="2">{user.name}</Text>
                        </HStack>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {message}
            </AccordionPanel>
        </AccordionItem>
    )
}

export default ApplicationAccordionItem;