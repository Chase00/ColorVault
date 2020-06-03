import React, { useState, useEffect } from 'react';
import ColorsTable from './ColorsTable';
import ColorCreate from './ColorCreate';
import ColorEdit from './ColorEdit';
import NoColors from './NoColors';
import APIURL from '../../Helpers/enviroment';
import {
    Row,
    Container,
} from 'reactstrap';
import './ColorModify.css'

const ColorsIndex = (props) => {
    const [colors, setColors] = useState([]);
    const [createActive, setCreateActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [colorToUpdate, setColorToUpdate] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        fetchColors();
    }, [])

    const fetchColors = () => {
        fetch(`${APIURL}/api/color`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
            .then((colorData) => {
                setColors(colorData)
                console.log(colorData)
                activeColors(colorData)
            })
    }

    const activeColors = (data) => {
        if (data.length === 0) {
            console.log("EMPTYYYYYY")
            setIsEmpty(true)
        } else {
            console.log("Has colors")
            setIsEmpty(false);
        }
    }

    const createOn = () => {
        setCreateActive(true);
    }

    const createOff = () => {
        setCreateActive(false);
    }

    const editUpdateColor = (color) => {
        setColorToUpdate(color);
    }

    const editOn = () => {
        setEditActive(true);
    }

    const editOff = () => {
        setEditActive(false);
    }

    return (

        <Container>
            <div class="actions">
                <button class="button-main" onClick={createOn}>Create Color</button>
                {isEmpty ? <NoColors /> : <></>}
            </div>
            <Row>
                <ColorsTable colors={colors} editUpdateColor={editUpdateColor} createOn={createOn} editOn={editOn} fetchColors={fetchColors} token={props.token} />

                {createActive ? <ColorCreate fetchColors={fetchColors} createOff={createOff} token={props.token} /> : <></>}

                {editActive ? <ColorEdit colorToUpdate={colorToUpdate} editOff={editOff} token={props.token} fetchColors={fetchColors} /> : <></>}
            </Row>
        </Container>

    )
}

export default ColorsIndex;