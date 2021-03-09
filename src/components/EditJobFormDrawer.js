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
    Input,
    Button,
    VStack,
    Textarea,
    NumberInput,
    NumberInputField,
    RadioGroup,
    Stack,
    Radio,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Select,
    Switch,
    FormControl,
    FormLabel,
    Flex,
    Box
} from "@chakra-ui/react";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
const JOBS_URL = 'http://localhost:3000/job_postings/';

const JobFormDrawer = ({ setJobPostings, jobPostings, currentUser, setCurrentUser, id, role, startDate, lengthOfTime, location, projectDesc, projectTitle, projectType, compensation, needGear }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [editRole, setRole] = useState(role)
    const [editStartDate, setStartDate] = useState(new Date(startDate))
    const [editLengthOfTime, setLengthOfTime] = useState(lengthOfTime.split(" ")[0])
    const [editLocation, setLocation] = useState(location)
    const [projectDescription, setProjectDescription] = useState(projectDesc)
    const [editTimeFormat, setTimeFormat] = useState(lengthOfTime.split(" ")[1])
    const [editProjectTitle, setProjectTitle] = useState(projectTitle)
    const [editProjectType, setProjectType] = useState(projectType)
    const [editCompensation, setCompensation] = useState(compensation)
    const [editNeedGear, setNeedGear] = useState(needGear)

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const newDate = longEnUSFormatter.format(editStartDate)
        const newLengthOfTime = editLengthOfTime + " " + editTimeFormat
        const newJobPosting = {
            role: editRole,
            start_date: newDate,
            length_of_time: newLengthOfTime,
            location: editLocation,
            project_description: projectDescription,
            project_title: editProjectTitle,
            project_type: editProjectType,
            compensation: editCompensation,
            need_gear: editNeedGear
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(newJobPosting)
        }
        fetch(JOBS_URL + id, reqPack)
            .then(r => r.json())
            .then(jobPosting => {
                if (jobPosting.error_message) {
                    alert(jobPosting.error_message)
                } else {
                    const updatedJobs = currentUser.job_postings
                    updatedJobs.map(job => job.id === jobPosting.id ? jobPosting : job)
                    const updatedUser = currentUser
                    updatedUser.job_postings = updatedJobs
                    const updatedAllJobs = jobPostings
                    updatedAllJobs.map(job => job.id === jobPosting.id ? jobPosting : job)
                    setCurrentUser(updatedUser)
                    setJobPostings(updatedAllJobs)
                    onClose()
                }
            })
    }
    return (
        <>
            <br/>
            <Link color="teal.500" onClick={onOpen}>Edit Job Posting</Link>
            <br/>
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
                            <DrawerHeader>Edit Job Posting</DrawerHeader>

                            <DrawerBody>
                                <VStack spacing="24px" alignItems="left">
                                    <FormControl>
                                        <FormLabel>
                                            Role:
                                        </FormLabel>
                                        <Input value={editRole} bg="white" placeholder="i.e. Cinematographer" onChange={e => setRole(e.target.value)} />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Start Date:</FormLabel>
                                        <Flatpickr
                                            value={editStartDate}
                                            onChange={date => {
                                                setStartDate(new Date(date))
                                            }}
                                            options={{ dateFormat: "F j, Y" }}
                                            placeholder="Start date..."
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Length of Time:
                                        </FormLabel>
                                        <Flex >
                                            <Box w="25%" mr="8">

                                                <NumberInput value={editLengthOfTime} onChange={setLengthOfTime}>
                                                    <NumberInputField  bg="white"  />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Box>
                                            
                                            <Box>

                                                <RadioGroup onChange={setTimeFormat} value={editTimeFormat}>
                                                    <Stack direction="column" >
                                                        <Radio value="day(s)">days(s)</Radio>
                                                        <Radio value="week(s)">week(s)</Radio>
                                                        <Radio value="month(s)">month(s)</Radio>
                                                        <Radio value="year(s)">year(s)</Radio>
                                                    </Stack>
                                                </RadioGroup>
                                            </Box>
                                        </Flex>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Location:
                                        </FormLabel>
                                        <Input value={editLocation} bg="white" placeholder="i.e. Austin, TX" onChange={e => setLocation(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Compensation:
                                        </FormLabel>
                                        <Input value={editCompensation} bg="white" placeholder="i.e. Meals provided." onChange={e => setCompensation(e.target.value)} />
                                    </FormControl>
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel mb="0">
                                            Must provide own gear?
                                        </FormLabel>
                                        <Switch isChecked={editNeedGear} onChange={() => setNeedGear(!editNeedGear)}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Title:
                                        </FormLabel>
                                        <Input bg="white" value={editProjectTitle} onChange={e => setProjectTitle(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Type:
                                        </FormLabel>
                                        <Select value={editProjectType} bg="white" placeholder="Select" onChange={e => setProjectType(e.target.value)}>
                                            <option value="Feature Length Film">Feature Length Film</option>
                                            <option value="Short Film">Short Film</option>
                                            <option value="Web Series">Web Series</option>
                                            <option value="Documentary">Documentary</option>
                                            <option value="Music Video">Music Video</option>
                                            <option value="Other">Other</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Description:
                                        </FormLabel>
                                        <Textarea bg="white" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
                                    </FormControl>
                                </VStack>
                            </DrawerBody>

                            <DrawerFooter >
                                <Button
                                    align="left"
                                    backgroundColor="black"
                                    type="submit"
                                    color="white"
                                >
                                    Edit Job!
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