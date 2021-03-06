import React from 'react';
import { IoMdColorFill } from "react-icons/io"
import './ColorModify.css';

const NoColors = () => {
    return (
        <div class="no-color-container">
            <h2 class="no-color-header">You don't seem to have any colors</h2>
            <IoMdColorFill size={100} />
        </div>
    )
}

export default NoColors;