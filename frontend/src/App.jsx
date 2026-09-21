import { useEffect, useState } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (data) => {
    setSignupMessage(data.message);
    setShowSignup(false);
  };

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    setError('');
    setLoggedIn(true);
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const token = localStorage.getItem('token');

    setLoading(true);
    setError('');

    fetch('http://localhost:3000/api/notes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setLoggedIn(false);
          throw new Error('Your session has expired. Please login again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        return response.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [loggedIn]);

  const handleAddNote = (newNote) => {
    setNotes((currentNotes) => [...currentNotes, newNote]);
  };

  const handleDeleteNote = (id) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setLoggedIn(false);
          throw new Error('Your session has expired. Please login again.');
        }

        if (!response.ok) {
          throw new Error('Failed to delete note');
        }

        return response.json();
      })
      .then(() => {
        setNotes((currentNotes) =>
          currentNotes.filter((note) => note._id !== id)
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

 
const handleUpdateNote = (id, updatedNote) => {
  const token = localStorage.getItem('token');

  fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedNote)
  })
    .then((response) => {
      if (response.status === 401) {
        localStorage.removeItem('token');
        setLoggedIn(false);
        throw new Error('Your session has expired. Please login again.');
      }

      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }

      return response.json();
    })
    .then((updatedNote) => {
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note._id === id ? updatedNote : note
        )
      );
    })
    .catch((error) => {
      setError(error.message);
    });
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setNotes([]);
    setError('');
  };

if (loggedIn) {
  return (
    <div>
      <div>
        <h1>NoteFlow</h1>
        <p className="subtitle">Simple note management</p>
      </div>

      <NoteForm onNoteAdded={handleAddNote} />

      <NoteList
        message="Your Notes"
        notes={notes}
        loading={loading}
        error={error}
        onDelete={handleDeleteNote}
        onUpdate={handleUpdateNote}
      />

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

  return (
    <div>
      <h1>NoteFlow</h1>
      <p className="subtitle">Simple note management</p>

      {showSignup ? (
        <>
          <Signup onSignup={handleSignup} />

          <p className="auth-switch">
            Already have an account?{' '}
            <button onClick={() => setShowSignup(false)}>
              Login
            </button>
          </p>
        </>
      ) : (
        <>
          {signupMessage && (
          <p className="success">{signupMessage}</p>
          )}
          <Login onLogin={handleLogin} />

          <p className="auth-switch">
            Don't have an account?{' '}
            <button onClick={() => setShowSignup(true)}>
              Sign Up
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;