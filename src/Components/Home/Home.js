import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Home.css'
import '../../App.css';
const Home = () => {
    return (
        <Container className="home-container">
            <Row>
                <Col md="6">
                    <h1>Color Vault</h1>
                    <h2>Store your colors with ease.</h2>
                    <p>Providing a free and easy solution for keeping track of your digital color codes. Whether you're a graphic designer working on the next eye-catching ad or web designer creating a new site layout, this product is for you!</p>
                    <button class="button-main">Sign Up</button> <button class="button-secondary">Log In</button>
                </Col>
                <Col md="6" >
                <img class="color-book" src="/images/colorbook.svg" alt="color book"></img>
                </Col>
            </Row>
        </Container>   
    )
}

export default Home;