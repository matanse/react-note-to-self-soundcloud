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

  submitNote = (e) => {
    e.preventDefault()
    const { notes, text } = this.state;
    notes.push({ text, isComplete: false });
    this.setState({ notes });
    bake_cookie(cookie_key, this.state.notes)
  }

  deleteNote = (index) => {
    let notes = this.state.notes
    notes.splice(index, 1)
    this.setState({notes: notes})
  }

  markComplete = (index) => {
    let { notes } = this.state
    notes[index].isComplete = !notes[index].isComplete
    if (notes[index].isComplete) {
      notes.push(notes.splice(index, 1)[0])
    } else {
      notes = [notes.splice(index, 1)[0], ...notes]
    }
    this.setState({ notes })
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
        <Form inline onSubmit={(e) => this.submitNote(e)}>
          <FormControl onChange={event => this.setState({ text: event.target.value }) } />
          {' '}
          <Button type="submit">submit</Button>
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