import React from 'react';
import ColorCard from './ColorCard';
import './ColorCard.css'
import 'react-toastify/dist/ReactToastify.css';
import {
    Col
} from 'reactstrap';

const ColorsTable = ({colors, editUpdateColor, editOn, deleteOn, fetchColors}) => {

    const colorsMapper = () => {
        return colors.map((color, index) => {
            return (
                <Col sm="3" key={index}>
                    <ColorCard color={color} id={color.id} name={color.name} hex={color.hex} editUpdateColor={editUpdateColor} fetchColors={fetchColors} editOn={editOn} deleteOn={deleteOn} />
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