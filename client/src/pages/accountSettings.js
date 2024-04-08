import {useNavigate, } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { jwtToken } from '../components/AuSignal'
import { logout } from '../components/AuSignal'

export default function AccountSettings({accountName, passu, setAccountName}) {
  const navigate = useNavigate()
  const username = accountName.accountName
  const password = passu.passu

  const deleteAccount = (e) =>{

    e.preventDefault()
    const confirmDel = window.confirm("Are you sure you want to delete your account?")
    if (confirmDel){
    axios.delete('http://localhost:3001/authentication/delete', {
      headers:{ authorization: `bearer ${jwtToken}`
    }, data: {username: username, pw: password}
    

  })
  .then(resp => {
    // vastaus
    alert(resp.data.message);
    logout()
    navigate("/login");
    setAccountName({})
    
    
})
.catch(err => console.log(err.message));
    }
}

  return (
    


    <div>
    <p> acccount settings</p>
    <button onClick={(e) => {deleteAccount(e); }}>Delete account</button>
        </div>
  )
}
