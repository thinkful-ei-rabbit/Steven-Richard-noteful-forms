import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import './AddFolder.css';

export default class AddFolder extends React.Component {
  static contextType = ApiContext;

  state = {
    folderName: '',
    touched: {
      folderName: false
    }
  };

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(res.message);
        }
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.goBack();
      })
      .catch(error => {
        console.error({ error });
      });
  }

  validateName() {
    const name = this.state.folderName.trim();
    if (!name) {
      return 'A name for your note is required.';
    }
  }

  handleChange = e => {
    this.setState({
      folderName: e.target.value,
      touched: {
        folderName: true
      }
    });
  };

  render() {
    return (
      <form className="AddFolder" onSubmit={event => this.handleSubmit(event)}>
        <label htmlFor="name">
          <h4>Folder Name</h4>
          <input
            type="text"
            name="name"
            className="AddFolderInput"
            ref={this.nameInput}
            onChange={e => this.handleChange(e)}
          />
        </label>

        <h3>{this.state.touched.folderName && this.validateName()}</h3>
        <button
          type="submit"
          className="FolderSubmitButton"
          disabled={this.validateName()}
        >
          Submit
        </button>
      </form>
    );
  }
}
