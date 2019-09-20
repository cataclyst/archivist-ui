import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Label, Segment } from 'semantic-ui-react'

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";
import moment from "moment";

class NewEntry extends Component {

  constructor(props) {
    super(props);
    this.onTagInputKeyPress = this.onTagInputKeyPress.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onClickOk = this.onClickOk.bind(this);

    const today = moment();

    this.state = {
      documentIdBeingEdited: props.match.params.id,
      date: today.toDate(),
      dateDisplayValue: today.format("DD.MM.YYYY"),
      title: "",
      description: "",
      tags: [],
    };
  }

  render( params ) {

    const tagList = this.state.tags.map((oneTag) => (
      <Label key={oneTag.label} color='grey' size='small' tag >{oneTag.label}
        <Icon name='delete' onClick={() => this.onRemoveTag(oneTag.label)}/></Label>
    ));

    let header = <Header icon='add circle' content='Add a new document' />;
    if (this.props.match.params.id) {
      header = <Header icon='pen square' content={this.props.match.params.id} />
    }

    return (
      <Modal
        open={true}
        onClose={this.handleClose}
        centered={false}>
        {header}
        <Modal.Content>
          <Form>
            <Form.Input label='Title' value={this.state.title} onChange={this.onChangeTitle} />
            <Form.TextArea label='Description' value={this.state.description} onChange={this.onChangeDescription} />
            <Form.Input label='Tags' icon='tags'
              iconPosition='left'
              action='Add tag'
              onKeyPress={this.onTagInputKeyPress} />
            <Segment>
              {tagList}
            </Segment>
            <Form.Input label='Date' value={this.state.dateDisplayValue} onChange={this.onChangeDate} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.history.goBack} >
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' onClick={this.onClickOk} >
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
      );
  }

  onChangeTitle(event) {
    const newValue = event.target.value;
    this.setState({
      ...this.state,
      title: newValue,
    });
  }

  onChangeDescription(event) {
    const newValue = event.target.value;
    this.setState({
      ...this.state,
      description: newValue,
    });
  }

  onChangeDate(event) {
    const dateDisplayValue = event.target.value;
    const parsedDate = moment.utc(event.target.value, 'DD.MM.YYYY', true);
    let newValue;
    if (parsedDate.isValid()) {
      newValue = parsedDate.toDate();
    } else {
      newValue = undefined;
    }
    this.setState({
      ...this.state,
      date: newValue,
      dateDisplayValue: dateDisplayValue,
    });
  }

  onAddTag(tagLabel) {
    if (!this.state.tags.map(x => x.label).includes(tagLabel)) {
      const newTags = this.state.tags.slice();
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

  onClickOk() {

    const date = moment(this.state.date).format("YYYY-MM-DD");

    // Convert array to a format that GraphQL understands:
    const tags = this.state.tags.map(t => `{ title: "${t.label}", context: "" }`).join(", ");

    const mutationQuery = `
      mutation {
        createDocument(
          input: {
            title: "${this.state.title}"
            description: "${this.state.description}"
            date: "${date}"
            tags: [${tags}]
          })
        {
          id
        }
      }
    `;

    fetch('http://localhost:9090/query', {
      method: "POST",
      body: JSON.stringify({query: mutationQuery}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log("Success! " + data);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  confirm: actions.confirmEntryForm,
  cancel: actions.cancelEntryForm,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEntry));