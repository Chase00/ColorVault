import React, { useState } from 'react';
import APIURL from '../../Helpers/enviroment';
import { MdPerson, MdLock, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from "yup";
import './Auth.css';
import Error from "./Error";
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

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .max(40, "Email address is too long")
      .required("Required"),
    username: Yup.string()
      .min(3, "Username must be atleast 3 characters")
      .max(16, "Username can be no more than 16 characters")
      .required("Required"),
    password: Yup.string()
      .min(5, "Password must be atleast 5 characters")
      .max(255, "Password is far too long")
      .required("Required"),
  });


const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container className="auth-container">
            <Row>
                <Col md="4" />
                <Col md="4">
                    <h2 class="auth-title">Register</h2>

                    <Formik
                    initialValues={{ email, username, password }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);
                        
                        fetch(`${APIURL}/api/user/signup`, {
                            method: 'POST',
                            body: JSON.stringify({
                
                                user: {
                                    email: values.email,
                                    username: values.username,
                                    password: values.password
                
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
                    }}
                    
                    >
                        
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="email">Email <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup className={touched.email && errors.email ? "has-error" : null}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdEmail size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <Error touched={touched.email} message={errors.email} />

                        <Label htmlFor="username" class="field-label">Username <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup className={touched.username && errors.username ? "has-error" : null}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdPerson size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                />
                        </InputGroup>
                        <Error touched={touched.username} message={errors.username} />

                        <Label htmlFor="password">Password <span style={{ color: "red" }}>*</span></Label>
                        <InputGroup className={touched.password && errors.password ? "has-error" : null}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><MdLock size={20} /></InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                />
                        </InputGroup>
                        <Error touched={touched.password} message={errors.password} />

                        <div style={{ textAlign: "center" }}>
                            <button type="submit"  disabled={isSubmitting} class="user-button">Register</button>
                        </div>
                        </Form>
                        )}
                    </Formik>
                    <Link to="/login"><p class="auth-link">Already have an account? <br /> Click here to <b>Log in</b></p></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;