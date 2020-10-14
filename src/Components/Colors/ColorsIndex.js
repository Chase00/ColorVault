import React, { useState, useEffect } from 'react';
import ColorsTable from './ColorsTable';
import ColorCreate from './ColorCreate';
import ColorEdit from './ColorEdit';
import ColorDelete from './ColorDelete';
import NoColors from './NoColors';
import APIURL from '../../Helpers/enviroment';
import './ColorModify.css'
import {
    Row,
    Container
} from 'reactstrap';

const ColorsIndex = ({token}) => {
    const [colors, setColors] = useState([]);
    const [createActive, setCreateActive] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
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
                'Authorization': token
            })
        }).then((res) => res.json())
            .then((colorData) => {
                setColors(colorData)
                activeColors(colorData)
            })
    }

    const activeColors = (data) => {
        (data.length === 0) ? setIsEmpty(true) : setIsEmpty(false);
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

    const deleteOn = () => {
        setDeleteActive(true);
    }

    const deleteOff = () => {
        setDeleteActive(false);
    }

    return (

        <Container>
            <div class="actions">
                <button class="button-main" onClick={createOn}>Create Color</button>
                {isEmpty ? <NoColors /> : <></>}
            </div>
            <Row>
                <ColorsTable colors={colors} editUpdateColor={editUpdateColor} editOn={editOn} deleteOn={deleteOn} fetchColors={fetchColors}/>

                {createActive ? <ColorCreate fetchColors={fetchColors} createOff={createOff} token={token} /> : <></>}

                {editActive ? <ColorEdit colorToUpdate={colorToUpdate} editOff={editOff} token={token} fetchColors={fetchColors} /> : <></>}

                {deleteActive ? <ColorDelete colorToUpdate={colorToUpdate} fetchColors={fetchColors} deleteOff={deleteOff} token={token} /> : <></>}
            </Row>
        </Container>

    )
}

export default ColorsIndex;