import React from 'react'

//component imports
import { AlertSeverity, UserData } from '../../exports/types'
import SavedTableViewer from './Dashboard/SavedTableViewer'
import { Box, Grid, Typography } from '@mui/material'
import { generalSpacing } from '../../exports/styling'
import { formatName } from '../../utils/utils'
import Preferences from './Dashboard/Preferences'

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
                Welcome, {user?.firstname !== undefined && user?.lastname ? formatName(user?.firstname!, user?.lastname!) : ""}
            </Typography>

            <Grid container style={{ display: "flex", flexDirection: "row", minHeight: "80vh", marginBottom: "1rem" }}>

                <Grid item sx={{ ...generalSpacing, ...subParentStyling, borderRadius: "5px", marginRight: 0 }}>
                    <Typography variant='h6'>Saved Tables</Typography>
                    <Box sx={{ ...subSubParentStyling, backgroundColor: "primary.main", marginTop: "0.5rem", height: "100%" }}>
                        <SavedTableViewer doAlert={doAlert} user={user} setTableConfig={setTableConfig} />
                    </Box>
                </Grid>

                <Grid item sx={{ ...generalSpacing, ...subParentStyling, display: "flex", flexDirection: "column", maxHeight: "1000px" }}>

                    <div style={{ ...subSubParentStyling, marginBottom: "1rem", paddingTop: 0 }}>
                        <Typography variant='h6'>Change Preferences</Typography>
                        <Box sx={{ ...subSubParentStyling, backgroundColor: "primary.main", marginTop: "0.5rem", height: "100%" }}>
                            <Preferences />
                        </Box>
                    </div>

                    <div style={{ ...subSubParentStyling, paddingBottom: 0 }}>
                        <Typography variant='h6'>Manage Your Account</Typography>
                        <Box sx={{ ...subSubParentStyling, backgroundColor: "primary.main", marginTop: "0.5rem", height: "100%" }}>
                            idk
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}

export default Dashboard