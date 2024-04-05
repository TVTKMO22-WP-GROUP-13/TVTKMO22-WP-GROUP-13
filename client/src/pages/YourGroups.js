import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { jwtToken } from '../components/AuSignal';

export default function YourGroups() {
  useSignals()
  if(jwtToken.value.length === 0){
    
    return <Navigate to='/login' />
  }
  return (
    <p>Tänne tulee käyttäjän grouppisivut</p>
  )
}
