import React, { useState, useEffect } from 'react';
import './Messagelist.css'; // Import CSS file for styling
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/RetrieveUserFeedback');
            setMessages(response.data); // Assuming the response.data is an array of message objects
        } catch (error) {
            console.error('Error fetching messages:', error);
            setErrorMessage('Error fetching messages. Please try again later.');
        }
    };

    return (
        <div className="message-list-box">
            <div className="message-list">
                <h2>Message List</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MessageList;
