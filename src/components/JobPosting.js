import React, { useState } from 'react';
import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { TimeIcon } from '@chakra-ui/icons'

const JobPosting = ({ role, location, start_date, length_of_time, project_description }) => {
    const [toggleShowDetails, setToggleShowDetails] = useState(false)
    return (
        <Box bg="orange.200">
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
            ? <Text>Project Description: {project_description}</Text>
            : null}
        </Box>
    )
}

export default JobPosting;