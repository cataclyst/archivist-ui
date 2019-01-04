import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { connect } from "react-redux";

class NewEntry extends Component {

  render() {
    return (
      <Modal
        open={this.props.isEntryFormVisible}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='browser' content='Cookies policy' />
        <Modal.Content>
          <h3>This website uses cookies to ensure the best user experience.</h3>
        </Modal.Content>
        <Modal.Actions>
        <Button color='green' onClick={this.handleClose} inverted>
          <Icon name='checkmark' /> Got it
        </Button>
        </Modal.Actions>
      </Modal>
      )
  }
}

const mapStateToProps = state => {
  return {
    isEntryFormVisible: state.isEntryFormVisible
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEntry);