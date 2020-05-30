import React, {useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input} from 'reactstrap';
import './ColorModify.css'

const ColorCreate = (props) => {
    const [name, setName] = useState('');
    const [hex, setHex] = useState('');

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

    return(
        <Modal isOpen={true}>
            <ModalHeader>Create a Color</ModalHeader>
            <ModalBody>
            <Form onSubmit={handleSubmit}> 
                <FormGroup>
                    <Label htmlFor="name"/>
                    <Input 
                        name="name"
                        placeholder="Color Name"
                        required
                        value={name}
                        minLength={1}
                        onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="hex"/>
                    <Input 
                        name="hex"
                        placeholder="#428942"
                        required
                        value={hex}

                        maxLength={7}
                        onChange={(e) => setHex(e.target.value)}/>
                </FormGroup>
                <Button type="submit">Add Color</Button>
            </Form>
            </ModalBody>
        </Modal>
    )
}

export default ColorCreate;