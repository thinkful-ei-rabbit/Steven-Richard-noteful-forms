import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext';

export default class AddFolder extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
    };
    
    handleSubmit(event) {
        event.preventDefault();
        const name = this.nameInput.current.value;
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: {'name': name}
            }
        )
        console.log(this.context.didMount);
    };

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