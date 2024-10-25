import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.css';

// Declare a global variable to store the id
export let globalUserId = '';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [id, setId] = useState('');
  const [phone_number, setPhoneNumber] = useState(''); // Add phone_number state
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const signIn = async () => {
    try {
      const response = await axios.post(
        'https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/signin',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        // Set the globalUserId variable with the id from the response
        globalUserId = response.data.userId;
        setAuthenticated(true);
        if (username === 'admin') {
          setIsAdmin(true);
        }
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      console.error('Error stack:', error.stack);
      setErrorMessage('Error signing in. Please try again.');
    }
  };
  
  const createUser = async () => {
    try {
      if (!email.endsWith('.com')) {
        setErrorMessage('Email is incorrect');
        return;
      }
      
      const response = await axios.post(
        'https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/createuser',
        { username: createUsername, password: createPassword, email, id, phone_number: phone_number },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        setErrorMessage('User created successfully');
      } else {
        setErrorMessage('Error creating user. Please try again.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Error creating user. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>

      <h2>Create User</h2>
      <input type="text" placeholder="New Username" value={createUsername} onChange={(e) => setCreateUsername(e.target.value)} />
      <input type="password" placeholder="New Password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="text" placeholder="Phone Number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={createUser}>Create User</button>

      {authenticated && <Link to="/UserHomepage">Go to User Homepage</Link>}
      {isAdmin && <Link to="/AdminHomepage">Go to Admin Homepage</Link>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default SignInPage;
