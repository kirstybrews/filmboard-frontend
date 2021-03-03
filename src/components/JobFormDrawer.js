import React, { useRef, useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Link,
    HStack,
    Input,
    Button,
    VStack,
    Textarea
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
const JOBS_URL = 'http://localhost:3000/job_postings/'

const JobFormDrawer = ({ setJobPostings, jobPostings, currentUser, setCurrentUser }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [role, setRole] = useState("")
    const [startDate, setStartDate] = useState("")
    const [lengthOfTime, setLengthOfTime] = useState("")
    const [location, setLocation] = useState("")
    const [projectDescription, setProjectDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newJobPosting = {
            role: role,
            start_date: startDate,
            length_of_time: lengthOfTime,
            location: location,
            project_description: projectDescription,
            user_id: currentUser.id
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newJobPosting)
        }
        fetch(JOBS_URL, reqPack)
            .then(r => r.json())
            .then(jobPosting => {
                if (jobPosting.error_message) {
                    alert(jobPosting.error_message)
                } else {
                    const updatedJobs = currentUser.job_postings
                    updatedJobs.push(jobPosting)
                    currentUser.job_postings = updatedJobs
                    setCurrentUser(currentUser)
                    setJobPostings([...jobPostings, jobPosting])
                    onClose()
                }
            })
    }
    return (
        <>
            <HStack>
                <AddIcon />
                <Link onClick={onOpen}>Create Job Posting</Link>
            </HStack>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="sm"
            >
                <DrawerOverlay>
                    <form onSubmit={handleSubmit}>

                        <DrawerContent bgGradient="linear(green.200, purple.200)">
                            <DrawerCloseButton />
                            <DrawerHeader>Create New Job Posting</DrawerHeader>

                            <DrawerBody>
                                <VStack spacing="24px">
                                    <Input bg="white" placeholder="What role are you looking for?" onChange={e => setRole(e.target.value)}/>
                                    <Input bg="white" placeholder="What's the start date?" onChange={e => setStartDate(e.target.value)}/>
                                    <Input bg="white" placeholder="How long do you need this role to be filled?" onChange={e => setLengthOfTime(e.target.value)}/>
                                    <Input bg="white" placeholder="Location?" onChange={e => setLocation(e.target.value)}/>
                                    <Textarea bg="white" placeholder="Provide a description for this project." onChange={e => setProjectDescription(e.target.value)}/>
                                </VStack>
                            </DrawerBody>

                            <DrawerFooter >
                                <Button 
                                    align="left" 
                                    backgroundColor="black"
                                    type="submit"
                                    color="white"
                                >
                                    Post Job!
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </form>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default JobFormDrawer;