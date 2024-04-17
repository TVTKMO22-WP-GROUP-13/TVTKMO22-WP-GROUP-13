import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';

function GroupView() {
  const { group_id } = useParams();
  const location = useLocation();
  const { isOwner } = location.state || { isOwner: false }; // Default to not owner if state is undefined
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user_group/getGroup/${group_id}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        setGroupDetails(response.data.group);
      } catch (error) {
        setError('Failed to fetch group details.');
        console.error(error);
      }
    };

    const fetchGroupJoinRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group_request/getRequests/${group_id}`, {
          headers: {
            'Authorization': `Bearer ${jwtToken.value}`
          }
        });
        setGroupJoinRequests(response.data.groupRequests || []); // Safeguard with an empty array
      } catch (error) {
        setError('Failed to fetch join requests.');
        console.error(error);
      }
    };

    fetchGroupDetails();
    if (isOwner) {
      fetchGroupJoinRequests();
    }
  }, [group_id, isOwner]);

  if (!groupDetails) {
    return <p>{error || "Loading..."}</p>;
  }

  return (
    <div className="group-details">
      <h1>{groupDetails.group_name}</h1>
      <p>Description: {groupDetails.description}</p>
      {isOwner ? (
        <div>
          <h2>Join Requests</h2>
          {groupJoinRequests.length > 0 ? (
            <ul>
              {groupJoinRequests.map((request, index) => (
                <li key={index}>
                  User ID: {request.user_id}
                  <button onClick={() => console.log('Accept', request.user_id)}>Accept</button>
                  <button onClick={() => console.log('Reject', request.user_id)}>Reject</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No join requests.</p>
          )}
        </div>
      ) : (
        <p>Group Member View</p>
      )}
    </div>
  );
}

export default GroupView;