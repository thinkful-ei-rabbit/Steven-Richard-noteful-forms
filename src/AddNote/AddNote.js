import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import './AddNote.css';

export default class AddNote extends React.Component {
  static contextType = ApiContext;
  state = {
    validate: {
      noteName: '',
      content: '',
      touched: {
        noteName: false,
        select: false,
        content: false
      }
    },
    folderInput: ''
  };

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
  }

  handleChange = e => {
    const state = this.state.validate.touched;
    this.setState({
      validate: {
        noteName: this.state.validate.noteName,
        content: this.state.validate.content,
        touched: {
          noteName: state.noteName,
          select: true,
          content: state.content
        }
      },
      folderInput: e.target.value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    const id = this.state.folderInput;
    const content = this.contentInput.current.value;
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        folderId: id,
        content: content
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.message);
        }
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.goBack();
        return note;
      })
      .catch(error => {
        console.error({ error });
      });
  }

  validateSelect = () => {
    if (this.state.folderInput === '' || this.state.folderInput === 'none') {
      return 'Please select a folder.';
    }
  };

  validateName = () => {
    const name = this.state.validate.noteName;
    if (!name) {
      return 'A name for your note is required.';
    }
  };

  validateContent = () => {
    const content = this.state.validate.content;
    if (!content) {
      return 'Content for your note is required.';
    }
  };

  handleName = e => {
    const state = this.state.validate.touched;
    this.setState({
      validate: {
        noteName: e.target.value,
        content: this.state.validate.content,
        touched: {
          noteName: true,
          select: state.select,
          content: state.content
        }
      }
    });
  };

  handleContent = e => {
    const state = this.state.validate.touched;
    this.setState({
      validate: {
        noteName: this.state.validate.noteName,
        content: e.target.value,
        touched: {
          noteName: state.noteName,
          select: state.select,
          content: true
        }
      }
    });
  };

  render() {
    const { folders = [] } = this.context;
    const options = folders.map((folder, idx) => {
      return (
        <option
          ref={this.folderInput}
          value={folder.id}
          id={folder.id}
          key={idx}
        >
          {folder.name}
        </option>
      );
    });

    return (
      <form className="AddNote" onSubmit={event => this.handleSubmit(event)}>
        <div className="row">
          <div className="left">
            <label htmlFor="name">
              <h4>Note Name</h4>
              <input
                type="text"
                name="name"
                className="AddNoteInput"
                ref={this.nameInput}
                onChange={e => this.handleName(e)}
              />
            </label>
            <h3>
              {this.state.validate.touched.noteName && this.validateName()}
            </h3>
            <br />
            <br />
            <label htmlFor="message">
              <h4>Note Content</h4>
              <textarea
                type="textarea"
                name="message"
                className="AddNoteContent"
                ref={this.contentInput}
                onChange={e => this.handleContent(e)}
              />
            </label>
            <h3>
              {this.state.validate.touched.content && this.validateContent()}
            </h3>
          </div>

          <div className="right">
            <select
              name="folder"
              id="folders"
              aria-label="Folder Selections"
              className="FolderSelection"
              onChange={e => this.handleChange(e)}
            >
              <option value={'none'}>Select Folder</option>
              {options}
            </select>
            <h3 className="bug">
              {this.state.validate.touched.select && this.validateSelect()}
            </h3>
            <br />
            <br />
            <button
              type="submit"
              className="submitButton"
              disabled={
                this.validateName() ||
                this.validateContent() ||
                this.validateSelect()
              }
            >
              Submit
            </button>
          </div>
        </div>
        <br />
        <br />
      </form>
    );
  }
}
