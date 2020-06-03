import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Home.css'
import '../../App.css';
import {
    Link,
  } from 'react-router-dom'
const Home = () => {
    return (
        <Container className="home-container">
            <Row>
                <Col md="6">
                    <h1 class="home-title">Color Vault</h1>
                    <h2 class="home-second">Store your colors with ease.</h2>
                    <p class="home-text">Providing a free and easy solution for keeping track of your digital color codes. Whether you're a graphic designer working on the next eye-catching ad or web designer creating a new site layout, this product is for you!</p>
                    <Link to="/signup"><button class="button-main">Sign Up</button></Link>
                    <Link to="/login"><button class="button-secondary">Log in</button></Link>
                </Col>
                <Col md="6" >
                <img class="color-book" src="/images/colorbook.svg" alt="color book"></img>
                </Col>
            </Row>
        </Container>   
    )
}

export default Home;