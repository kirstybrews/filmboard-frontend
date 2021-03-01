import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import JobPostingContainer from './JobPostingContainer';
import ApplicationContainer from './ApplicationContainer'

const MainContainer = ({ jobPostings, userProfile, currentUser }) => {
    
    return (
        <>
            {userProfile
            ? <Tabs w="80%" variant="enclosed" ml="4">
                <TabList>
                    <Tab>My Job Postings</Tab>
                    <Tab>My Applications</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <JobPostingContainer w={null} userProfile={userProfile} jobPostings={jobPostings} />
                    </TabPanel>
                    <TabPanel>
                        <ApplicationContainer currentUser={currentUser} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        : <JobPostingContainer jobPostings={jobPostings} w="80%" ml="4"/>}
        </>
    )
}

export default MainContainer;