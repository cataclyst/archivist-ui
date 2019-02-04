import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Label, Segment } from 'semantic-ui-react'

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

class NewEntry extends Component {

  constructor() {
    super();
    this.onTagInputKeyPress = this.onTagInputKeyPress.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
  }

  render() {

    const tagList = this.props.tags.map((oneTag) => (
      <Label key={oneTag.label} color='yellow' size='small' tag >{oneTag.label}
        <Icon name='delete' onClick={() => this.onRemoveTag(oneTag.label)}/></Label>
    ));

    return (
      <Modal
        open={this.props.isEntryFormVisible}
        onClose={this.handleClose}
        centered={false}>

        <Header icon='add circle' content='Add a new document' />
        <Modal.Content>
          <Form>
            <Form.Input label='Title' />
            <Form.TextArea label='Comments' />
            <Form.Input label='Tags' icon='tags'
              iconPosition='left'
              action='Add tag'
              onKeyPress={this.onTagInputKeyPress} />
            <Segment>
              {tagList}
            </Segment>
            <Form.Input label='Date' />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.cancel} >
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={this.props.confirm} >
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
      )
  }

  onAddTag(tagLabel) {
    this.props.addTag({ "label": tagLabel });
  }

  onRemoveTag(tagLabel) {
    this.props.removeTag({ "label": tagLabel });
  }

  onTagInputKeyPress(event) {
    const currentInputValue = event.currentTarget.value.trim();
    if (event.key == "Enter" && currentInputValue !== "") {
      this.onAddTag(currentInputValue);
      event.currentTarget.value = "";
    }
  }
}

const mapStateToProps = state => {
  return {
    isEntryFormVisible: state.isEntryFormVisible,
    tags: state.selectedTagsOnForm,
  };
};

const mapDispatchToProps = {
  confirm: actions.confirmNewEntry,
  cancel: actions.cancelEditOrNewEntry,
  addTag: actions.addTagOnEditOrNewEntry,
  removeTag: actions.removeTagOnEditOrNewEntry,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEntry);