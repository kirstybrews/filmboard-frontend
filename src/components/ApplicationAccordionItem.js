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
import { Icon } from '@iconify/react';
import locationIcon from '@iconify-icons/bytesize/location';

const ApplicationAccordionItem = ({ user, message }) => {
    return (
        <AccordionItem bg="white">
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        <HStack>
                            <Avatar mr="4" src={user.avatar} />
                            <Text mt="2">{user.name}</Text>
                        </HStack>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <HStack>
                    <Icon icon={locationIcon} mt="4" />
                    <Text>{user.location}</Text>
                </HStack>
                <HStack mt="3">
                    <Text>Message:</Text>
                    <Text>{message}</Text>
                </HStack>
                <HStack mt="3">
                    <Text>Contact Info:</Text>
                    <Text>{user.email}</Text>
                </HStack>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default ApplicationAccordionItem;