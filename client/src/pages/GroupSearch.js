import React, { useState, useEffect } from 'react';
import './GroupSearch.css'

function GroupSearch() {
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('http://localhost:3001/user_group/all');
      const data = await response.json();
      setDisplayedGroups(data.groups);
    };
  
    fetchGroups();
  }, []);

  useEffect(() => {
    const filteredGroups = displayedGroups.filter(group => 
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedGroups(filteredGroups);
  }, [searchTerm]);

  return (
    <div className="group-list">
      <form>
        <input type="text" placeholder="Search groups" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      {displayedGroups.map((group) => (
        <div className="group-list-item" key={group.group_id}>
          <h2>{group.group_name}</h2>
          <p>Description: {group.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GroupSearch;