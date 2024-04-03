import {useNavigate} from 'react-router-dom'
import './Login.css'
import React, { useState } from 'react'

export default function Login({setUser}) {

    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate()
    const validate = (e) =>{
        e.preventDefault()
        if(username === 'Admin' && Password ==='Admin'){
            setUser({user: username,password: Password})
            navigate("/UserProfile")
        }
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
    <form onSubmit={''}>
            <h2>Sign Up</h2>
            <div>
                
                <input placeholder="Username" />
            </div>
            <div>
                
                <input type='password' placeholder="Password" />
            </div>
            <button> Sign Up</button>
        </form>
    </div>
    </div>
  )
}
