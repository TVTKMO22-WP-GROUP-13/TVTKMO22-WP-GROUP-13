import './Login.css'
import React from 'react'

export default function Login() {
  return (
    <div id="Both-Div">
    <div id="Login-Div">
        <form>
            <h2>Login</h2>
            <div>
                
                <input placeholder="Username" />
            </div>
            <div>
                
                <input type='password' placeholder="Password" />
            </div>
            <button> Login</button>
        </form>
    </div>
    <div id='Or'>
        Or
    </div>
    <div id="SignIn-Div">
    <form>
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
