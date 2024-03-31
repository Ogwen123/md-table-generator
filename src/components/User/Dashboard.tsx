import React from 'react'

//component imports
import { AlertSeverity, UserData } from '../../exports/types'
import SavedTableViewer from './Dashboard/SavedTableViewer'
import { Box, Grid, Typography } from '@mui/material'
import { generalSpacing } from '../../exports/styling'

interface DashboardProps {
    user: UserData | undefined,
    setUser: (user: UserData) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void,
    setTableConfig: (config: any) => void,
}

const subParentStyling = {
    flex: 1,
    minWidth: "300px",
    marginRight: "4rem",
    marginTop: "1rem",
    marginBottom: "3rem",
}

const subSubParentStyling = {
    flex: 1,
    borderRadius: "5px",
    padding: "1rem"
}

const Dashboard = ({ user, setUser, doAlert, setTableConfig }: DashboardProps) => {
    return (
        <div style={{ minHeight: "85vh" }}>
            <Typography sx={{ ...generalSpacing, marginTop: "3rem" }} variant="h5" >
                Welcome, {user?.name !== undefined ? user?.name : "User"}
            </Typography>


            <Box sx={{ ...generalSpacing }}>
                <Typography variant='h6'>Saved Tables</Typography>
                <Box sx={{ ...subSubParentStyling, backgroundColor: "primary.main", marginTop: "0.5rem", height: "100%" }}>
                    <SavedTableViewer doAlert={doAlert} user={user} setTableConfig={setTableConfig} />
                </Box>
            </Box>

        </div >
    )
}

export default Dashboard