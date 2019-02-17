import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Label, Segment } from 'semantic-ui-react'

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

class NewEntry extends Component {

  constructor(props) {
    super(props);
    this.onTagInputKeyPress = this.onTagInputKeyPress.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);

    this.state = {
      date: new Date(),
      title: "pfkf",
      comment: "comm",
      tags: [],
    };
  }

  render() {

    const tagList = this.state.tags.map((oneTag) => (
      <Label key={oneTag.label} color='grey' size='small' tag >{oneTag.label}
        <Icon name='delete' onClick={() => this.onRemoveTag(oneTag.label)}/></Label>
    ));

    var dateFormattingOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    return (
      <Modal
        open={this.props.isEntryFormVisible}
        onClose={this.handleClose}
        centered={false}>

        <Header icon='add circle' content='Add a new document' />
        <Modal.Content>
          <Form>
            <Form.Input label='Title' value={this.state.title} onChange={this.onChangeTitle} />
            <Form.TextArea label='Comments' value={this.state.comment} onChange={this.onChangeComment} />
            <Form.Input label='Tags' icon='tags'
              iconPosition='left'
              action='Add tag'
              onKeyPress={this.onTagInputKeyPress} />
            <Segment>
              {tagList}
            </Segment>
            <Form.Input label='Date' value={this.state.date.toLocaleDateString('de', dateFormattingOptions)} />
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

  onChangeTitle(event) {
    var newValue = event.target.value;
    this.setState({
      ...this.state,
      title: newValue,
    });
  }

  onChangeComment(event) {
    var newValue = event.target.value;
    this.setState({
      ...this.state,
      comment: newValue,
    });
  }

  onChangeDate(event) {
    // TODO 
  }

  onAddTag(tagLabel) {

    if (!this.state.tags.map(x => x.label).includes(tagLabel)) {
      var newTags = this.state.tags.slice();
      newTags.push({ "label": tagLabel });
      this.setState({ 
        ...this.state,
         tags: newTags,
      });
    }
  }

  onRemoveTag(tagLabel) {
    this.setState({ tags: this.state.tags.filter(x => x.label !== tagLabel) });
  }

  onTagInputKeyPress(event) {
    const currentInputValue = event.currentTarget.value.trim();
    if (event.key === "Enter" && currentInputValue !== "") {
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