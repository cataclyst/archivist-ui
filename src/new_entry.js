import React, { useEffect, useState } from 'react';
import { Button, Header, Icon, Modal, Form, Label, Segment } from 'semantic-ui-react';

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "./store/actions/actions";
import moment from "moment";

function NewEntry(props) {

  // this.onTagInputKeyPress = this.onTagInputKeyPress.bind(this);
  // this.onAddTag = this.onAddTag.bind(this);
  // this.onRemoveTag = this.onRemoveTag.bind(this);
  // this.onChangeTitle = this.onChangeTitle.bind(this);
  // this.onChangeDescription = this.onChangeDescription.bind(this);
  // this.onChangeDate = this.onChangeDate.bind(this);
  // this.onChangeFile = this.onChangeFile.bind(this);
  // this.onClickOk = this.onClickOk.bind(this);

  const today = moment();

  const [documentIdBeingEdited, setDocumentBeingEdited] = useState(undefined);
  const [date, setDate] = useState(today.toDate());
  const [dateDisplayValue, setDateDisplayValue] = useState(today.format('DD.MM.YYYY'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [documentData, setDocumentData] = useState(undefined);

  useEffect(() => {
    const query = `query {
          document() {
            id
            title
            description
            date
            tags {
              title
              context
            }
          }
        }
      `;

    fetch('http://localhost:9090/query', {
      method: "POST",
      body: JSON.stringify({query: query}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
        .then(res => res.json())
        .then((data) => {
          // TODO actually handle "data"
        })
        .catch(function(e) {
          console.error(e);
          // TODO handle "isLoading"
          // setIsLoading(false);
        })
  }, []);

  const tagList = tags.map((oneTag) => (
    <Label key={oneTag.label} color='grey' size='small' tag >{oneTag.label}
      <Icon name='delete' onClick={() => onRemoveTag(oneTag.label, tags, setTags)}/>
    </Label>
  ));

  let header = <Header icon='add circle' content='Add a new document' />;
  if (props.match.params.id) {
    header = <Header icon='pen square' content={props.match.params.id} />
  }

  return (
    <Modal
      open={true}
      centered={false}>
      {header}
      <Modal.Content>
        <Form>
          <Form.Input label='Title' value={title} onChange={(e) => onChangeTitle(e, setTitle)} />
          <Form.TextArea label='Description' value={description} onChange={(e) => onChangeDescription(e, setDescription)} />
          <Form.Input label='Tags' icon='tags'
            iconPosition='left'
            action='Add tag'
            onKeyPress={(e) => onTagInputKeyPress(e, tags, setTags)} />
          <Segment>
            {tagList}
          </Segment>
          <Form.Input label='Date' value={dateDisplayValue} onChange={(e) => onChangeDate(e, setDate, setDateDisplayValue)} />
          <Form.Input type='file' label='Select a file' onChange={(e) => onChangeFile(e, setDocumentData)}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={props.history.goBack} >
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' onClick={(e) => onClickOk(title, date, description, tags, documentData, props.history)} >
          <Icon name='checkmark' /> OK
        </Button>
      </Modal.Actions>
    </Modal>
    );
}

function onChangeTitle(event, setTitle) {
  const newValue = event.target.value;
  setTitle(newValue);
}

function onChangeDescription(event, setDescription) {
  const newValue = event.target.value;
  setDescription(newValue);
}

function onChangeDate(event, setDate, setDateDisplayValue) {
  const dateDisplayValue = event.target.value;
  const parsedDate = moment.utc(event.target.value, 'DD.MM.YYYY', true);
  let newValue;
  if (parsedDate.isValid()) {
    newValue = parsedDate.toDate();
  } else {
    newValue = undefined;
  }
  setDate(newValue);
  setDateDisplayValue(dateDisplayValue);
}

function onAddTag(tagLabel, tags, setTags) {
  if (!tags.map(x => x.label).includes(tagLabel)) {
    const newTags = tags.slice();
    newTags.push({ "label": tagLabel });
    setTags(newTags);
  }
}

function onRemoveTag(tagLabel, tags, setTags) {
  setTags({ tags: tags.filter(x => x.label !== tagLabel) });
}

function onTagInputKeyPress(event, tags, setTags) {
  const currentInputValue = event.currentTarget.value.trim();
  if (event.key === "Enter" && currentInputValue !== "") {
    onAddTag(currentInputValue, tags, setTags);
    event.currentTarget.value = "";
  }
}

function onChangeFile(event, documentData, setDocumentData) {
  const reader = new FileReader();
  reader.onload = (file => {
    return function(e) {
      const arrayBuffer = e.target.result;
      const fileAsBase64 = arrayBufferToBase64(arrayBuffer);

      const newDocumentData = documentData || {};
      newDocumentData.binaryDataBase64 = fileAsBase64;
      newDocumentData.fileName = file.name;
      newDocumentData.mimeType = file.type;
      setDocumentData(newDocumentData);
    }
  })(event.target.files[0]).bind(this);

  reader.readAsArrayBuffer(event.target.files[0]);
}

function onClickOk(title, date, description, tags, documentData, history) {
  const dateFormatted = moment(date).format("YYYY-MM-DD");

  // Convert array to a format that GraphQL understands:
  const tagsFormatted = tags.map(t => `{ title: "${t.label}", context: "" }`).join(", ");

  const mutationQuery = `
    mutation {
      createDocument(
        input: {
          title: "${title}"
          description: "${description}"
          date: "${dateFormatted}"
          tags: [${tagsFormatted}]
          documentData: {
            binaryDataBase64: "${documentData ? documentData.binaryDataBase64 : ''}"
            fileName: "${documentData ? documentData.fileName : ''}"
            mimeType: "${documentData ? documentData.mimeType : ''}"
          }
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
      if (data.errors) {
        console.error("Error! " + JSON.stringify(data));
        // TODO show some error toast
        return;
      }
      console.log("Success! " + JSON.stringify(data));
      history.push('/');
    })
    .catch(function(e) {
      // TODO show some error toast
      console.error(e);
      history.goBack();
    });
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array( buffer );
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
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