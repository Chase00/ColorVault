import React, { useState } from 'react';
import { MdColorLens } from 'react-icons/md';
import { ChromePicker } from 'react-color';
import APIURL from '../../Helpers/enviroment';
import './ColorModify.css'
import '../../App.css';
import { 
  Modal, 
  ModalHeader, 
  ModalBody,  
  Label, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon 
} from 'reactstrap';

const WorkoutEdit = ({colorToUpdate, editOff, token, fetchColors}) => {

  const [editName, setEditName] = useState(colorToUpdate.name);
  const [editHex, setEditHex] = useState(colorToUpdate.hex);

  const colorUpdate = (event, color) => {
    event.preventDefault();
    fetch(`${APIURL}/api/color/${colorToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({

        color: {
          name: editName,
          hex: editHex
        }
      }),

      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }).then((res) => {
      fetchColors();
      editOff();
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

  return (
    <Modal isOpen={true} toggle={editOff} style={{ width: '25%' }}>
      <ModalHeader toggle={editOff}>Edit Color</ModalHeader>
      <ModalBody>
        <Form onSubmit={colorUpdate}>

          <Label htmlFor="name">Name</Label>
          <InputGroup>
            <Input
              name="name"
              placeholder="Color Name"
              value={editName}

              minLength={2}
              maxLength={25}
              onChange={(e) => setEditName(e.target.value)} />
          </InputGroup>

          <Label htmlFor="hex">Hex Code</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">

              <div style={styles.swatch} onClick={handleClick}><MdColorLens size={32} /></div>
              <div style={styles} />

              {displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose} />
                <ChromePicker color={editHex} onChange={updatedColor => setEditHex(updatedColor.hex)} />
              </div> : null}

            </InputGroupAddon>
            <Input
              name="hex"
              disabled
              value={editHex}

              maxLength={7}
              onChange={(e) => setEditHex(e.target.value)} />
          </InputGroup>
          <div class="actions">
            <button class="button-main" type="submit">Edit Color</button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default WorkoutEdit;