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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async (url, setGroups, setError, groupType) => {
      setLoading(true);
      console.log(`Fetching ${groupType} groups`);
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        console.log(`${groupType} groups response:`, response.data);
        const groupData = groupType === 'created' ? response.data.groups : response.data.groupsJoined;
        if (groupData && groupData.length > 0) {
          setGroups(groupData);
        } else {
          setError(`No ${groupType} groups found.`);
          console.log(`No ${groupType} groups found`);
        }
      } catch (error) {
        console.error(`Error fetching ${groupType} groups:`, error);
        setError(`You have not ${groupType} groups.`);
      } finally {
        setLoading(false);
      }
    };

    if (jwtToken.value) {
      fetchGroups('http://localhost:3001/user_group/getUserCreatedGroups', setCreatedGroups, setErrorCreated, 'created');
      fetchGroups('http://localhost:3001/group_member/groups_joined', setJoinedGroups, setErrorJoined, 'joined');
    } else {
      console.log('No JWT token found, redirecting to login');
    }
  }, []);

  if (!jwtToken.value) {
    return <Navigate to='/login' />;
  }

  if (loading) {
    return <p>Loading groups...</p>;
  }

  return (
    <div>
      <div className="group-list">
        <h2>Your Created Groups</h2>
        <Link to="/MakeGroup">
          <button className="create-group-button">Create a new group</button>
        </Link>
        {createdGroups.length > 0 ? createdGroups.map(group => (
          <Link to={`/group/${group.group_id}`} state={{ isOwner: true }} key={group.group_id} className="group-list-item">
            <h2 className="group-title">{group.group_name}</h2>
            <p className="group-description">Description: {group.description}</p>
          </Link>
        )) : <p className="error-message">{errorCreated}</p>}
      </div>
      <div className="group-list">
        <h2>Your Joined Groups</h2>
        {joinedGroups.length > 0 ? joinedGroups.map(group => (
          <Link to={`/group/${group.group_id}`} state={{ isOwner: false }} key={group.group_id} className="group-list-item">
            <h2 className="group-title">{group.group_name}</h2>
            <p className="group-description">Description: {group.description}</p>
          </Link>
        )) : <p className="error-message">{errorJoined}</p>}
      </div>
    </div>
  );
}