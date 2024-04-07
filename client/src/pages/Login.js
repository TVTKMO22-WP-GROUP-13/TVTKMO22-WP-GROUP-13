import {useNavigate, Navigate, } from 'react-router-dom'
import './Login.css'
import React, { useState } from 'react'
import axios from 'axios';
import { jwtToken } from '../components/AuSignal'

export default function Login({setAccountName}) {

    
    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [username2, setUsername2] = useState('')
    const [Password2, setPassword2] = useState('')
    const navigate = useNavigate()
    const validate = (e) =>{
        e.preventDefault()
        
       
       axios.post('http://localhost:3001/authentication/login', {username: username, pw: Password})
      
       .then(resp =>{ 
        jwtToken.value = resp.data.jwtToken
        setAccountName({accountName: username})
        console.log(setAccountName)
        navigate("/UserProfile")
    })
       
       .catch(err => console.log(err.message))
    
       console.log(jwtToken)
       
    }
    const accountmake = (e) =>{
        e.preventDefault()
          
       axios.post('http://localhost:3001/authentication/register',
       {username: username2, pw: Password2})
       .catch(err => console.log(err.message))
        
       //navigate("/UserProfile")
    }

  return (
    <div id="Both-Div">
    <div id="Login-Div">
        <form onSubmit={validate}>
            <h2>Login</h2>
            <div> 
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>     
                <input type='password' placeholder="Password" value={Password} onChange={e=> setPassword(e.target.value)} />
            </div>
            <button> Login</button>
        </form>
    </div>
    <div id='Or'>
        Or
    </div>
    <div id="SignIn-Div">
    <form onSubmit={accountmake}>
            <h2>Sign Up</h2>
            <div>
                
                <input placeholder="Username" value={username2} onChange={e => setUsername2(e.target.value)} />
            </div>
            <div>
                
                <input type='password' placeholder="Password"value={Password2} onChange={e=> setPassword2(e.target.value)} />
            </div>
            <button> Sign Up</button>
        </form>
    </div>
    </div>
  )
}
