import React, { useState } from 'react';
import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons';
import ApplicationMessage from './ApplicationMessage';

const Application = ({ job_posting, message, id }) => {
    const {role, location, start_date, length_of_time, project_description} = job_posting
    const [toggleShowDetails, setToggleShowDetails] = useState(false)
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
                <HStack>
                    <Text>Your Message: </Text>
                    <ApplicationMessage id={id} message={message}/>
                </HStack>
            </>
            : null}
        </Box>
    )
}

export default Application;