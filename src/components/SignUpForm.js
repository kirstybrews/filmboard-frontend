import React, { useState } from 'react';
import Logo from './Logo'
import { Center, Box, Input, VStack, Button, Text, Tooltip, FormHelperText, FormControl } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
// const USERS_URL = 'http://localhost:3000/users';
const USERS_URL = 'https://filmboard-backend.herokuapp.com/users';

const SignUp = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            user: {
                name: name,
                username: username,
                email: email,
                location: location,
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
                if (userData.errors) {
                    setErrors(userData.errors)
                    console.log(userData.errors)
                } else {
                    e.target.reset()
                    history.push('/login')
                }
            })
    }
    return (
        <Center minHeight="100vh" bgGradient="linear(green.200, purple.200)">
            <Box w="35%" borderWidth="3px" borderColor="black" bg="white" p="10">
                <Logo/>
                <form onSubmit={handleSubmit}>
                    <VStack spacing="24px">
                        <VStack w="100%">
                            <Input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name" />
                            {errors.name ? <Text fontSize="sm" color="red">Name {errors.name[0]}</Text> : null}
                        </VStack>
                        <VStack w="100%">
                            <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                            {errors.username ? <Text fontSize="sm" color="red">Username {errors.username[0]}</Text> : null}
                        </VStack>
                        <FormControl>
                            <VStack w="100%">
                                <Input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
                                {errors.email ? <Text fontSize="sm" color="red">Email {errors.email[0]}</Text> : <FormHelperText>Email will only be shared when you apply to job.</FormHelperText>}
                            </VStack>
                        </FormControl>
                        <FormControl>
                            <VStack w="100%">
                                <Input value={location} onChange={e => setLocation(e.target.value)} type="text" placeholder="Location (i.e. Austin, TX)" />
                                {errors.location ? <Text fontSize="sm" color="red">Location {errors.location[0]}</Text> : <FormHelperText>Location will only be shared when you apply to job.</FormHelperText>}
                            </VStack>
                        </FormControl>

                        <VStack w ="100%">
                            <Tooltip hasArrow label="Must contain at least 6 characters, a digit, a lower case character, an upper case character, and a symbol." bg="gray.300" color="black">
                                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </Tooltip>
                            {errors.password ? errors.password.map(password => <Text fontSize="sm" color="red">Password {password}</Text>) : null}
                        </VStack>
                        <VStack w="100%">
                            <Input value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type="password" placeholder="Confirm Password" />
                            {errors.password_confirmation ? <Text fontSize="sm" color="red">Password confirmation doesn't match password</Text> : null}
                        </VStack>
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