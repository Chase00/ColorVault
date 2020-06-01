import React, {useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import './ColorModify.css'
import { MdColorLens } from 'react-icons/md';
import { ChromePicker } from 'react-color';

const ColorCreate = (props) => {
    const [name, setName] = useState('');
    const [hex, setHex] = useState('#E4E4E4');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/color/', {
            method: 'POST',
            body: JSON.stringify({
                
            color: {
                name: name,
                hex: hex
            }}),

            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then(() => {
            props.createOff();
            props.fetchColors();
            setName('');
            setHex('');
        })
    }

    let [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
      };
    
      const handleClose = () => {
        setDisplayColorPicker(false);
      };
    
      const handleChange = (color) => {
        setHex({ color: hex })
      };

    const styles = ({
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: hex,
          },
          swatch: {
            padding: '5px 5px 0px 5px',
            background: hex,
            borderRadius: '1px',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        });

    return(
        <Modal isOpen={true} toggle={props.createOff}>
            <ModalHeader toggle={props.createOff}>Create a Color</ModalHeader>
            <ModalBody>
            <Form onSubmit={handleSubmit}> 
                <FormGroup>
                    <Label htmlFor="name"/>
                    <Input 
                        name="name"
                        placeholder="Color Name"
                        value={name}
                        minLength={1}
                        onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="hex"/>
                    <InputGroup>

                    <InputGroupAddon addonType="prepend">

                    <div style={ styles.swatch } onClick={handleClick}><MdColorLens size={32}/></div>
                    <div style={ styles } />

                    { displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ handleClose }/>
                    <ChromePicker color={hex} onChange={updatedColor => setHex(updatedColor.hex)}/>
                    </div> : null }

                    </InputGroupAddon>
                    <Input
                        name="hex"
                        disabled
                        value={hex}

                        maxLength={7}
                        onChange={(e) => setHex(e.target.value)} />
                    </InputGroup>
                </FormGroup>
                <Button type="submit">Add Color</Button>
            </Form>
            </ModalBody>
        </Modal>
    )
}

export default ColorCreate;