import { Link, Navigate } from 'react-router-dom'
import React from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { jwtToken } from '../components/AuSignal';

export default function YourReviews() {
  useSignals()
  if(jwtToken.value.length === 0){
    
    return <Navigate to='/login' />
  }
  return (
    <div>Käyttäjän kaikki revit tänne</div>
  )
}
