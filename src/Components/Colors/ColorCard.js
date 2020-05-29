import React from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  Card, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import './ColorCard.css'

const ColorCard = (props) => {
  const hex = props.hex

  return (
      <Card>
        <CardBody>
          <div class="color-area" style={{backgroundColor: hex}}>
          <MdDelete size={40} style={{float: "right", opacity: "70%", filter: " brightness(0) invert(1)"}}/>
          <MdModeEdit size={40} style={{ float: "right", opacity: "70%", filter: " brightness(0) invert(1)"}}/>

          </div>
          <CardBody class="card-cont">
            <CardTitle class="color-name">{props.name}</CardTitle>
            <CardText class="color-hex">{props.hex}</CardText>
          </CardBody>
        </CardBody>
      </Card>
  );
};

export default ColorCard;