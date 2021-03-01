import React from 'react';
import { VStack, StackDivider } from "@chakra-ui/react";
import JobPosting from './JobPosting';

const JobPostingContainer = ({ jobPostings, w }) => {
    
    return (
        <VStack 
            w={w}
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            {jobPostings.map(jobPosting => <JobPosting key={jobPosting.id} {...jobPosting}/>)}
        </VStack>
    )
}

export default JobPostingContainer;