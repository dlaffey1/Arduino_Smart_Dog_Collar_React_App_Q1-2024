// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import SignInPage from './components/SignInPage/SignInPage';
import UserHomepage from './components/UserHomepage/UserHomepage';
import AdminHomepage from './components/AdminHomepage/AdminHomepage';
import NavigationBar from './components/NavigationBar/NavigationBar'; // Import NavigationBar component
import ChatServerFeedbackForm from './components/ChatServer/ChatServer';
import UploadDocument from './components/UploadDocument/UploadDocument'; 
import ModuleSelection from './components/ModuleSelection/ModuleSelection';
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar /> {/* Include NavigationBar component */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/userhomepage" element={<UserHomepage />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/chatserver" element={<ChatServerFeedbackForm />} /> {/* Add ChatServerFeedbackForm to the NavigationBar */}
          <Route path="/uploaddocument" element={<UploadDocument />} />
          <Route path="/moduleselection" element={<ModuleSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
