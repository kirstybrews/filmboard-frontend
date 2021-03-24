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
    Box,
    FormHelperText,
    Text
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
// const JOBS_URL = 'http://localhost:3000/job_postings/';
const JOBS_URL = 'https://filmboard-backend.herokuapp.com/job_postings/';

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
    const [compensation, setCompensation] = useState("None")
    const [needGear, setNeedGear] = useState(false)
    const [errors, setErrors] = useState({})

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
            need_gear: needGear,
            status: "Accepting Applicants"
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
                if (jobPosting.errors) {
                    setErrors(jobPosting.errors)
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
                                    <FormControl>
                                        <FormLabel>
                                            Role:
                                        </FormLabel>
                                        <Input bg="white" placeholder="i.e. Cinematographer" onChange={e => setRole(e.target.value)} />
                                        {errors.role ? <Text  fontSize="sm" color="red">Role {errors.role[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Start Date:</FormLabel>
                                        <Flatpickr
                                            value={startDate}
                                            onChange={date => {
                                                setStartDate(new Date(date))
                                            }}
                                            options={{ dateFormat: "F j, Y" }}
                                            placeholder="Start date..."
                                            />
                                        {errors.start_date ? <Text  fontSize="sm" color="red">Start date {errors.start_date[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Length of Time:
                                        </FormLabel>
                                        <Flex >
                                            <Box w="25%" mr="8">

                                                <NumberInput onChange={setLengthOfTime}>
                                                    <NumberInputField bg="white" />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Box>

                                            <Box>

                                                <RadioGroup onChange={setTimeFormat} value={timeFormat}>
                                                    <Stack direction="column" >
                                                        <Radio value="day(s)">days(s)</Radio>
                                                        <Radio value="week(s)">week(s)</Radio>
                                                        <Radio value="month(s)">month(s)</Radio>
                                                        <Radio value="year(s)">year(s)</Radio>
                                                    </Stack>
                                                </RadioGroup>
                                            </Box>
                                        {errors.length_of_time ? <Text ml="6" fontSize="sm" color="red">Length of time {errors.length_of_time[0]}</Text> : null}
                                        </Flex>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Location:
                                        </FormLabel>
                                        <Input bg="white" placeholder="i.e. Austin, TX" onChange={e => setLocation(e.target.value)} />
                                        {errors.location ? <Text  fontSize="sm" color="red">Location {errors.location[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Compensation:
                                        </FormLabel>
                                        <Input bg="white" placeholder="i.e. Meals provided." onChange={e => setCompensation(e.target.value)} />
                                    </FormControl>
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel mb="0">
                                            Must provide own gear?
                                        </FormLabel>
                                        <Switch onChange={() => setNeedGear(true)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Title:
                                        </FormLabel>
                                        <Input bg="white" onChange={e => setProjectTitle(e.target.value)} />
                                        {errors.project_title ? <Text  fontSize="sm" color="red">Project title {errors.project_title[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Type:
                                        </FormLabel>
                                        <Select bg="white" placeholder="Select" onChange={e => setProjectType(e.target.value)}>
                                            <option value="Feature Length Film">Feature Length Film</option>
                                            <option value="Short Film">Short Film</option>
                                            <option value="Web Series">Web Series</option>
                                            <option value="Documentary">Documentary</option>
                                            <option value="Music Video">Music Video</option>
                                            <option value="Other">Other</option>
                                        </Select>
                                        {errors.project_type ? <Text  fontSize="sm" color="red">Project type {errors.project_type[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Project Description:
                                        </FormLabel>
                                        <Textarea bg="white" onChange={e => setProjectDescription(e.target.value)} />
                                        {errors.project_description ? <Text  fontSize="sm" color="red">Project description {errors.project_description[0]}</Text> : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            Status:
                                        </FormLabel>
                                        <Select value="Accepting Applicants" bg="white" >
                                            <option value="Accepting Applicants">Accepting Applicants</option>
                                            <option isDisabled value="Reviewing Applicants">Reviewing Applicants</option>
                                            <option isDisabled value="Role Has Been Filled">Role Has Been Filled</option>
                                        </Select>
                                        <FormHelperText>You'll be able to change status after creating the job posting.</FormHelperText>
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