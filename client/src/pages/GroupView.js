import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtToken } from '../components/AuSignal';

function GroupView() {
  const { group_id } = useParams();
  console.log(group_id);
  const [groupDetails, setGroupDetails] = useState(null);
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

    fetchGroupDetails();
  }, [group_id]);

  if (!groupDetails) {
    return <p>{error || "Loading..."}</p>;
  }

  return (
    <div className="group-details">
      <h1>{groupDetails.group_name}</h1>
      <p>Description: {groupDetails.description}</p>
    </div>
  );
}

export default GroupView;