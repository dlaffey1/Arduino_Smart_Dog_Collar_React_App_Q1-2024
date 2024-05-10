import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationBar.css'; // Import NavigationBar CSS file

function NavigationBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        // Prevent default form submission behavior
        event.preventDefault();

        // Navigate to the link corresponding to the search term
        navigate(`/${searchTerm}`);
    };

    const handleKeyPress = (event) => {
        // Check if the Enter key is pressed
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    const handleSignOut = () => {
        navigate('/');
    };

    return (
        <div className="NavigationBar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/chatserver">Chat Server</Link> {/* Add this line */}
                    </li>
                    <li>
                        <Link to="/uploaddocument">Upload Document</Link>
                    </li>
                    <li>
                        <Link to="/moduleselection">Module Selection</Link> {/* Add this line for module selection */}
                    </li>
                    <li className="search-bar">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                            />
                        </form>
                    </li>
                    <li className="sign-out">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationBar;
