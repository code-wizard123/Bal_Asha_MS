import React from 'react'
import { CaseManager, GroundWorker } from '../index'

const ProtectedRoutes = (role) => {
  if(role === 1){
    return (
        <CaseManager />
    )
  }
  
  if(role === 2){
    return (
        <>Operation Manager</>
    )
  }

  if(role === 3){
    return (
        <GroundWorker />
    )
  }
}

export default ProtectedRoutes
