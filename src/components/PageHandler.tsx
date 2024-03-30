import React from 'react'

//component imports
import Header from './NavigationBar'
import CollapsableAlert from './CollapsableAlert'
import { Outlet } from 'react-router-dom'
import { UserData } from '../exports/types'
import Footer from './Footer'

interface PageHandlerProps {
    inputType: "custom" | "csv",
    setInputType: (inputType: "custom" | "csv") => void,
    alertContent: string[],
    alertSeverity: "error" | "warning" | "info" | "success",
    alertOpen: boolean,
    setAlertContent: (alertContent: string[]) => void,
    setAlertSeverity: (alertSeverity: "error" | "warning" | "info" | "success") => void,
    setAlertOpen: (alertOpen: boolean) => void,
    user: UserData | undefined,
    setUser: (user: UserData | undefined) => void
}

const PageHandler = ({
    inputType,
    setInputType,
    alertContent,
    alertSeverity,
    alertOpen,
    setAlertContent,
    setAlertSeverity,
    setAlertOpen,
    user,
    setUser
}: PageHandlerProps) => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header inputType={inputType} setInputType={setInputType} user={user} setUser={setUser} />
            {/*<Alert variant='filled' severity='info' >WIP Alert</Alert>*/}
            {user !== undefined ?
                <div className="main">
                    <CollapsableAlert
                        alertContent={alertContent}
                        alertSeverity={alertSeverity}
                        alertOpen={alertOpen}
                        setAlertContent={setAlertContent}
                        setAlertSeverity={setAlertSeverity}
                        setAlertOpen={setAlertOpen}
                    />
                    <Outlet />
                </div>
                :
                <div>
                    <CollapsableAlert
                        alertContent={alertContent}
                        alertSeverity={alertSeverity}
                        alertOpen={alertOpen}
                        setAlertContent={setAlertContent}
                        setAlertSeverity={setAlertSeverity}
                        setAlertOpen={setAlertOpen}
                    />
                    <Outlet />
                </div>
            }
        </div>
    )
}

export default PageHandler