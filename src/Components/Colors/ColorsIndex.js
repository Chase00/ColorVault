import React, {useState, useEffect} from 'react';
import ColorsTable from './ColorsTable';
import ColorCreate from './ColorCreate';
import ColorEdit from './ColorEdit';
import {
    Row,
    Container,
    Button
} from 'reactstrap';
import './ColorModify.css'

const ColorsIndex = (props) => {
    const [colors, setColors] = useState([]);
    const [createActive, setCreateActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [colorToUpdate, setColorToUpdate] = useState({});

    useEffect(() => {
        fetchColors();
    }, [])

    const fetchColors = () => {
        fetch('http://localhost:3000/api/color', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => res.json())
        .then((colorData) => {
            setColors(colorData)
        })
    }

    const createOn = () => {
        setCreateActive(true);
    }

    const createOff = () => {
        setCreateActive(false);
    }

    const editUpdateColor = (color) => {
        setColorToUpdate(color);
        console.log(color);
    }

    const editOn = () => {
        setEditActive(true);
    }

    const editOff = () => {
        setEditActive(false);
    }

    return(
        <div class="card-deck">
            <Container>
            <div class="actions">
            <Button class="create" onClick={createOn}>Create Color</Button>
            </div>
                <Row>

                    <ColorsTable colors={colors} editUpdateColor={editUpdateColor} createOn={createOn} editOn={editOn} fetchColors={fetchColors} token={props.token}/>

                    {createActive ? <ColorCreate fetchColors={fetchColors} createOff={createOff} token={props.token}/> : <></>}

                    {editActive ? <ColorEdit colorToUpdate={colorToUpdate} editOff={editOff} token={props.token} fetchColors={fetchColors}/> : <></>}
                </Row>
            </Container>
        </div>
    )
}

export default ColorsIndex;