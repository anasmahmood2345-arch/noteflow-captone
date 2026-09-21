
import { useState } from 'react';

function NoteList({ message, notes, loading, error, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editError, setEditError] = useState('');
  const startEditing = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };



const handleUpdate = (id) => {
  if (!editTitle.trim() || !editContent.trim()) {
    setEditError('Title and content are required');
    return;
  }

  setEditError('');

  onUpdate(id, {
    title: editTitle,
    content: editContent
  });

  setEditingId(null);
};





  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="notes">
      <h2>{message}</h2>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div className="note" key={note._id}>
            {editingId === note._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                  {editError && <p className="error">{editError}</p>}
                <button onClick={() => handleUpdate(note._id)}>
                  Save
                </button>

                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>

                <button onClick={() => startEditing(note)}>
                  Edit
                </button>

                <button onClick={() => onDelete(note._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default NoteList;

