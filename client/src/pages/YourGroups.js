import { Link, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'
import { jwtToken } from '../components/AuSignal';
import axios from 'axios';

export default function YourGroups() {
  useSignals()
  const [createdGroups, setCreatedGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCreatedGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user_group/getUserCreatedGroups', {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        if (response.data.groups.length === 0) {
          setErrorMessage('No groups created yet.');
        } else {
          setCreatedGroups(response.data.groups);
        }
      } catch (error) {
        setErrorMessage('Error fetching created groups.');
      }
    };

    const fetchJoinedGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/group_member/groups_joined', {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        if (response.data.groupsJoined.length === 0) {
          setErrorMessage('No groups joined yet.');
        } else {
          setJoinedGroups(response.data.groupsJoined);
        }
      } catch (error) {
        setErrorMessage('Error fetching joined groups.');
      }
    };

    fetchCreatedGroups();
    fetchJoinedGroups();
  }, []);

  if(jwtToken.value.length === 0){
    return <Navigate to='/login' />
  }

  return (
    <div>
      <h2>Your Created Groups</h2>
      {createdGroups.length > 0 ? createdGroups.map((group) => (
        <div key={group.group_id}>
          <h2>{group.group_name}</h2>
          <p>Description: {group.description}</p>
        </div>
      )) : <p>{errorMessage}</p>}
      <h2>Your Joined Groups</h2>
      {joinedGroups.length > 0 ? joinedGroups.map((group) => (
        <div key={group.group_id}>
          <h2>{group.group_name}</h2>
          <p>Description: {group.description}</p>
        </div>
      )) : <p>{errorMessage}</p>}
    </div>
  );
}