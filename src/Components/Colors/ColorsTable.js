import React, { useState } from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from "react-icons/fi"
import { toast } from 'react-toastify';
import './ColorCard.css'
import APIURL from '../../Helpers/enviroment';
import 'react-toastify/dist/ReactToastify.css';
import {
    Col, Card, CardBody,
    CardTitle, CardText
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

toast.configure();
const ColorCard = (props) => {
    const [copied, setCopied] = useState(false);

    return (
        <Card>
            <CardBody>
                <div class="color-area" style={{ backgroundColor: props.hex }}>

                    <div class="delete">
                        <MdDelete size={40}
                            onClick={() => {
                                props.deleteColor(props.color)
                            }}
                        />
                    </div>

                    <div class="edit">
                        <MdModeEdit size={40}
                            onClick={() => {
                                props.editUpdateColor(props.color);
                                props.editOn()
                            }}
                        />
                    </div>

                </div>
                <CardBody class="card-cont">
                    <CardTitle class="color-name">{props.name}</CardTitle>
                    <CardText class="color-hex">{props.hex}
                        <div class="copy">
                            <CopyToClipboard text={props.hex} onCopy={() => {
                                setCopied(true)
                                toast.success(`✨ Copied ${props.hex} to clipboard`, {
                                    color: "red",
                                    position: "bottom-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }}>
                                <FiCopy />
                            </CopyToClipboard>
                        </div>
                    </CardText>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default ColorsTable;