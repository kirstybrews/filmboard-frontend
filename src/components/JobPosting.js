import React, { useState } from 'react';
import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationModal from './ApplicationModal';
import ApplicationAccordion from './ApplicationAccordion';
import { Icon } from '@iconify/react';
import calendarEvent from '@iconify-icons/bi/calendar-event';
import locationIcon from '@iconify-icons/bytesize/location';


const JobPosting = ({ role, location, start_date, length_of_time, project_description, user_id, userProfile, currentUser, id, apps, applications, setApps }) => {
    const [toggleShowDetails, setToggleShowDetails] = useState(false)

    const checkApps = () => {
        let app = null
        apps.map(application => application.job_posting_id === id && application.user_id === currentUser.id ? app = application : null)
        return !app
    }

    const applyButton = () => {
        if (currentUser) {
            if (!userProfile && user_id !== currentUser.id) {
                return <ApplicationModal app={checkApps} jobPostingId={id} currentUser={currentUser} apps={apps} setApps={setApps}/>
            }
        }
    }

    return (
        <Box p="2" bg="green.100">
            <Text fontSize="lg">{role}</Text>
            <HStack spacing="24px">
                <HStack>
                    <Icon icon={locationIcon} mt="4"/>
                    <Text>{location}</Text> 
                </HStack>
                <HStack>
                    <Icon icon={calendarEvent} />
                    <Text> Starts {start_date.split(",")[0]}</Text>
                </HStack>
                <HStack>
                    <TimeIcon/>
                    <Text> For {length_of_time}</Text> 
                </HStack>
                <Link color="teal.500" onClick={() => setToggleShowDetails(!toggleShowDetails)}>
                    {toggleShowDetails ? "Hide Details" : "Show Details"}
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