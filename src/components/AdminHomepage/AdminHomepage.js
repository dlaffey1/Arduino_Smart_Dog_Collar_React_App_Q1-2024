import React, { useState, useEffect } from 'react';
import './AdminHomepage.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import MessageList from './Messagelist'; // Import the MessageList component

const AdminHomepage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
    const [searchInput, setSearchInput] = useState(''); // State for search input
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/list-user-credentials');
            setUsers(response.data); // Assuming the response.data is an array of user objects
            setFilteredUsers(response.data); // Initialize filtered users with all users
        } catch (error) {
            console.error('Error fetching users:', error);
            setErrorMessage('Error fetching users. Please try again later.');
        }
    };

    const deleteUser = async (username) => {
        try {
            if (!username) {
                setErrorMessage('Username is required.');
                return;
            }
            await axios.delete('https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/delete-user-entry', { data: { username } });
            // Update the users state to remove the deleted user
            setUsers(users.filter(user => user.username !== username));
            setFilteredUsers(filteredUsers.filter(user => user.username !== username)); // Update filtered users as well
            setErrorMessage('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            setErrorMessage('Error deleting user. Please try again later.');
        }
    };

    // Function to handle search input changes
    const handleSearchInputChange = (event) => {
        const searchValue = event.target.value;
        setSearchInput(searchValue); // Update search input state
        // Filter users based on the search input
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered); // Update filtered users state
    };

    return (
        <div className="admin-homepage">
            <h1>Welcome to the Admin Homepage</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        {/* Add other user attributes as needed */}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            {/* Add other user attributes as needed */}
                            <td>
                                <button onClick={() => deleteUser(user.username)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="message-list-box">
                <MessageList /> {/* Add the MessageList component here */}
            </div>
        </div>
    );
};

export default AdminHomepage;
