import React from 'react';
import ColorCard from './ColorCard';
import './ColorCard.css'
import APIURL from '../../Helpers/enviroment';
import 'react-toastify/dist/ReactToastify.css';
import {
    Col
} from 'reactstrap';

const ColorsTable = (props) => {

    const colorsMapper = () => {
        return props.colors.map((color, index) => {
            return (
                <Col sm="3" key={index}>
                    <ColorCard color={color} id={color.id} name={color.name} hex={color.hex} editUpdateColor={props.editUpdateColor} fetchColors={props.fetchColors} editOn={props.editOn} deleteOn={props.deleteOn} />
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