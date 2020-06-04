import React, { useState } from 'react';
import APIURL from '../../Helpers/enviroment';
import { MdPerson, MdLock, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom'
import './Auth.css';
import { Form,  
    Label, 
    Input, 
    Container, 
    Row, 
    Col, 
    InputGroupAddon,
    InputGroup, 
    InputGroupText 
} from 'reactstrap';

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

                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <Container className="auth-container">
            <Row>
                <Col md="4" />
                <Col md="4">
                    <h2 class="auth-title">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="email">Email <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdEmail size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <Label htmlFor="username" class="field-label">Username <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdPerson size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Username"
                                required
                                minLength={3}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </InputGroup>

                        <Label htmlFor="password">Password <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdLock size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                minLength={3}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </InputGroup>

                        <div style={{ textAlign: "center" }}>
                            <button type="submit" class="user-button">Register</button>
                        </div>
                    </Form>
                    <Link to="/login"><p class="auth-link">Already have an account? <br /> Click here to <b>Log in</b></p></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;