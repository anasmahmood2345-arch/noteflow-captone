import { useState } from 'react';

function NoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
if (!title.trim() || !content.trim()) 
    { 
      setError('Title and content are required'); 
      return; 
    
    }
    const token = localStorage.getItem('token');
    setLoading(true);
    const newNote = {
      title,
      content
    };

    fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newNote)
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }

        return response.json();
      })
        .then((data) => {
        onNoteAdded(data);
        setTitle('');
        setContent('');
        setLoading(false);
      })
        .catch((error) => {
        setError(error.message);
        setLoading(false);
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add a Note</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit" disabled={loading}>
      {loading ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
}

export default NoteForm;