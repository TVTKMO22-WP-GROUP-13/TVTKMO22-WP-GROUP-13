import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';
import styles from './GroupView.module.css'; // Import the module CSS

function GroupView() {
  const { group_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOwner } = location.state || { isOwner: false };
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupShowtimes, setGroupShowtimes] = useState([]);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);
  const [showShowtimes, setShowShowtimes] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const toggleMembersVisibility = () => setShowMembers(!showMembers);
  const toggleJoinRequestsVisibility = () => setShowJoinRequests(!showJoinRequests);
  const toggleShowtimesVisibility = () => setShowShowtimes(!showShowtimes);

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

  const fetchGroupShowtimes = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/showtime/getShowtimeByGroup/${group_id}`, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      const showtimes = response.data.GroupShowtimes || [];
  
      const showtimeDetails = await Promise.all(showtimes.map(async showtime => {
        const userResponse = await axios.get(`http://localhost:3001/user_data/user_id?user_id=${showtime.added_by_user_id}`, {
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        return { ...showtime, username: userResponse.data.user.username }; // appending username to each showtime
      }));
  
      setGroupShowtimes(showtimeDetails);
    } catch (error) {
      setError('Failed to fetch group showtimes.');
      console.error(error);
    }
  }, [group_id]);



  const fetchGroupMembers = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/group_member/group_members?group_id=${group_id}`, {
        headers: { 'Authorization': `Bearer ${jwtToken.value}` }
      });
      const members = response.data.groupMembers || [];
      const memberDetails = await Promise.all(members.map(async member => {
        const userResponse = await axios.get(`http://localhost:3001/user_data/user_id?user_id=${member.user_id}`, {
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        return { ...member, username: userResponse.data.user.username }; // assuming the username field is available
      }));
      setGroupMembers(memberDetails);
    } catch (error) {
      setError('Failed to fetch group members.');
      console.error(error);
    }
  }, [group_id]);

  const fetchGroupJoinRequests = useCallback(async () => {
    if (isOwner) {
      try {
        const response = await axios.get(`http://localhost:3001/group_request/getRequests/Pending/${group_id}`, {
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        const requests = response.data.groupRequests || [];
        const requestDetails = await Promise.all(requests.map(async request => {
          const userResponse = await axios.get(`http://localhost:3001/user_data/user_id?user_id=${request.user_id}`, {
            headers: { 'Authorization': `Bearer ${jwtToken.value}` }
          });
          return { ...request, username: userResponse.data.user.username }; // assuming the username field is available
        }));
        setGroupJoinRequests(requestDetails);
      } catch (error) {
        setError('Failed to fetch join requests.');
        console.error(error);
      }
    }
  }, [group_id, isOwner]);

  const handleLeaveGroup = async () => {
    if (window.confirm("Are you sure you want to leave this group?")) {
      setUpdating(true);
      try {
        const response = await axios.delete(`http://localhost:3001/group_member/leaveGroup`, {
          data: { group_id },
          headers: { 'Authorization': `Bearer ${jwtToken.value}` }
        });
        if (response.status === 200) {
          alert("You have successfully left the group.");
          navigate('/'); // Redirect to homepage or dashboard after leaving
        } else {
          throw new Error('Failed to leave the group');
        }
      } catch (error) {
        setError('Failed to leave the group. ' + error.message);
        console.error(error);
      } finally {
        setUpdating(false);
      }
    }
  };

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
    fetchGroupShowtimes();
  }, [fetchGroupDetails, fetchGroupJoinRequests, fetchGroupMembers, fetchGroupShowtimes]);

  if (!groupDetails) {
    return <div className={styles.groupContainer}><div className="spinner"></div></div>;
  }

  return (
    <div className={styles.groupContainer}>
      {!isOwner && <p className={styles.groupDescription}>Group Member View</p>}
      {isOwner && <p className={styles.groupDescription}>Group Owner View</p>}
      <h1 className={styles.groupHeader}>{groupDetails ? groupDetails.group_name : "Loading..."}</h1>
      <p className={styles.groupDescription}>Description: {groupDetails ? groupDetails.description : "No description available"}</p>

      <div>
        <h2 className={styles.showtimesHeader}>
          Showtimes ({groupShowtimes.length})
          <span className={styles.toggleButtonSpan}>
            <button onClick={toggleShowtimesVisibility} className={`${styles.actionButton} ${styles.toggleVisibilityButton}`}>
              {showShowtimes ? 'Hide' : 'Show'}
            </button>
          </span>
        </h2>
        {showShowtimes && (
          <ul className={styles.showtimesList}>
            {groupShowtimes.length > 0 ? groupShowtimes.map(showtime => (
              <li key={showtime.showtime_id} className={styles.showtimeItem}>
                <span>{showtime.showtime}</span>
                <span>{showtime.theater_name}</span>
                <span>{showtime.movie_title}</span>
                <span>{showtime.username}</span>
              </li>
            )) : <p>No showtimes found.</p>}
          </ul>
        )}
      </div>

      <div>
        <h2 className={styles.membersHeader}>
          Members ({groupMembers.length})
          <span className={styles.toggleButtonSpan}>
            <button onClick={toggleMembersVisibility} className={`${styles.actionButton} ${styles.toggleVisibilityButton}`}>
              {showMembers ? 'Hide' : 'Show'}
            </button>
          </span>
        </h2>
        {showMembers && (
          <ul className={styles.membersList}>
            {groupMembers.length > 0 ? groupMembers.map(member => (
              <li key={member.user_id} className={styles.memberItem}>
                <span>{member.username}</span>
                {isOwner && (
                  <button onClick={() => handleRemoveMember(member.user_id)} className={`${styles.actionButton} ${styles.removeMemberButton}`}>
                    Remove
                  </button>
                )}
              </li>
            )) : <p>No members found.</p>}
          </ul>
        )}
      </div>
      {isOwner && (
        <div>
          <h2 className={styles.requestsHeader}>
            Join Requests ({groupJoinRequests.length})
            <span className={styles.toggleButtonSpan}>
              <button onClick={toggleJoinRequestsVisibility} className={`${styles.actionButton} ${styles.toggleVisibilityButton}`}>
                {showJoinRequests ? 'Hide' : 'Show'}
              </button>
            </span>
          </h2>
          {showJoinRequests && (updating ? <p>Updating...</p> : groupJoinRequests.length > 0 ? (
            <ul className={styles.requestsList}>
              {groupJoinRequests.map(request => (
                <li key={request.request_id} className={styles.requestItem}>
                  <span>{request.username}</span>
                  <button onClick={() => handleAccept(request.request_id, request.user_id)} className={`${styles.actionButton} ${styles.acceptRequestButton}`}>
                    Accept
                  </button>
                  <button onClick={() => handleReject(request.request_id)} className={`${styles.actionButton} ${styles.rejectRequestButton}`}>
                    Reject
                  </button>
                </li>
              ))}
            </ul>
          ) : <p>No join requests.</p>)}
        </div>
      )}
      {!isOwner && <button onClick={handleLeaveGroup} className={`${styles.actionButton} ${styles.leaveGroupButton}`}>Leave Group</button>}
      {isOwner && <button onClick={handleDeleteGroup} className={`${styles.actionButton} ${styles.deleteGroupButton}`}>Delete Group</button>}
    </div>
  );
}

export default GroupView;