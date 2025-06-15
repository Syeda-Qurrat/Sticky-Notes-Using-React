import { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, currentNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Update form fields when currentNote changes
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, content });

    if (!currentNote) {
        setTitle('');
        setContent('');
    }
};


  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Take a note..."
        rows="3"
      />
      <div className="form-actions">
        <button type="submit">
          {currentNote ? 'Update Note' : 'Add Note'}
        </button>
        {currentNote && (
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}