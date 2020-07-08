import React, { useState } from 'react';
import APIURL from '../../Helpers/enviroment';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from "yup";
import Error from "./Error";
import InvalidUser from "./Error";
import './Auth.css'
import { 
    Form, 
    Label, 
    Input, 
    Container, 
    Row, 
    Col, 
    InputGroup, 
    InputGroupAddon, 
    InputGroupText 
} from 'reactstrap';

const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("No email entered"),
    password: Yup.string()
      .required("No password entered"),
  });

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    return (
        <Container className="auth-container">
            <Row>
                <Col md="4" />
                <Col md="4">
                    <h2 class="auth-title">Log in to your account</h2>
                    <Formik
                    initialValues={{ email, password }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setSubmitting(true);

                        fetch(`${APIURL}/api/user/login`, {
                            method: 'POST',
                            body: JSON.stringify({
                
                                user: {
                                    email: values.email,
                                    password: values.password
                
                                }
                            }),
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        }).then((response) => {
                            response.json()
                        }
                        ).then((data) => {
                            props.updateToken(data.sessionToken)
                        }).catch(err => setIsValid(false));
                    }}
                    >
                        
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>

                    {!isValid ? <div className="form-message invalid">Username and password combination is invalid!</div> : <></>}
                        <Label htmlFor="email">Email</Label>
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

                        <Label htmlFor="password">Password</Label>
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
                            <button type="submit" class="user-button">Log In</button>
                        </div>
                    </Form>
                       )}
                    </Formik>
                    <Link to="/signup"><p class="auth-link"> Don't have an account? <br /> Click here to <b>Sign Up</b></p></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;