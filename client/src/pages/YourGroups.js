import { Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { jwtToken } from '../components/AuSignal';
import axios from 'axios';
import './YourGroups.css'; 

export default function YourGroups() {
  useSignals();
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [errorCreated, setErrorCreated] = useState('');
  const [errorJoined, setErrorJoined] = useState('');

  useEffect(() => {
    const fetchGroups = async (url, setGroups, setError) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        if (response.data.groups?.length > 0) {
          setGroups(response.data.groups);
        } else {
          setError('No groups found.');
        }
      } catch (error) {
        setError('You have not joined any groups.');
        console.error(error);
      }
    };

    if(jwtToken.value) {
      fetchGroups('http://localhost:3001/user_group/getUserCreatedGroups', setCreatedGroups, setErrorCreated);
      fetchGroups('http://localhost:3001/group_member/groups_joined', setJoinedGroups, setErrorJoined);
    }
  }, []);

  if(!jwtToken.value) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <div className="group-list">
        <h2>Your Created Groups</h2>
        {createdGroups.length > 0 ? createdGroups.map(group => (
          <Link to={`/group/${group.group_id}`} key={group.group_id} className="group-list-item">
            <h2 className="group-title">{group.group_name}</h2>
            <p className="group-description">Description: {group.description}</p>
          </Link>
        )) : <p className="error-message">{errorCreated}</p>}
      </div>
      <div className="group-list">
        <h2>Your Joined Groups</h2>
        {joinedGroups.length > 0 ? joinedGroups.map(group => (
          <Link to={`/group/${group.group_id}`} key={group.group_id} className="group-list-item">
            <h2 className="group-title">{group.group_name}</h2>
            <p className="group-description">Description: {group.description}</p>
          </Link>
        )) : <p className="error-message">{errorJoined}</p>}
      </div>
    </div>
  );
}