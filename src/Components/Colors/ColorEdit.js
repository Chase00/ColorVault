import React, {useState} from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Form, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import './ColorModify.css'
import { MdColorLens } from 'react-icons/md';
import { ChromePicker } from 'react-color';

const WorkoutEdit = (props) => {

    const [editName, setEditName] = useState(props.colorToUpdate.name);
    const [editHex, setEditHex] = useState(props.colorToUpdate.hex);

    const colorUpdate = (event, color) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/color/${props.colorToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
            
            color: {
                name: editName,
                hex: editHex
            }}),
            
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }) .then((res) => {
            props.fetchColors();
            props.editOff();
        })
    }

    let [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
      };
    
      const handleClose = () => {
        setDisplayColorPicker(false);
      };

    const styles = ({
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: editHex,
        },
        swatch: {
          padding: '5px 5px 0px 5px',
          background: editHex,
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
      <Modal isOpen={true} toggle={props.editOff}>
          <ModalHeader toggle={props.editOff}>Edit Color</ModalHeader>
          <ModalBody>
          <Form onSubmit={colorUpdate}> 
              <FormGroup>
                  <Label htmlFor="name"/>
                  <Input 
                      name="name"
                      placeholder="Color Name"
                      value={editName}
                      minLength={1}
                      onChange={(e) => setEditName(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="hex"/>
                  <InputGroup>

                  <InputGroupAddon addonType="prepend">

                  <div style={ styles.swatch } onClick={handleClick}><MdColorLens size={32}/></div>
                  <div style={ styles } />

                  { displayColorPicker ? <div style={ styles.popover }>
                  <div style={ styles.cover } onClick={ handleClose }/>
                  <ChromePicker color={editHex} onChange={updatedColor => setEditHex(updatedColor.hex)}/>
                  </div> : null }

                  </InputGroupAddon>
                  <Input
                      name="hex"
                      disabled
                      value={editHex}

                      maxLength={7}
                      onChange={(e) => setEditHex(e.target.value)} />
                  </InputGroup>
              </FormGroup>
              <Button type="submit">Update Color</Button>
          </Form>
          </ModalBody>
      </Modal>
  )
}

export default WorkoutEdit;