import React, {useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import './ColorModify.css'
import Picker from './Picker';

const ColorCreate = (props) => {
    const [name, setName] = useState('');
    const [hex, setHex] = useState('#fff');

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
            props.updateOff();
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
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
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
        <Modal isOpen={true} toggle={props.updateOff}>
            <ModalHeader toggle={props.updateOff}>Create a Color</ModalHeader>
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

                    <div style={ styles.swatch } onClick={handleClick}></div>
                    <div style={ styles } />

                    { displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ handleClose }/>
                    <Picker color={hex} onChange={handleChange} />
                    </div> : null }
                        
                    {/* <Button onClick={pickerOn}>Color</Button>
                    {pickerActive ? <Picker pickerOff={pickerOff} /> : <></>} */}

                    </InputGroupAddon>
                    <Input
                        name="hex"
                        placeholder="#428942"
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