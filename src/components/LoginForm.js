import React, {useState} from 'react';
import { Center, Box, Input, VStack, Button } from "@chakra-ui/react";
import Logo from './Logo'

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
                const userData = JSON.parse(data.user_data)
                if (data.error_message) {
                    alert(data.error_message)
                } else {
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