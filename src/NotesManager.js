import React, { useState } from 'react';
import './NotesManager.css'; // Import CSS for styling

const NotesManager = () => {
  const [notes, setNotes] = useState(['']); // Initial state with one empty note

  const handleAddNote = () => {
    setNotes([...notes, '']); // Add a new empty note to the notes array
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    alert('Notes Form Successfully Submitted!'); // Show a pop-up alert for success
  };

  return (
    <div className="notes-manager-container">
      <h2>My Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="notes-list">
          {notes.map((note, index) => (
            <div key={index} className="note-item">
              <input
                type="text"
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                placeholder="Enter a note"
              />
              <button onClick={() => handleRemoveNote(index)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="add-note-form">
          <button type="button" onClick={handleAddNote}>Add Note</button> {/* Changed type to "button" */}
          <button type="submit" className="submit-button">Submit Notes</button> {/* Added className */}
        </div>
      </form>
    </div>
  );
};

export default NotesManager;
