import React from "react";
import config from "../config";
import ApiContext from "../ApiContext";

export default class AddNote extends React.Component {
  static contextType = ApiContext;
  state = {
    validate: {
      noteName: '',
      content: '',
      touch: false,
    },
    folderInput: '',
  };

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
  }

  handleChange = (e) => {
    this.setState({ folderInput: e.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    const id = this.state.folderInput;
    const content = this.contentInput.current.value;
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        folderId: id,
        content: content,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.message);
        }
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.goBack();
        return note;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  validateSelect = () => {
    if (this.state.folderInput === '' || this.state.folderInput === 'none') {
      return 'Please select a folder.'
    }
  }

  validateName = () => {
    const name = this.state.validate.noteName;
    if (!name) {
      return "A name for your note is required.";
    }
    if (name.length === 0) {
      return "A name for your note is required.";
    }
  }

  validateContent = () => {
    const content = this.state.validate.content;
    if (!content) {
      return "Content for your note is required.";
    }
    if (content.length === 0) {
      return "Content for your note is required.";
    }
  }

  handleName = (e) => {
    this.setState({
      validate: {
        noteName: e.target.value,
        content: this.state.validate.content,
        touch: true,
      },
    });
  };

  handleContent = (e) => {
    this.setState({
      validate: {
        noteName: this.state.validate.noteName,
        content: e.target.value,
        touch: true,
      },
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
      <form className="AddNote" onSubmit={(event) => this.handleSubmit(event)}>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            className="AddNoteInput"
            ref={this.nameInput}
            onChange={(e) => this.handleName(e)}
          />
        </label>
        <select
          name="folder"
          id="folders"
          aria-label="Folder Selections"
          onChange={(e) => this.handleChange(e)}
        >
          <option value={'none'}>Select Folder</option>
          {options}
        </select>
        <label htmlFor="content">
          <input
            type="textarea"
            name="content"
            className="AddNoteContent"
            ref={this.contentInput}
            onChange={(e) => this.handleContent(e)}
          />
        </label>
        <p>{this.state.validate.touch && this.validateName()}</p>
        <p>{this.state.validate.touch && this.validateContent()}</p>
        <p>{this.state.validate.touch && this.validateSelect()}</p>
        <button
          type="submit"
          className="submitButton"
          disabled={this.validateName() || this.validateContent() || this.validateSelect()}
        >
          Submit
        </button>
      </form>
    );
  }
}
