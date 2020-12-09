import React, {Component} from 'react';
import {Form, FormControl, Button} from 'react-bootstrap';
import Note from './Note';


class App extends Component {
    constructor(){
        super()

        this.state = {
            text: '',
            notes: []
        }
    }

    submit = () => {
        const { notes, text } = this.state
        notes.push({ text })
        this.setState({ notes })
    }

    render(){
        return(
            <div>
                <Form inline>
                    <FormControl onChange={event => {this.setState({text: event.target.value})}} onS/>
                    {" "}
                    <Button onClick={() => this.submit()}>Submit</Button>
                </Form>
                <div className='notes'>
                    {this.state.notes.map((note, index) => {
                        return(
                            <div className='noteRow'>
                                <Note key={index} note={note}/>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        )
    }
}

export default App;