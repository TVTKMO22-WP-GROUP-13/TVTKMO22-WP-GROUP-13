import { Link, Navigate } from 'react-router-dom'
import React from 'react'

export default function YourGroups({user}) {
  if (user === null){
    return <Navigate to='/login' />
  }
  return (
    <p>Tänne tulee käyttäjän grouppisivut</p>
  )
}
