import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleSelection = () => {
  const [modulesData, setModulesData] = useState({});
  const [selectedModule, setSelectedModule] = useState('');
  const [newModuleName, setNewModuleName] = useState('');
  const navigate = useNavigate();

  const handleAddModule = () => {
    if (newModuleName.trim() === '') return;
    setModulesData({ ...modulesData, [newModuleName]: [] });
    setNewModuleName('');
  };

  const handleSelectModule = (moduleName) => {
    setSelectedModule(moduleName);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Module Selection</h1>

      <div>
        <h2>Add New Module</h2>
        <input style={{ backgroundColor: '#ffffff' }} type="text" placeholder="Module Title" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} />
        <button onClick={handleAddModule}>Add Module</button>
      </div>

      <div>
        <h2>Select Module</h2>
        <select style={{ backgroundColor: '#ffffff' }} value={selectedModule} onChange={(e) => handleSelectModule(e.target.value)}>
          <option value="">-- Select Module --</option>
          {Object.keys(modulesData).map((moduleName, index) => (
            <option key={index} value={moduleName}>
              {moduleName}
            </option>
          ))}
        </select>
      </div>

      <div className="centered">
        <button onClick={handleLogout} type="submit">Logout</button>
      </div>
    </div>
  );
};

export default ModuleSelection;
