import { Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "80vh" }}>
            <Typography variant='h1' style={{ display: "flex", justifyContent: "center" }} >
                404 - Not Found
            </Typography>
        </div>
    )
}

export default NotFound