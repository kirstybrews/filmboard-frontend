import React from 'react';
import { Accordion } from "@chakra-ui/react";
import ApplicationAccordionItem from './ApplicationAccordionItem'

const ApplicationAccordion = ({ applications }) => {
    return (
        <>
            Applications:
            <Accordion allowToggle >
                {applications.map(application => <ApplicationAccordionItem key={application.id} {...application}/>)}
            </Accordion>
        </>
    )
}

export default ApplicationAccordion;