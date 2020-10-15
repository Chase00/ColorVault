import React, { useState } from 'react';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from "react-icons/fi"
import { toast } from 'react-toastify';
import {
    Card, CardBody,
    CardTitle, CardText
} from 'reactstrap';

toast.configure();
const ColorCard = ({ color, name, hex, editUpdateColor, editOn, deleteOn }) => {
    const [copied, setCopied] = useState(false);

    return (
        <Card>
            <CardBody>
                <div class="color-area" style={{ backgroundColor: hex }}>

                    <div class="delete">
                        <MdDelete size={30}
                            onClick={() => {
                                editUpdateColor(color)
                                deleteOn();
                            }}
                        />
                    </div>

                    <div class="edit">
                        <MdModeEdit size={30}
                            onClick={() => {
                                editUpdateColor(color);
                                editOn()
                            }}
                        />
                    </div>

                </div>
                <CardBody class="card-cont">
                    <CardTitle class="color-name">{name}</CardTitle>
                    <CopyToClipboard text={hex} onCopy={() => {
                        setCopied(true)
                        toast.success(`✨ Copied ${hex} to clipboard`, {
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
                        <div class="copy-area">
                            <CardText class="color-hex">{hex}
                                <div class="copy">
                                    <FiCopy />
                                </div>
                            </CardText>
                        </div>
                    </CopyToClipboard>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default ColorCard;