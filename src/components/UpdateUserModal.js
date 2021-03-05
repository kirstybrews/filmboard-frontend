import React, { useRef, useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Link,
    useDisclosure,
    VStack,
    Input,
    Button,
    Textarea,
    Text
} from "@chakra-ui/react"
const USERS_URL = 'http://localhost:3000/users/'

const UpdateUserModal = ({ id, name, username, bio, avatar, setCurrentUser}) => {
    const [formName, setFormName] = useState(name);
    const [formAvatar, setFormAvatar] = useState(avatar);
    const [formBio, setFormBio] = useState(bio);
    const [formUsername, setFormUsername] = useState(username);
    const [errors, setErrors] = useState({})

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedUser = {
            name: formName,
            username: formUsername,
            avatar: formAvatar,
            bio: formBio
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(updatedUser)
        }
        fetch(USERS_URL + id, reqPack)
            .then(r => r.json())
            .then(userData => {
                if (userData.errors) {
                    setErrors(userData.errors)
                    console.log(userData.errors)
                } else {
                    setCurrentUser(userData)
                    onClose()
                }
            })
    }

    return (
        <>
            <Link color="blue.600" onClick={onOpen}>
                Edit Profile
            </Link>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="xs"
        >
            <DrawerOverlay>
                <form onSubmit={handleSubmit}>

                    <DrawerContent bgGradient="linear(green.200, purple.200)">
                        <DrawerCloseButton />
                        <DrawerHeader>Edit Account Info</DrawerHeader>

                        <DrawerBody>
                            <VStack spacing="24px">
                                <VStack w="100%">
                                    <Input value={formName} bg="white" onChange={e => setFormName(e.target.value)}/>
                                    {errors.name ? <Text fontSize="sm" color="red">Name {errors.name[0]}</Text> : null}
                                </VStack>
                                <VStack w="100%">
                                    <Input bg="white" value={formUsername} onChange={e => setFormUsername(e.target.value)}/>
                                    {errors.username ? <Text fontSize="sm" color="red">Username {errors.username[0]}</Text> : null}
                                </VStack>
                                <Input bg="white" value={formAvatar} placeholder={avatar === null ? "Avatar Image URL" : null} onChange={e => setFormAvatar(e.target.value)}/>
                                <Textarea bg="white" value={formBio} placeholder={bio === null ? "Bio" : null} onChange={e => setFormBio(e.target.value)}/>
                            </VStack>
                        </DrawerBody>

                        <DrawerFooter >
                            <Button 
                                align="left" 
                                backgroundColor="black"
                                type="submit"
                                color="white"
                            >
                                Edit Profile!
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </form>
            </DrawerOverlay>
        </Drawer>
    </>
    )
}

export default UpdateUserModal;