export default function Note({ note, onEdit, onDelete }) {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(note)}  // Pass the entire note object
        >
          Edit
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}