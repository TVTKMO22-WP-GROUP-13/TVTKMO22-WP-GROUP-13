import React, { useState, useEffect } from 'react';
import './GroupSearch.css'

function GroupSearch() {
  const [allGroups, setAllGroups] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('http://localhost:3001/user_group/all');
      const data = await response.json();
      const groupsWithOwnerNames = await Promise.all(data.groups.map(async group => {
        const ownerResponse = await fetch(`http://localhost:3001/user_data/user_id?user_id=${group.owner_id}`);
        const ownerData = await ownerResponse.json();
        return { ...group, owner_name: ownerData.user.username };
      }));
      setAllGroups(groupsWithOwnerNames);
      setDisplayedGroups(groupsWithOwnerNames);
    };
  
    fetchGroups();
  }, []);

  useEffect(() => {
    const filteredGroups = allGroups.filter(group => group.group_name.toLowerCase().includes(searchTerm.toLowerCase()));
    setDisplayedGroups(filteredGroups);
  }, [searchTerm, allGroups]);

  return (
    <div className="group-list">
      <form>
        <input type="text" placeholder="Search groups" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </form>
      {displayedGroups.map((group) => (
        <div className="group-list-item" key={group.group_id}>
          <h2>{group.group_name}</h2>
          <p>Created by: {group.owner_name}</p>
          <p>Description: {group.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GroupSearch;