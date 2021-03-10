import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, 
    Textarea
  } from "@chakra-ui/react";
const APPLICATIONS_URL = 'http://localhost:3000/applications/'

const ApplicationModal = ({ jobPostingId, app, currentUser, apps, setApps}) => {
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const newApp = {
            message: message,
            user_id: currentUser.id,
            job_posting_id: jobPostingId
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newApp)
        }
        fetch(APPLICATIONS_URL, reqPack)
            .then(r => r.json())
            .then(appData => {
                const allApps = apps
                allApps.push(appData)
                setApps(allApps)
                onClose()
            })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <br/>
            {app()
            ? <Button onClick={onOpen} backgroundColor="black" color="white">Apply Now!</Button>
            : <Button isDisabled backgroundColor="black" color="white">Already Applied</Button>}
            
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleSubmit}>

                    <ModalContent bgGradient="linear(green.200, purple.200)">
                    <ModalHeader>Send a message to the job poster!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea bg="white" placeholder="Why do you want this job?" onChange={e => setMessage(e.target.value)}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button type="submit" backgroundColor="black" color="white">Apply!</Button>
                    </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default ApplicationModal;