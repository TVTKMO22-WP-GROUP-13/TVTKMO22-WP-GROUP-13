import React from 'react'
import { logout } from '../components/AuSignal';


export default function LogOut() {
  logout()
 
  return (
    <p>Logged Out </p>
    
  )
}
