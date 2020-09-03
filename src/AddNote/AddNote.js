import React from 'react'

export default class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
    };
    
    handleSubmit(event) {
        event.preventDefault();
        const name = this.nameInput.current.value;
        console.log('Name: ', name)
    };

    // state={
    //     name: '',
    // };

    render() {
        const { folders=[] } = this.context
        return (
            <form className='AddNote' onSubmit={event => this.handleSubmit(event)}>
                <label htmlFor='name'>
                    <input type='text' name='name' className='AddNoteInput' ref={this.nameInput} />
                </label>
                <button type='radio' value={folders}></button>    
                <button type='submit' className='submitButton'>Submit</button>
                
            </form>
        ); 
    };
};