import { Card, Paper, Typography } from '@mui/material'
import React from 'react'

//project imports
import { paperLabelStyling, generalSpacing } from '../exports/styling'

interface OutputProps {
    rowArray: string[]
}

const Output = ({ rowArray }: OutputProps) => {

    const paperStyling = {
        ...generalSpacing,
        backgroundColor: "primary.dark",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: 0,
        whiteSpace: "break-spaces"
    }

    const divStyling = {
        backgroundColor: "primary.dark",
        margin: "1rem",
        overflow: "auto"
    }

    return (
        <div>
            <Typography variant="h6" sx={paperLabelStyling} >
                Output
            </Typography>
            <Paper elevation={12} variant='elevation' sx={paperStyling} >
                <div style={divStyling}>
                    {
                        rowArray.map((row, index) => {
                            return (
                                <pre key={index}>{row}{/*<pre> stops html formatting the whitespace in the overflow*/}</pre>
                            )
                        })
                    }
                </div>
            </Paper>
        </div>
    )
}

export default Output