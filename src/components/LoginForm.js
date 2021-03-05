import React, {useState} from 'react';
import { Center, Box, Input, VStack, Button, Text } from "@chakra-ui/react";
import Logo from './Logo'

const LoginForm = ({ setCurrentUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(r => r.json())
            .then(data => {
                if (data.error_message) {
                    setError(data.error_message)
                } else {
                    const userData = JSON.parse(data.user_data)
                    localStorage.setItem("token", data.token)
                    setCurrentUser(userData)
                }
            })
    }

    return (
        <Center minHeight="100vh" bgGradient="linear(green.200, purple.200)">
            <Box w="35%" borderWidth="3px" borderColor="black" bg="white" p="10">
                <Logo/>
                <form onSubmit={e => handleSubmit(e)}>
                    <VStack spacing="24px">
                        <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        {error
                        ? <Text fontSize="sm" color="red">{error}</Text>
                        : null}
                        <Button
                            mt={4}
                            backgroundColor="black"
                            align="left"
                            type="submit"
                            color="white"
                        >
                            Log In
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}

export default LoginForm;