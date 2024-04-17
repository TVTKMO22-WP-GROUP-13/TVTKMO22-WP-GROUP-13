import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';

function GroupView() {
  const { group_id } = useParams();
  const location = useLocation();
  const { isOwner } = location.state || { isOwner: false };
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchGroupDetails();
    if (isOwner) {
      fetchGroupJoinRequests();
    }
  }, [group_id, isOwner]);

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
      const response = await axios.get(`http://localhost:3001/group_request/getRequests/Pending/${group_id}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });
      setGroupJoinRequests(response.data.groupRequests || []);
      console.log(response.data.groupRequests);
    } catch (error) {
      setError('Failed to fetch join requests.');
      console.error(error);
    }
  };

  const handleAccept = async (request_id, user_id) => {
    setUpdating(true);
    try {
      const response = await axios.post(`http://localhost:3001/group_request/acceptJoinRequest`, {
        group_id,
        user_id,
        request_id
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });

      if (response.status === 200) {
        setGroupJoinRequests(prev => prev.filter(req => req.id !== request_id));
        alert("User has been successfully added to the group.");
      } else {
        throw new Error('Failed to process join request');
      }
    } catch (error) {
      setError('Failed to accept join request. ' + error.message);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleReject = async (request_id) => {
    setUpdating(true);
    try {
      const response = await axios.patch(`http://localhost:3001/group_request/update_status`, {
        request_id,
        request_status: 'Rejected'
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });

      if (response.status === 200) {
        setGroupJoinRequests(prev => prev.filter(req => req.id !== request_id));
        alert("Join request has been rejected.");
      } else {
        throw new Error('Failed to reject join request');
      }
    } catch (error) {
      setError('Failed to reject join request. ' + error.message);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (!groupDetails) {
    return <p>{error || "Loading..."}</p>;
  }

  return (
    <div className="group-details">
      <h1>{groupDetails.group_name}</h1>
      <p>Description: {groupDetails.description}</p>
      {isOwner && (
        <div>
          <h2>Join Requests</h2>
          {updating ? <p>Updating...</p> : groupJoinRequests.length > 0 ? (
            <ul>
              {groupJoinRequests.map(request => (
                <li key={request.request_id}>
                  User ID: {request.user_id}
                  <button onClick={() => handleAccept(request.request_id, request.user_id)}>Accept</button>
                  <button onClick={() => handleReject(request.request_id)}>Reject</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No join requests.</p>
          )}
        </div>
      )}
      {!isOwner && <p>Group Member View</p>}
    </div>
  );
}

export default GroupView;