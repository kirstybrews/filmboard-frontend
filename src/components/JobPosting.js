import React, { useState } from 'react';
import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationModal from './ApplicationModal';
import ApplicationAccordion from './ApplicationAccordion';

const JobPosting = ({ role, location, start_date, length_of_time, project_description, user_id, userProfile, currentUser, id, applications }) => {
    const [toggleShowDetails, setToggleShowDetails] = useState(false)

    const applyButton = () => {
        if (currentUser) {
            if (!userProfile && user_id !== currentUser.id) {
                return <ApplicationModal userId={currentUser.id} jobPostingId={id}/>
            }
        }
    }

    return (
        <Box p="2" bg="green.100">
            <Text fontSize="lg">{role}</Text>
            <HStack spacing="24px">
                <Text>{location}</Text> 
                <Text> Starts {start_date}</Text>
                <HStack>
                    <TimeIcon/>
                    <Text> For {length_of_time}</Text> 
                </HStack>
                <Link color="teal.500" onClick={() => setToggleShowDetails(!toggleShowDetails)}>
                    Show Details
                </Link>
            </HStack>
            {toggleShowDetails
            ? <>
                <Text>Project Description: {project_description}</Text>
                {applyButton()}
                {userProfile ? <ApplicationAccordion applications={applications} /> : null}
            </>
            : null}
        </Box>
    )
}

export default JobPosting;