import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from "@chakra-ui/react";

const ApplicationAccordionItem = ({ user, message }) => {
    return (
        <AccordionItem bg="white">
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {user.name}
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