import React, { useState } from 'react';
import './ChatServer.css'; // Import the CSS file

function ChatServerFeedbackForm() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/ProcessUserFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: feedback }), // Corrected the key name to match the expected body format
            });

            if (response.ok) {
                // Clear the textarea after successful submission
                setFeedback('');
                console.log('Feedback sent successfully!');
            } else {
                // Handle error response
                console.error('Failed to send feedback');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error', error);
        }
    };

    return (
        <div className="chat-server-form">
            <h1>Chat Server Feedback Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Message:
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default ChatServerFeedbackForm;
