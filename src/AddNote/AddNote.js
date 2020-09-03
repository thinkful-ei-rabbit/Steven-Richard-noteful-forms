import React from 'react';
import config from "../config";
import ApiContext from "../ApiContext";

export default class AddNote extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.folderInput = React.createRef();
        this.nameContent = React.createRef();
    };

    handleChange = (e) => {
        console.log(this.folderInput)
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const name = this.nameInput.current.value;
        //const id = this.folderInput.current.value
        fetch(`${config.API_ENDPOINT}/notes`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ 
              name: name, 
              //folderId: id,
            }),
        }).then((res) => {
            return res.json();
        })
        .then((note) => {
          this.context.addNote(note);
          this.props.history.goBack();
        });
    };

    render() {
        const { folders=[] } = this.context
        const options = folders.map((folder, idx) => {
            return (
                <option ref={this.folderInput} value={folder.id} id={folder.id} key={idx}>
                    {folder.name}
                </option>
            )
        })


        return (
            <form className='AddNote' onSubmit={event => this.handleSubmit(event)}>
                <label htmlFor='name'>
                    <input type='text' name='name' className='AddNoteInput' ref={this.nameInput} />
                </label>
                <select name="folder" id="folders" aria-label='Folder Selections' onChange={(e) => this.handleChange(e)}>
                {options} 
                </select>  
                <button type='submit' className='submitButton'>Submit</button>
                
            </form>
        ); 
    };
};