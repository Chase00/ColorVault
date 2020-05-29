import React from 'react';
import {Table, Button, Col} from 'reactstrap';
import ColorCard from '../Colors/ColorCard'

const ColorsTable = (props) => {

    const colorsMapper = () => {
        return props.colors.map((color, index) => {
            return(
                <Col sm="3">
                    <ColorCard id={color.id} name={color.name} hex={color.hex}/>
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