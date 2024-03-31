import React, { Component, ReactElement } from 'react'
import { Navigate } from "react-router-dom"
import { hasJWT } from '../utils/utils'
import { UserData } from '../exports/types'

interface RouteGuardProps {
    element: ReactElement,
    user: UserData | undefined
}

const RouteGuard = ({ element, user }: RouteGuardProps) => {
    if (user) {
        return (element)
    } else {
        return (<Navigate to="/user/login" />)
    }
}

export default RouteGuard