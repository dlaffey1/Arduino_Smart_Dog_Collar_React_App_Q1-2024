import React, { useState } from 'react';
import axios from 'axios';

function UploadDocument() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Replace 'YOUR_UPLOAD_ENDPOINT' with your actual upload endpoint
            const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadStatus('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}

export default UploadDocument;
