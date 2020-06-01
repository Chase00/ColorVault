import React, {useState, useEffect} from 'react';
import ColorsTable from './ColorsTable';
import ColorCreate from './ColorCreate';
import {
    Row,
    Col,
    Container,
    Button
} from 'reactstrap';
import './ColorModify.css'

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

    const [updateActive, setUpdateActive] = useState(false);

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => {
        fetchColors();
    }, [])

    return(
        <div class="card-deck">
            <Container>
            <div class="actions">
            <Button class="create" onClick={updateOn}>Create Color</Button>
            </div>
                <Row>

                    <ColorsTable colors={colors} updateOn={updateOn} fetchColors={fetchColors} token={props.token}/>

                    {updateActive ? <ColorCreate fetchColors={fetchColors} updateOff={updateOff} token={props.token}/> : <></>}
                </Row>
            </Container>
        </div>
    )
}

export default ColorsIndex;