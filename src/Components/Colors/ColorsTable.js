import React from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
    Col, Button, Table, Card, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import './ColorCard.css'

const ColorsTable = (props) => {

    const colorsMapper = () => {
        return props.colors.map((color, index) => {
            return(
                <Col sm="3" key={index}>
                    <ColorCard color={color} id={color.id} name={color.name} hex={color.hex} editUpdateColor={props.editUpdateColor} editOn={props.editOn}/>
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

const ColorCard = (props) => {
    const hex = props.hex
  
    return (
        <Card>
          <CardBody>
            <div class="color-area" style={{backgroundColor: hex}}>
                <div class="icons">
                <MdModeEdit size={40} 
                    onClick={() => 
                    {props.editUpdateColor(props.color);
                    props.editOn()}}
                />
                <MdDelete size={40} />
  
                </div>
            </div>
            <CardBody class="card-cont">
              <CardTitle class="color-name">{props.name}</CardTitle>
              <CardText class="color-hex">{props.hex}</CardText>
            </CardBody>
          </CardBody>
        </Card>
    );
  };

export default ColorsTable;