import { Card, Paper, Typography } from '@mui/material'
import React from 'react'

//my imports
import { paperLabelStyling, generalSpacing } from '../exports/globalStyling'

interface OutputProps {
    rowArray: string[]
}

const Output = ({ rowArray }: OutputProps) => {

    const paperStyling = {
        ...generalSpacing,
        backgroundColor: "primary.dark",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: 0,
        whiteSpace: "break-spaces"
    }

    const cardStyling = {
        backgroundColor: "primary.dark",
        margin: "1rem"
    }

    return (
        <div>
            <Typography variant="h6" sx={paperLabelStyling} >
                Output
            </Typography>
            <Paper elevation={12} variant='elevation' sx={paperStyling} >
                <Card sx={cardStyling} elevation={0} >
                    {rowArray.map((row, index) => {
                        return (
                            <p>{row}</p>
                        )
                    })}
                </Card>
            </Paper>
        </div>
    )
}

export default Output