import React from 'react'
import { CaseManager, GroundWorker } from '../index'
import { GroundRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
const ProtectedRoutes = ({role}) => {
  if (role === 1) {
    return (
      <CaseManager />
    )
  }
  if(role === 3){
    return (
      <GroundWorker />
    )
  }
}

export default ProtectedRoutes
