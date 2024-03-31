import { Typography } from '@mui/material'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//project imports
import { paperLabelStyling, generalSpacing } from '../../exports/styling'

interface OutputProps {
    tableOutput: string
}

const Output = ({ tableOutput }: OutputProps) => {

    const paperStyling = {
        ...generalSpacing,
        backgroundColor: "primary.dark",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        lineHeight: 0,
    }

    const divStyling = {
        ...generalSpacing,
        minHeight: "100px",
        backgroundColor: "#212121",
        width: "calc(100% - 8rem)",
        padding: "1rem",
        whiteSpace: "break-spaces" as any, // have to do this or the style={divStyling} part errors
        borderRadius: "4px",
        boxShadow: "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)"
    }

    return (
        <div>
            <Typography variant="h6" sx={{ ...paperLabelStyling, display: "flex", flexDirection: "row", alignItems: "center" }} >
                Output
                <ContentCopyIcon sx={{
                    marginLeft: "1rem", "&:hover": {
                        color: "primary.main"
                    }
                }}
                    onClick={() => {
                        window.navigator.clipboard.writeText(tableOutput)
                        alert("Table copied to your clipboard!")
                    }}
                />
            </Typography>
            <div style={divStyling} className='mono'>
                {tableOutput}
            </div>
        </div>
    )
}

export default Output