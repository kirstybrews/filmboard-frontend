import React, {useState} from 'react';
import { Center, Box, Input, VStack, Button } from "@chakra-ui/react";

const LoginForm = ({ setCurrentUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('attempted login')
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
                    alert(data.error_message)
                } else {
                    localStorage.setItem("token", data.token)
                    setCurrentUser(data.user_data)
                }
            })
    }

    return (
        <Center h="630px" bg="cyan.100">
            <Box w="50%" borderWidth="3px" borderColor="gray.200" bg="white" p="10">
                <form onSubmit={e => handleSubmit(e)}>
                    <VStack spacing="24px">
                        <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <Button
                            mt={4}
                            backgroundColor="grey.200"
                            align="left"
                            type="submit"
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