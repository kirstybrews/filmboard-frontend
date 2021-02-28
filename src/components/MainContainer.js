import React, { useEffect } from 'react';
import { VStack, StackDivider } from "@chakra-ui/react";
import JobPosting from './JobPosting'

const MainContainer = ({ jobPostings }) => {
    useEffect(() => {
        console.log('maincontainer mounted')
    })
    return (
        <VStack 
            w="80%"
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            {jobPostings.map(jobPosting => <JobPosting key={jobPosting.id} {...jobPosting}/>)}
        </VStack>
    )
}

export default MainContainer;