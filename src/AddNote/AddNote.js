import React from "react";
import config from "../config";
import ApiContext from "../ApiContext";

export default class AddNote extends React.Component {
  static contextType = ApiContext;
  state = {
    folderInput: "",
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
    console.log(this.contentInput);
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
              Promise.reject(res.message)
          }
        
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.goBack();
        return note
      })
      .catch((error) => {
        console.log(error)
      })
      
  }

  validateName() {
    const name = this.nameInput.value.trim();
    if (name.length === 0) {
      return "Name is required";
    };
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
          />
        </label>
        <select
          name="folder"
          id="folders"
          aria-label="Folder Selections"
          onChange={(e) => this.handleChange(e)}
        >
          <option value={"null"}>Select Folder</option>
          {options}
        </select>
        <label htmlFor="content">
          <input
            type="textarea"
            name="content"
            className="AddNoteContent"
            ref={this.contentInput}
          />
        </label>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    );
  }
}
