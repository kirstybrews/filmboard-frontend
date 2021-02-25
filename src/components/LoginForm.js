import React, {useState} from 'react';

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
            .then(userData => {
                if (userData.error_message) {
                    alert(userData.error_message)
                } else {
                    setCurrentUser(userData)
                }
            })
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label for="username">username</label>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            <br/>
            <label for="password">password</label>
            <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
            <input type="submit"/>
        </form>
    )
}

export default LoginForm;