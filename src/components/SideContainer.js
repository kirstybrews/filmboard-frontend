import React, { useState, useRef } from 'react';
import Filter from './Filter';
import {
    Box,
    Text,
    Link,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
const USERS_URL = 'http://localhost:3000/users/'


const SideContainer = ({ id, name, userProfile, setCurrentUser, search, setSearch }) => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const handleDelete = () => {
        fetch(USERS_URL + id, { method: "DELETE" })
            .then(r => r.json())
            .then(() => {
                localStorage.removeItem("token")
                setCurrentUser(null)
            })
    }
    return (
        <Box w="20%" >
            <VStack align="left">
                {userProfile
                    ? <>
                        <Text fontSize="lg">{name}</Text>
                        <Link color="red" onClick={() => setIsOpen(true)}>
                            Delete Account
                        </Link>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent bgGradient="linear(green.200, purple.200)">
                                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                        Delete Account
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can't undo this action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button bg="black" color="white" ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </>
                    : <Filter search={search} setSearch={setSearch}/>}

            </VStack>
        </Box>
    )
}

export default SideContainer;