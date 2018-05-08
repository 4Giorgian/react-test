import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

export default class ModalExampleControlled extends Component {
  state = { modalOpen: false }

  render() {
    return (
      <Modal
        open={this.props.modalOpenProp}
        onClose={this.props.modalCloseProp}
        basic
        size='small'
      >
        <Modal.Content style={{marginTop: "300px"}}>
          <h3>{this.props.content} </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.modalCloseProp} inverted>
            <Icon name='checkmark' /> Cancelar
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
