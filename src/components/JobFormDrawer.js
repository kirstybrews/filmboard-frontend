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
    Textarea,
    Text,
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
    FormLabel
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
const JOBS_URL = 'http://localhost:3000/job_postings/';

const JobFormDrawer = ({ setJobPostings, jobPostings, currentUser, setCurrentUser }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const [role, setRole] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [lengthOfTime, setLengthOfTime] = useState("")
    const [location, setLocation] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [timeFormat, setTimeFormat] = useState("")
    const [projectTitle, setProjectTitle] = useState("")
    const [projectType, setProjectType] = useState("")
    const [compensation, setCompensation] = useState("")
    const [needGear, setNeedGear] = useState(false)

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const newDate = longEnUSFormatter.format(startDate)
        const newLengthOfTime = lengthOfTime + " " + timeFormat
        const newJobPosting = {
            role: role,
            start_date: newDate,
            length_of_time: newLengthOfTime,
            location: location,
            project_description: projectDescription,
            user_id: currentUser.id,
            project_title: projectTitle,
            project_type: projectType,
            compensation: compensation,
            need_gear: needGear
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
                                <VStack spacing="24px" alignItems="left">
                                    <Input bg="white" placeholder="What role are you looking for?" onChange={e => setRole(e.target.value)} />
                                    <VStack alignItems="left">
                                        <Text color="grey" >Start Date:</Text>
                                        <Flatpickr
                                            value={startDate}
                                            onChange={date => {
                                                setStartDate(new Date(date))
                                            }}
                                            options={{ dateFormat: "F j, Y" }}
                                            placeholder="Start date..."
                                        />
                                    </VStack>
                                    <NumberInput onChange={setLengthOfTime}>
                                        <NumberInputField bg="white" placeholder="How long do you need this role to be filled?" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <RadioGroup onChange={setTimeFormat} value={timeFormat}>
                                        <Stack direction="row">
                                            <Radio value="day(s)">days(s)</Radio>
                                            <Radio value="week(s)">week(s)</Radio>
                                            <Radio value="month(s)">month(s)</Radio>
                                            <Radio value="year(s)">year(s)</Radio>
                                        </Stack>
                                    </RadioGroup>
                                    <Input bg="white" placeholder="Location?" onChange={e => setLocation(e.target.value)} />
                                    <Input bg="white" placeholder="Compensation (i.e. 'Meals provided', etc.)" onChange={e => setCompensation(e.target.value)} />
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel color="grey" mb="0">
                                            Must provide own gear?
                                        </FormLabel>
                                        <Switch onChange={() => setNeedGear(true)}/>
                                    </FormControl>
                                    <Input bg="white" placeholder="Project Title" onChange={e => setProjectTitle(e.target.value)} />
                                    <Select bg="white" placeholder="Project Type" onChange={e => setProjectType(e.target.value)}>
                                        <option value="Feature Length Film">Feature Length Film</option>
                                        <option value="Short Film">Short Film</option>
                                        <option value="Web Series">Web Series</option>
                                        <option value="Documentary">Documentary</option>
                                        <option value="Music Video">Music Video</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    <Textarea bg="white" placeholder="Provide a description for this project." onChange={e => setProjectDescription(e.target.value)} />
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