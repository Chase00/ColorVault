import React from 'react';
import APIURL from '../../Helpers/enviroment';
import './ColorModify.css'
import '../../App.css';
import {
    Modal,
    ModalHeader,
    ModalBody, Col,
    Row
} from 'reactstrap';

const ColorDelete = (props) => {

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


    return (
        <Modal isOpen={true} toggle={props.deleteOff} style={{ width: '25%' }}>
            <ModalHeader toggle={props.deleteOff}>Delete Color</ModalHeader>
            <ModalBody class="form-contents">
                <h5 style={{ textAlign: "center", padding: '20px 0 5px 0', color: "rgb(160, 160, 160)" }}>Are you sure you want to delete this color?</h5>
                <hr />
                <Row style={{ textAlign: "center" }}>
                    <Col md="6">
                        <h6>{props.colorToUpdate.name}</h6>
                        <h6>{props.colorToUpdate.hex}</h6>
                    </Col>
                    <Col md="6">
                        <div class="color-box" style={{ backgroundColor: `${props.colorToUpdate.hex}` }}></div>
                    </Col>
                </Row>
                <hr />
                <div class="actions">
                    <button class="button-delete"
                        onClick={() => {
                            deleteColor(props.colorToUpdate)
                            props.deleteOff();
                            props.fetchColors();
                        }}>
                        Delete</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ColorDelete;