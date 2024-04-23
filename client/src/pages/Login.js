import { useNavigate, } from 'react-router-dom'
import './Login.css'
import React, { useState } from 'react'
import axios from 'axios';
import { jwtToken } from '../components/AuSignal'

export default function Login({ setAccountName, setPassu }) {


    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [username2, setUsername2] = useState('')
    const [Password2, setPassword2] = useState('')
    const [regiStatus, setRegiStatus] = useState(null); // rekistöröitmys tila alussa null
    const [regiError, setRegiError] = useState('');

    const navigate = useNavigate()
    const validate = (e) => {
        e.preventDefault()


        axios.post('http://localhost:3001/authentication/login', { username: username, pw: Password })

            .then(resp => {
                jwtToken.value = resp.data.jwtToken

                console.log("salasana on", Password)
                setAccountName({ accountName: username })

                navigate("/UserProfile")
                setPassu({ passu: Password })
            })


            .catch(err => console.log(err.message))


    }

    const accountmake = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/authentication/register', { username: username2, pw: Password2 })
            .then(() => {
                setRegiStatus(true); // onnistui
                setRegiError(''); // Tyhjennä mahdolliset aiemmat virheilmoitukset
                // Suorita kirjautuminen rekisteröinnin jälkeen
                axios.post('http://localhost:3001/authentication/login', { username: username2, pw: Password2 })
                    .then(resp => {
                        jwtToken.value = resp.data.jwtToken;
                        setAccountName({ accountName: username2 });
                        navigate("/UserProfile");
                        setPassu({ passu: Password2 });
                    })
                    .catch(err => {
                        console.log(err.message);
                        setRegiError('Login after registration failed.');
                    });
            })
            .catch(err => {
                setRegiStatus(false); // Epäonnistui
                if (err.response && err.response.data.error) {
                    setRegiError(err.response.data.error); // Täsmällisempi virheviesti back-endiltä
                } else {
                    setRegiError('Registration failed due to an internal error');
                }
            });
    };

    return (
        <div id="Both-Div">
            <div id="Login-Div">
                <form onSubmit={validate}>
                    <h2>Login</h2>
                    <div>
                        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input type='password' placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button> Login</button>
                </form>
            </div>
            <div id='Or'>
                {regiStatus === false && <p>{regiError}</p>}
                {regiStatus === true && <p>Registration successful!</p>}
            </div>
            <div id="SignIn-Div">
                <form onSubmit={accountmake}>
                    <h2>Sign Up</h2>
                    <div>

                        <input placeholder="Username" value={username2} onChange={e => setUsername2(e.target.value)} />
                    </div>
                    <div>

                        <input type='password' placeholder="Password" value={Password2} onChange={e => setPassword2(e.target.value)} />
                    </div>
                    <button> Sign Up</button>
                </form>

            </div>
        </div>
    )
}
