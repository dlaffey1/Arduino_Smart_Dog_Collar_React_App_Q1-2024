import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './UserHomepage.css';
import { globalUserId } from '../SignInPage/SignInPage.js';
import heatWarningImage from './HeatWarningImage.png'; // Import your image file
import lowTempImage from './LowTempImage.png'; // Import your image file

function UserHomepage() {
  const [graphData, setGraphData] = useState([]);
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [heatWarning, setHeatWarning] = useState(false); // State variable for heat warning
  const [activityState, setActivityState] = useState('active'); // State variable for activity state
  const [barkCount, setBarkCount] = useState(0); // State variable for bark count
  const [activityTimes, setActivityTimes] = useState({ sleeping: 0, resting: 0, active: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = globalUserId;
        const url = `https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/User_Sound_Graph_Data?user_id=${userId}`;
        const url2 = `https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/arduino_state?user_id=${userId}`;
        const response = await axios.get(url);
        const ActivityStateAPIResponse = await axios.get(url2);

        setGraphData(response.data);

        // Check if temperature is above 40 degrees
        const hasHighTemperature = response.data.some(data => data.temperature > 40);
        setHeatWarning(hasHighTemperature);
        if (hasHighTemperature) {
          // sendSMS();
        }

        // Check for barks
        const barkData = response.data.filter(data => data.sound_level > 100);
        setBarkCount(barkData.length);

        // Extract the most recent non-inactive activity state from the API response
        if (ActivityStateAPIResponse && ActivityStateAPIResponse.data && ActivityStateAPIResponse.data.states && ActivityStateAPIResponse.data.states.length > 0) {
          const nonInactiveStates = ActivityStateAPIResponse.data.states.filter(state => state !== 'inactive');
          if (nonInactiveStates.length > 0) {
            const mostRecentState = nonInactiveStates[0];
            setActivityState(mostRecentState); // Set the most recent non-inactive state
          } else {
            console.log('No non-inactive states found.');
          }
        } else {
          console.log('No states found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        addConsoleMessage(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // const calculateActivityTimes = () => {
    //   const sleepingDuration = ActivityStateAPIResponse.data.states.filter(state => state === 'sleeping').length * 6 / 60; // 6 minutes sleeping
    //   const restingDuration = ActivityStateAPIResponse.data.states.filter(state => state === 'resting').length * 4 / 60; // 4 minutes resting
    //   const totalInactiveDuration = sleepingDuration + restingDuration;
    //   const activeDuration = 24 - totalInactiveDuration;
    //   setActivityTimes({ sleeping: sleepingDuration, resting: restingDuration, active: activeDuration });
    // };

    const fetchData = async () => {
      try {
        const userId = globalUserId;
        const url = `https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/User_Sound_Graph_Data?user_id=${userId}`;
        const url2 = `https://jb99jwfgcd.execute-api.us-east-1.amazonaws.com/Production/arduino_state?user_id=${userId}`;
        const response = await axios.get(url);
        const ActivityStateAPIResponse = await axios.get(url2);
        
        setGraphData(response.data);

        // Check if temperature is above 40 degrees
        const lastEntry = response.data[response.data.length - 1];
        const hasHighTemperature = lastEntry.temperature > 40;
        setHeatWarning(hasHighTemperature);


        // // Check for barks
        // const barkData = response.data.filter(data => data.sound_level > 100);
        // setBarkCount(barkData.length);

        // Extract the most recent non-inactive activity state from the API response
        if (ActivityStateAPIResponse && ActivityStateAPIResponse.data && ActivityStateAPIResponse.data.states && ActivityStateAPIResponse.data.states.length > 0) {
          const nonInactiveStates = ActivityStateAPIResponse.data.states.filter(state => state !== 'inactive');
          if (nonInactiveStates.length > 0) {
            const mostRecentState = nonInactiveStates[0];
            setActivityState(mostRecentState);
            
            const sleepingDuration = ActivityStateAPIResponse.data.states.filter(state => state === 'sleeping').length * 6 / 60; // 6 minutes sleeping
            const restingDuration = ActivityStateAPIResponse.data.states.filter(state => state === 'resting').length * 4 / 60; // 4 minutes resting
            const totalInactiveDuration = sleepingDuration + restingDuration;
            const activeDuration = 24 - totalInactiveDuration;
            setActivityTimes({ sleeping: sleepingDuration, resting: restingDuration, active: activeDuration });

      // Set the most recent non-inactive state
          } else {
            console.log('No non-inactive states found.');
          }
        } else {
          console.log('No states found.');
        }

        // calculateActivityTimes();
      } catch (error) {
        console.error('Error fetching data:', error);
        addConsoleMessage(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const filterDataByLastDay = (data) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }
    const currentTime = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return data.filter(entry => {
      const timestamp = parseInt(entry.timestamp.S) * 1000;
      return currentTime - timestamp <= oneDayInMs;
    });
  };

  const addConsoleMessage = (message) => {
    setConsoleMessages(prevMessages => [...prevMessages, message]);
  };

  const filteredData = filterDataByLastDay(graphData);

  return (
    <div className="user-homepage">
      <h2>User Homepage</h2>
      <div className="activity-tracker">
        <div className={`checkpoint ${activityState === 'sleeping' ? 'sleeping' : ''}`}>Sleeping</div>
        <div className={`checkpoint ${activityState === 'resting' ? 'resting' : ''}`}>Resting</div>
        <div className={`checkpoint ${activityState === 'active' ? 'active' : ''}`}>Active</div>
      </div>

      <div className="console">
        <h3>Console Messages</h3>
        <ul>
          {consoleMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>

      <div className="chart-container">
        <Plot
          data={[
            {
              x: filteredData.map(data => data.timestamp.S),
              y: filteredData.map(data => data.sound_level),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'rgba(75, 192, 192, 1)' },
              line: { width: 1 },
              name: 'Sound Intensity'
            },
            {
              x: filteredData.map(data => data.timestamp.S),
              y: filteredData.map(data => data.temperature),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'rgba(255, 99, 71, 1)' },
              line: { width: 1 },
              name: 'Temperature'
            }
          ]}
          layout={{
            xaxis: {
              type: 'date',
              tickformat: '%H:%M:%S' // Adjust the format as per your timestamp data
            },
            yaxis: {
              zeroline: false,
              rangemode: 'tozero'
            }
          }}
        />
        {heatWarning && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <img src={heatWarningImage} alt="Heat Warning" style={{ maxWidth: '10%', marginBottom: '10px' }} />
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'red' }}>High Temperature Warning</p>
          </div>
        )}
        {!heatWarning && filteredData.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {filteredData[filteredData.length - 1].temperature < -20 && (
              <>
                <img src={lowTempImage} alt="Low Temperature" style={{ maxWidth: '10%', marginBottom: '10px' }} />
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'blue' }}>Low Temperature Warning</p>
              </>
            )}
          </div>
        )}
        <div className="bark-counter">
          <p className="bark-counter-text">Bark Count: {barkCount}</p>
        </div>
      </div>

      <div className="pie-chart-container">
        <h3>Activity Summary</h3>
        <Plot
          data={[
            {
              labels: ['Sleeping', 'Resting', 'Active'],
              values: [activityTimes.sleeping, activityTimes.resting, activityTimes.active],
              type: 'pie'
            }
          ]}
          layout={{
            width: 400,
            height: 400,
            title: 'Activity Summary'
          }}
        />
      </div>
    </div>
  );
}

export default UserHomepage;
