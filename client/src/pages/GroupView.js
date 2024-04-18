import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';

function GroupView() {
  const { group_id } = useParams()
  const { navigate } = useNavigate();
  const location = useLocation();
  const { isOwner } = location.state || { isOwner: false };
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchGroupDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user_group/getGroup/${group_id}`, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      setGroupDetails(response.data.group);
    } catch (error) {
      setError('Failed to fetch group details.');
      console.error(error);
    }
  }, [group_id]);

  const fetchGroupJoinRequests = useCallback(async () => {
    if (isOwner) {
      try {
        const response = await axios.get(`http://localhost:3001/group_request/getRequests/Pending/${group_id}`, {
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        setGroupJoinRequests(response.data.groupRequests || []);
      } catch (error) {
        setError('Failed to fetch join requests.');
        console.error(error);
      }
    }
  }, [group_id, isOwner]);

  const fetchGroupMembers = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/group_member/group_members?group_id=${group_id}`, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      setGroupMembers(response.data.groupMembers || []);
    } catch (error) {
      setError('Failed to fetch group members.');
      console.error(error);
    }
  }, [group_id]);

  const handleAccept = async (request_id, user_id) => {
    setUpdating(true);
    try {
      const response = await axios.post(`http://localhost:3001/group_request/acceptJoinRequest`, {
        group_id, user_id, request_id
      }, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      if (response.status === 200) {
        setGroupJoinRequests(prev => prev.filter(req => req.request_id !== request_id));
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
        request_id, request_status: 'Rejected'
      }, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      if (response.status === 200) {
        setGroupJoinRequests(prev => prev.filter(req => req.request_id !== request_id));
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

  const handleRemoveMember = async (user_id) => {
    setUpdating(true);
    try {
      const response = await axios.delete(`http://localhost:3001/group_member/remove`, {
        data: {
          group_id,
          user_id
        },
        headers: {
          'Authorization': `Bearer ${jwtToken.value}`
        }
      });

      if (response.status === 200) {
        setGroupMembers(prev => prev.filter(member => member.user_id !== user_id));
        alert("User has been removed from the group successfully.");
      } else {
        throw new Error('Failed to remove user from group');
      }
    } catch (error) {
      setError('Failed to remove user from group. ' + error.message);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      setUpdating(true);
      try {
        const response = await axios.delete(`http://localhost:3001/user_group/deleteGroup`, {
          data: { group_id },
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        if (response.status === 201) {
          alert("Group deleted successfully");
          navigate('/'); // Redirect to homepage or dashboard after deletion
        } else {
          throw new Error('Failed to delete group');
        }
      } catch (error) {
        setError('Failed to delete group. ' + error.message);
        console.error(error);
      } finally {
        setUpdating(false);
      }
    }
  };


  useEffect(() => {
    fetchGroupDetails();
    fetchGroupJoinRequests();
    fetchGroupMembers();
  }, [fetchGroupDetails, fetchGroupJoinRequests, fetchGroupMembers]);

  if (!groupDetails) {
    return <p>{error || "Loading..."}</p>;
  }

  return (
    <div className="group-details">
      <h1>{groupDetails.group_name}</h1>
      <p>Description: {groupDetails.description}</p>
      {isOwner && <button onClick={handleDeleteGroup} style={{ margin: '10px', backgroundColor: 'red', color: 'white' }}>Delete Group</button>}
      <div>
        <h2>Members</h2>
        {groupMembers.length > 0 ? (
          <ul>
            {groupMembers.map(member => (
              <li key={member.user_id}>
                User ID: {member.user_id}
                {isOwner && <button onClick={() => handleRemoveMember(member.user_id)}>Remove</button>}
              </li>
            ))}
          </ul>
        ) : <p>No members found.</p>}
      </div>
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
