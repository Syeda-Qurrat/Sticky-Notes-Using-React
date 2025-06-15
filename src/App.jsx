import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NotesGrid from './components/NotesGrid';
import SearchBar from './components/SearchBar';
import './styles.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentNote, setCurrentNote] = useState(null);

  // Load saved notes on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes when they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (note) => {
    if (currentNote) {
      // Update existing note
      setNotes(notes.map(n => 
        n.id === currentNote.id ? { ...n, ...note } : n
      ));
    } else {
      // Add new note
      setNotes([...notes, { ...note, id: Date.now() }]);
    }
    setCurrentNote(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <div className="app">
      <h1>Sticky Notes</h1>
      <div className="app-content">
        <SearchBar onSearch={setSearchTerm} />
        <NoteForm 
          onSubmit={handleSubmit} 
          currentNote={currentNote}
          onCancel={() => setCurrentNote(null)}
        />
        <NotesGrid 
          notes={filteredNotes}
          onEdit={setCurrentNote}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}