import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


const cookie_key = 'NOTES';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      notes: []
    }
  }

  submitNote() {
    const { notes, text } = this.state;
    notes.push({ text, isComplete: false });
    this.setState({ notes });
    bake_cookie(cookie_key, this.state.notes)
  }

  deleteNote = (index) => {
    let notes = this.state.notes
    console.log(notes[index])
    notes.splice(index, 1)
    this.setState({notes: notes})
  }

  markComplete = (index) => {
    let notes = this.state.notes
    notes[index].isComplete = !notes[index].isComplete
    this.setState({notes: notes})
  }

  clearNotes(){
    delete_cookie(cookie_key)
    this.setState({ notes: [] })
  }

  componentDidMount(){
    this.setState({notes: read_cookie(cookie_key)})
  }

  render() {
    return (
      <div>
        <h2>Notes</h2>
        <Form inline>
          <FormControl onChange={event => this.setState({ text: event.target.value }) } />
          {' '}
          <Button onClick={() => this.submitNote()}>submit</Button>
        </Form>
        <div className='notes'>
          {
          this.state.notes.map((note, index, isComplete) => {
            return (
              <Note
                key={index}
                isComplete={isComplete}
                index={index} note={note}
                markComplete={() => this.markComplete(index)}
                deleteNote={() => this.deleteNote(index)} />
              )
            })
          }
        </div>
        <hr/>
        <Button onClick={() => this.clearNotes()}>clear notes</Button>
      </div>
    )
  }
}

export default App;