import React, { useState, useEffect } from 'react';
import { VStack, StackDivider } from "@chakra-ui/react";
import Application from './Application';
const APPLICATIONS_URL = 'http://localhost:3000/applications';

const ApplicationContainer = ({ currentUser }) => {
    const [applications, setApplications] = useState([])

    const filterApps = () => {
        return applications.filter(application => application.user_id === currentUser.id)
    }

    useEffect(() => {
        fetch(APPLICATIONS_URL)
            .then(r => r.json())
            .then(applications => {
                setApplications(applications)
            })
    }, [])
    
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