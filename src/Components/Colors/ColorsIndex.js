import React, {useState, useEffect} from 'react';
import ColorCard from './ColorCard';
import ColorsTable from './ColorsTable';
import {
    Row,
    Col,
    Container
} from 'reactstrap';

const ColorsIndex = (props) => {
    const [colors, setColors] = useState([]);

    const fetchColors = () => {
        fetch('http://localhost:3000/api/color', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => res.json())
        .then((colorData) => {
            console.log(colorData)
            setColors(colorData)
        })
    }

    useEffect(() => {
        fetchColors();
    }, [])

    return(
        <div class="card-deck">
            <Container>
                <Row>
                        <ColorsTable colors={colors} fetchColors={fetchColors} token={props.token}/>
                </Row>
            </Container>
        </div>
    )
}

export default ColorsIndex;