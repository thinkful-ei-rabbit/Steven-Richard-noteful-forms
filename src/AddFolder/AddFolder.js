import React from 'react'

export default class AddFolder extends React.Component {
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
        return (
            <form className='AddFolder' onSubmit={event => this.handleSubmit(event)}>
                <label htmlFor='name'>
                    <input type='text' name='name' className='AddFolderInput' ref={this.nameInput} />
                </label>
                <button type='submit' className='submitButton'>Submit</button>
            </form>
        ); 
    };
};