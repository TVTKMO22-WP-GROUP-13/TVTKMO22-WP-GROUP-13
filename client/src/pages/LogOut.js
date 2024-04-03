import React from 'react'

export default function LogOut({setUser}) {
    setUser(null)
  return (
    <p>Logged Out</p>
  )
}
