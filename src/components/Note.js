import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';

class Note extends Component {
  getStyle = () => {
    return {
      textDecoration: this.props.note.isComplete ? 'line-through' : 'none'
    }
  }
  render() {
    const { note, deleteNote, markComplete} = this.props
    return (
      <div className='noteRow'>
        <div className='note' style={this.getStyle()}>
          <Checkbox type='button' onChange={markComplete} checked={note.isComplete}/>
          <p>{note.text}</p>
        </div>
        <button type='button' onClick={deleteNote}>X</button>
      </div>
    )
  }
}

export default Note;