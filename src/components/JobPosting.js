import React, { useState } from 'react';
import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationModal from './ApplicationModal';
import ApplicationAccordion from './ApplicationAccordion';
import EditJobFormDrawer from './EditJobFormDrawer';
import { Icon } from '@iconify/react';
import calendarEvent from '@iconify-icons/bi/calendar-event';
import locationIcon from '@iconify-icons/bytesize/location';


const JobPosting = ({  apps, id, currentUser, userProfile, user_id, setApps, role, location, start_date, length_of_time, project_title, project_type, project_description, compensation, need_gear, applications, setJobPostings, jobPostings, setCurrentUser, status }) => {
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
                    <Text> Starts {start_date}</Text>
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
                
                <Text>Project Title: {project_title}</Text>
                <Text>Project Type: {project_type}</Text>
                <Text>Project Description: {project_description}</Text>
                {compensation !== "None" ? <Text>Compensation: {compensation}</Text> : null}
                {need_gear ? <Text as="strong">Must provide your own gear.</Text> : null}
                {userProfile ? <Text>Status: {status}</Text> : null}
                {userProfile ? <EditJobFormDrawer status={status} role={role} lengthOfTime={length_of_time} startDate={start_date} location={location} projectDesc={project_description} projectTitle={project_title} projectType={project_type} compensation={compensation} needGear={need_gear} setJobPostings={setJobPostings} jobPostings={jobPostings} currentUser={currentUser} setCurrentUser={setCurrentUser} id={id}/> : null}
                {applyButton()}
                {userProfile && applications.length > 0 ? <ApplicationAccordion applications={applications} /> : null}
            </>
            : null}
        </Box>
    )
}

export default JobPosting;