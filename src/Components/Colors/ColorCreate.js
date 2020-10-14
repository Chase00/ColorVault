import React, { useState } from 'react'
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

const ColorCreate = ({fetchColors, createOff, token}) => {
  const [name, setName] = useState('');
  const [hex, setHex] = useState('#E4E4E4');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/api/color/`, {
      method: 'POST',
      body: JSON.stringify({

        color: {
          name: name,
          hex: hex
        }
      }),

      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }).then((res) => res.json())
      .then(() => {
        createOff();
        fetchColors();
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

  return (
    <Modal isOpen={true} toggle={createOff} style={{ width: '25%' }}>
      <ModalHeader toggle={createOff}>Create a Color</ModalHeader>
      <ModalBody class="form-contents">
        <Form onSubmit={handleSubmit}>

          <Label htmlFor="name">Name</Label>
          <InputGroup>
            <Input
              name="name"
              placeholder="Color Name"
              value={name}

              minLength={2}
              maxLength={25}
              onChange={(e) => setName(e.target.value)} />
          </InputGroup>

          <Label htmlFor="hex">Hex Code</Label>
          <InputGroup>
            <InputGroupAddon addonType="prepend">

              <div style={styles.swatch} onClick={handleClick}><MdColorLens size={32} /></div>
              <div style={styles} />

              {displayColorPicker ? <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose} />
                <ChromePicker color={hex} onChange={updatedColor => setHex(updatedColor.hex)} />
              </div> : null}

            </InputGroupAddon>
            <Input
              name="hex"
              disabled
              value={hex}

              maxLength={7}
              onChange={(e) => setHex(e.target.value)} />
          </InputGroup>
          <div class="actions">
            <button class="button-main" type="submit">Add Color</button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ColorCreate;