import React, { useState } from 'react';
import { Box, Text, HStack, Link, Flex, Spacer } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationMessage from './ApplicationMessage';

const Application = ({ job_posting, message, id }) => {
    const {role, location, start_date, length_of_time, project_description, status, project_title, project_type, compensation, need_gear} = job_posting
    const [toggleShowDetails, setToggleShowDetails] = useState(false)
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Flex>
                <Text fontSize="lg">{role}</Text>
                <Spacer/>
                {status === "Accepting Applicants" ? <Text as="em" fontSize="lg">Application Sent</Text> : null}
                {status === "Reviewing Applicants" ? <Text as="em"fontSize="lg">Job Poster Is Reviewing Applicants</Text> : null}
                {status === "Role Has Been Filled" ? <Text as="em"fontSize="lg">This Role Has Been Filled</Text> : null}
            </Flex>
            
            <HStack mt="1" spacing="24px">
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
                <Box w="100%" h="3px" mt="3" mb="3" bgGradient="linear(to-r, green.200, purple.200)"/>
                <Text>Project Title: {project_title}</Text>
                <Text>Project Type: {project_type}</Text>
                <Text>Project Description: {project_description}</Text>
                {compensation !== "None" ? <Text>Compensation: {compensation}</Text> : null}
                {need_gear ? <Text as="strong">Must provide your own gear.</Text> : null}
           
                <Text mt="3">Your Message: </Text>
                <ApplicationMessage id={id} message={message}/>
            </>
            : null}
        </Box>
    )
}

export default Application;