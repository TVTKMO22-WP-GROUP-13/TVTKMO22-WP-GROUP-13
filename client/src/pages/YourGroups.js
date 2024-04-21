import { Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { jwtToken } from '../components/AuSignal';
import axios from 'axios';
import styles from './YourGroups.module.css';

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
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        const groupData = groupType === 'created' ? response.data.groups : response.data.groupsJoined;
        if (groupData && groupData.length > 0) {
          setGroups(groupData);
        } else {
          setError(`No ${groupType} groups found.`);
        }
      } catch (error) {
        setError(`Failed to fetch ${groupType} groups.`);
      } finally {
        setLoading(false);
      }
    };

    if (jwtToken.value) {
      fetchGroups('http://localhost:3001/user_group/getUserCreatedGroups', setCreatedGroups, setErrorCreated, 'created');
      fetchGroups('http://localhost:3001/group_member/groups_joined', setJoinedGroups, setErrorJoined, 'joined');
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
      <Link to="/MakeGroup">
        <button className={styles['create-group-button']}>Create a new group</button>
      </Link>
      <div className={styles['group-list']}>
        <h2>Your Created Groups</h2>

        {createdGroups.length > 0 ? createdGroups.map(group => (
          <Link to={`/group/${group.group_id}`} state={{ isOwner: true }} key={group.group_id} className={styles['group-list-item']}>
            <h2 className={styles['group-title']}>{group.group_name}</h2>
            <p className={styles['group-description']}>Description: {group.description}</p>
          </Link>
        )) : <p className={styles['error-message']}>{errorCreated}</p>}
      </div>
      <div className={styles['group-list']}>
        <h2>Your Joined Groups</h2>
        {joinedGroups.length > 0 ? joinedGroups.map(group => (
          <Link to={`/group/${group.group_id}`} state={{ isOwner: false }} key={group.group_id} className={styles['group-list-item']}>
            <h2 className={styles['group-title']}>{group.group_name}</h2>
            <p className={styles['group-description']}>Description: {group.description}</p>
          </Link>
        )) : <p className={styles['error-message']}>{errorJoined}</p>}
      </div>
    </div>
  );
}