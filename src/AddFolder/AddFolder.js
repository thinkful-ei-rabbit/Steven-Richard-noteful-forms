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
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify({ name: name })
            }
        ).then(() => {
            this.context.didMount();
            this.props.history.goBack();
        })
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