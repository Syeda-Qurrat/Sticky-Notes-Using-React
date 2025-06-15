import Note from './Note';

export default function NotesGrid({ notes, onEdit, onDelete }) {
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <Note 
          key={note.id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}