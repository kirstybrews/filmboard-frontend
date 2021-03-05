import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import JobPostingContainer from './JobPostingContainer';
import ApplicationContainer from './ApplicationContainer';
const APPLICATIONS_URL = 'http://localhost:3000/applications';

const MainContainer = ({ jobPostings, userProfile, currentUser, setJobPostings, setCurrentUser}) => {
    const [applications, setApplications] = useState([])

    useEffect(() => {
        fetch(APPLICATIONS_URL)
            .then(r => r.json())
            .then(applications => {
                setApplications(applications)
            })
        return () => {
            setApplications([])
        };
    }, [])
    return (
        <>
            {userProfile
            ? <Tabs w="80%" variant="enclosed" ml="4"  >
                <TabList >
                    <Tab>My Job Postings</Tab>
                    <Tab>My Applications</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <JobPostingContainer 
                            setJobPostings={setJobPostings} 
                            w={null} 
                            userProfile={userProfile} 
                            jobPostings={jobPostings}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ApplicationContainer currentUser={currentUser} applications={applications}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        : <JobPostingContainer userProfile={userProfile} currentUser={currentUser} jobPostings={jobPostings} w="80%" ml="4" applications={applications}/>}
        </>
    )
}

export default MainContainer;