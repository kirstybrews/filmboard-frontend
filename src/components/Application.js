import React, { useState } from 'react';
import { Box, Text, HStack, Link, Flex, Spacer } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationMessage from './ApplicationMessage';

const Application = ({ job_posting, message, id }) => {
    const {role, location, start_date, length_of_time, project_description, status} = job_posting
    const [toggleShowDetails, setToggleShowDetails] = useState(false)
    return (
        <Box p="2" bg="green.100">
            <Flex>
                <Text fontSize="lg">{role}</Text>
                <Spacer/>
                {status === "Accepting Applicants" ? <Text as="i" fontSize="lg">Application Sent</Text> : null}
                {status === "Reviewing Applicants" ? <Text as="i"fontSize="lg">Job Poster Is Reviewing Applicants</Text> : null}
                {status === "Role Has Been Filled" ? <Text as="i"fontSize="lg">This Role Has Been Filled</Text> : null}
            </Flex>
            
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
                <Text>Your Message: </Text>
                <ApplicationMessage id={id} message={message}/>
            </>
            : null}
        </Box>
    )
}

export default Application;