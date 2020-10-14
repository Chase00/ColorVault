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

const ColorDelete = ({colorToUpdate, fetchColors, deleteOff, token}) => {

    const deleteColor = (color) => {
        fetch(`${APIURL}/api/color/${color.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
            .then(() => fetchColors())
    }


    return (
        <Modal isOpen={true} toggle={deleteOff} style={{ width: '25%' }}>
            <ModalHeader toggle={deleteOff}>Delete Color</ModalHeader>
            <ModalBody class="form-contents">
                <h5 style={{ textAlign: "center", padding: '20px 0 5px 0', color: "rgb(160, 160, 160)" }}>Are you sure you want to delete this color?</h5>
                <hr />
                <Row style={{ textAlign: "center" }}>
                    <Col md="6">
                        <h6>{colorToUpdate.name}</h6>
                        <h6>{colorToUpdate.hex}</h6>
                    </Col>
                    <Col md="6">
                        <div class="color-box" style={{ backgroundColor: `${colorToUpdate.hex}` }}></div>
                    </Col>
                </Row>
                <hr />
                <div class="actions">
                    <button class="button-delete"
                        onClick={() => {
                            deleteColor(colorToUpdate)
                            deleteOff();
                            fetchColors();
                        }}>
                        Delete</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ColorDelete;