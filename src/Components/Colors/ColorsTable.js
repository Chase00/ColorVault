import React from 'react';
import ColorCard from './ColorCard';
import './ColorCard.css'
import APIURL from '../../Helpers/enviroment';
import 'react-toastify/dist/ReactToastify.css';
import {
    Col
} from 'reactstrap';

const ColorsTable = (props) => {

    const deleteColor = (color) => {
        fetch(`${APIURL}/api/color/${color.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchColors())
    }

    const colorsMapper = () => {
        return props.colors.map((color, index) => {
            return (
                <Col sm="3" key={index}>
                    <ColorCard color={color} id={color.id} name={color.name} hex={color.hex} editUpdateColor={props.editUpdateColor} fetchColors={props.fetchColors} deleteColor={deleteColor} editOn={props.editOn} />
                </Col>
            )
        })
    }
    
    return (
        <>
            {colorsMapper()}
        </>
    )
}

export default ColorsTable;