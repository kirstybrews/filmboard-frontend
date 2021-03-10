import React from 'react';
import { Accordion, Text } from "@chakra-ui/react";
import ApplicationAccordionItem from './ApplicationAccordionItem'

const ApplicationAccordion = ({ applications }) => {
    return (
        <>
            <Text mb="3" mt="3">Applications:</Text>
            <Accordion allowToggle >
                {applications.map(application => <ApplicationAccordionItem key={application.id} {...application}/>)}
            </Accordion>
        </>
    )
}

export default ApplicationAccordion;