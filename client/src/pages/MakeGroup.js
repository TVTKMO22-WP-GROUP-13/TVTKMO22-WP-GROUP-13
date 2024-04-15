import React, {useState} from 'react';
import './MakeGroup.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import { jwtToken } from '../components/AuSignal';
import { useSignals } from '@preact/signals-react/runtime';




export default function MakeGroup() {
  const [groupN, setGroupName] = useState('')
  const [groupD, setGroupDes] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)


  //if not logged in / no token -> throws to login page
  useSignals();
    if(jwtToken.value.length === 0){
      
      return <Navigate to='/login' />
    }

    const GroupMake = (e) => {
      e.preventDefault()

      const GroupData = {
        group_name: groupN,
        description: groupD
      }
  
      axios.post('http://localhost:3001/user_group/createGroup', GroupData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      })
      .then(response => {
        //alert(`Good job G! Group "${groupN}" created successfully!`)
        //console.log('Good job G! Group "${groupN}" created successfully!')
        setIsSuccess(true)
        setGroupName('')
        setGroupDes('')
      })
      .catch(error => {
        //console.error('Sucks to be u: ', error)
        alert('Group creation failed')
      })
    }
  
  return (
    <div className="everything-wrapper">
      <h1 className="GTitle">Create Group</h1>

      <form onSubmit={GroupMake} className="formii">
        <div className="input-wrapperii">
          <label>Group name:</label>
          <input
            id="groupName"
            name="inputGROUPS"
            placeholder=""
            value={groupN}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="input-wrapperii">
          <label>Group description:</label>
          <input
            id="groupDescription"
            name="inputGROUPS"
            placeholder=""
            value={groupD}
            onChange={(e) => setGroupDes(e.target.value)}
          />
        </div>
        <button className="create-button">Create</button>
      </form>
      {isSuccess && ( // Conditionally render success message if isSuccess is true
        <div className="CreationSuccess">
          <h2>Group creation success!</h2>
        </div>
      )}
    </div>
  );
}