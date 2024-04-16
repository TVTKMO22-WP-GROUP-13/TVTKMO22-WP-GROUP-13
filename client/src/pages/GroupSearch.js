import React, { useState, useEffect } from 'react';
import './GroupSearch.css'
import { useSignals } from '@preact/signals-react/runtime';
import { jwtToken } from '../components/AuSignal';

function GroupSearch() {
  useSignals();
  const [allGroups, setAllGroups] = useState([]);
  const [involvedGroups, setInvolvedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredGroups, setFilteredGroups] = useState([]); 

  useEffect(() => {
    const fetchGroupsAndStatus = async () => {
      const groupResponse = await fetch('http://localhost:3001/user_group/all', {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });
      const groupsData = await groupResponse.json();
      setAllGroups(groupsData.groups);
      setFilteredGroups(groupsData.groups);

      if (jwtToken.value) {
        const involvedResponse = await fetch('http://localhost:3001/group_request/user_involved_groups', {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        const involvedData = await involvedResponse.json();
        setInvolvedGroups(involvedData.involvedGroups.map(group => group.group_id));
      } else {
        setInvolvedGroups([]);
      }

      setLoading(false);
    };

    fetchGroupsAndStatus();
  }, [jwtToken.value]);

  useEffect(() => {
    const filteredGroups = allGroups.filter(group =>
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(filteredGroups); 
  }, [searchTerm, allGroups]);

  const handleJoinRequest = async (groupId) => {
    const response = await fetch('http://localhost:3001/group_request/add_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.value}`
      },
      body: JSON.stringify({ group_id: groupId })
    });
    const data = await response.json();
    if (response.ok) {
      setInvolvedGroups(prev => [...prev, groupId]);  
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="group-list">
      {loading ? <p>Loading groups...</p> : (
        <>
          <form>
            <input type="text" placeholder="Search groups" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </form>
          {filteredGroups.map((group) => (
            <div className="group-list-item" key={group.group_id}>
              <h2>{group.group_name}</h2>
              <p>Description: {group.description}</p>
              {jwtToken.value && !involvedGroups.includes(group.group_id) &&
                <button onClick={() => handleJoinRequest(group.group_id)}>Send join request</button>
              }
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default GroupSearch;