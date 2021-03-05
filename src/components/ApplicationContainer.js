import React from 'react';
import { VStack, StackDivider } from "@chakra-ui/react";
import Application from './Application';

const ApplicationContainer = ({ currentUser, applications }) => {

    const filterApps = () => {
        return applications.filter(application => application.user_id === currentUser.id)
    }
    
    return (
        <VStack 
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            {filterApps().map(application => <Application key={application.id} {...application}/>)}
        </VStack>
    )
}

export default ApplicationContainer;