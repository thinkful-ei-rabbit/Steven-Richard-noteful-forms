import React from "react";
import config from "../config";
import ApiContext from "../ApiContext";

export default class AddFolder extends React.Component {
  static contextType = ApiContext;

  state= {
    touch: false
  };

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((res) => {
        if (res.ok) {
        return res.json();
        } else {
            Promise.reject(res.message)
        }
    })
    .then((folder) => {
      this.context.addFolder(folder);
      this.props.history.goBack();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  validateName() {
    const name = this.nameInput.value;
    if (name.length === 0) {
      return "Name is required";
    };
  };

  handleChange = (e) => {
    this.setState({touch: true})
    console.log(this.state.touch)
  };

  render() {
    console.log(this.state.touch)
    return (
      <form
        className="AddFolder"
        onSubmit={(event) => this.handleSubmit(event)}
      >
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            className="AddFolderInput"
            ref={this.nameInput}
            onChange={(e) => this.handleChange(e)}
          />
          {this.state.touch && this.validateName()}
        </label>
        <button type="submit" className="submitButton" disabled={this.validateName()}>
          Submit
        </button>
      </form>
    );
  };
};