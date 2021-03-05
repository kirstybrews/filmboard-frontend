import React from 'react';
import { VStack, StackDivider } from "@chakra-ui/react";
import JobPosting from './JobPosting';
import JobFormDrawer from './JobFormDrawer'

const JobPostingContainer = ({ jobPostings, w, userProfile, ml, setJobPostings, currentUser, setCurrentUser, applications }) => {
    let postings
    userProfile
    ? postings = currentUser.job_postings
    : postings = jobPostings
    return (
        <VStack 
            w={w}
            ml={ml}
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            {userProfile
            ? <JobFormDrawer 
                currentUser={currentUser} 
                jobPostings={jobPostings} 
                setJobPostings={setJobPostings} 
                setCurrentUser={setCurrentUser}
            />
            : null}
            {postings.map(posting => <JobPosting currentUser={currentUser} userProfile={userProfile} key={posting.id} {...posting} apps={applications}/>)}
            
        </VStack>
    )
}

export default JobPostingContainer;