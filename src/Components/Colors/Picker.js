import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const Picker = (props) => {
    const [color, setColor] = useState('#fff');

    return (
        <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor.hex)}/>
    )
}

export default Picker;