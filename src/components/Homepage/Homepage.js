import React from 'react';
import './Homepage.css'; // Import the CSS file
import logo from './logo.PNG'; // Import the logo image
import powerSwitchIcon from './power-switch.png'; // Import the power switch icon image
import createUserIcon from './createuser.png'; // Import the create user icon image
import passwordIcon from './password.png'; // Import the password icon image
import dashboardIcon from './dashboard.png'; // Import the dashboard icon image
import arrowIcon from './fast-forward.png'; // Import the arrow icon image

function Homepage() {
  return (
    <div className="homepage"> {/* Apply the homepage class */}
      <header> {/* Apply the header class */}
        <div className="logo-container"> {/* Container for the logo */}
          <img src={logo} alt="Logo" className="logo" /> {/* Logo image */}
          <h1>Welcome to the Homepage!</h1> {/* Welcome message */}
        </div>
      </header>
      
      <div className="diagram">
        <div className="step">
          <img src={powerSwitchIcon} alt="Power Switch" className="icon" />
          <p>Step 1: Turn on the device</p>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </div>
        <div className="step">
          <img src={createUserIcon} alt="Create User" className="icon" />
          <p>Step 2: Create an account</p>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </div>
        <div className="step">
          <img src={passwordIcon} alt="Password" className="icon" />
          <p>Step 3: Sign in with your credentials</p>
          <img src={arrowIcon} alt="Arrow" className="arrow" />
        </div>
        <div className="step">
          <img src={dashboardIcon} alt="Dashboard" className="icon" />
          <p>Step 4: View your dashboard</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
