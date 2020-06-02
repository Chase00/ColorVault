import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../../Helpers/enviroment';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${APIURL}/api/user/signup`, {
            method: 'POST',
            body: JSON.stringify({

            user: {
                email: email, 
                username: username, 
                password: password

            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return(
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input 
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        minLength={3}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        minLength={3}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
    )
}

export default Register;