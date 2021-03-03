import React, { useState } from 'react';
import { Center, Box, Input, VStack, Button } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
const USERS_URL = 'http://localhost:3000/users';

const SignUp = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            user: {
                name: name,
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            }
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newUser)
        }
        
        fetch(USERS_URL, reqPack)
            .then(r => r.json())
            .then(userData => {
                if (userData.error_message) {
                    alert(userData.error_message)
                } else {
                    e.target.reset()
                    history.push('/login')
                }
            })
    }
    return (
        <Center h="630px" bgGradient="linear(green.200, purple.200)">
            <Box w="50%" borderWidth="3px" borderColor="black" bg="white" p="10">
                <form onSubmit={handleSubmit}>
                    <VStack spacing="24px">
                        <Input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" />
                        <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <Input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type="password" placeholder="Confirm Password" />
                        <Button
                            mt={4}
                            backgroundColor="black"
                            align="left"
                            type="submit"
                            color="white"
                        >
                            Create Account
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}

export default SignUp;