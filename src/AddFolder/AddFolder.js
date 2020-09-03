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
    console.log(this.nameInput.current.value)
    const name = this.nameInput.current.value;
    if (name.length < 3) {
      console.log("Name is required");
    } else if(name.length > 3)
    this.handleSubmit();
  };

  handleChange = () => {
    this.validateName()
  };

  render() {
    console.log(this.state.touch)
    return (
      <form
        className="AddFolder"
        onSubmit={(event) => this.validateName(event)}
      >
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            className="AddFolderInput"
            ref={this.nameInput}
            onChange={(e) => this.handleSubmit(e)}
          />
        </label>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    );
  };
};