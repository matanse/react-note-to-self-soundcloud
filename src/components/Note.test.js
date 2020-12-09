import React from 'react';
import {mount} from 'enzyme';
import Note from './Note';
import { Item } from 'react-bootstrap/lib/Breadcrumb';

describe('Note', () => {
    let note = mount(<Note note={{text: 'test note'}}/>);

    It('renders the note text', () => {
        console.log(note.debug());
    })
})