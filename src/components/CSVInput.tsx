import React from 'react'
import { Typography, Paper } from '@mui/material'

//project imports
import { generalSpacing, paperLabelStyling } from '../exports/styling'

const CSVInput = () => {
    const barStyling = {
        ...generalSpacing,
        backgroundColor: "primary.main",
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
    }

    return (
        <div>
            <Typography variant="h6" sx={paperLabelStyling} >
                CSV Input
            </Typography>
            <Paper elevation={12} variant='elevation' sx={barStyling} >

            </Paper>
        </div>
    )
}

export default CSVInput