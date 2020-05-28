import React from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  Card, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import './ColorCard.css'

const ColorCard = () => {
  return (
      <Card>
        <CardBody>
          <div class="color-area">
          <MdDelete size={40} style={{float: "right", opacity: "50%", filter: " brightness(0) invert(1)"}}/>
          <MdModeEdit size={40} style={{ float: "right", opacity: "50%", filter: " brightness(0) invert(1)"}}/>

          </div>
          <CardBody class="card-cont">
            <CardTitle class="color-name">Sea Blue</CardTitle>
            <CardText class="color-hex">#99f8ff</CardText>
          </CardBody>
        </CardBody>
      </Card>
  );
};

export default ColorCard;