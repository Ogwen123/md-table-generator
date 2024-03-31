import React from 'react'
import { Route, Routes } from 'react-router-dom'

//component imports
import Home from './components/Home'
import PageHandler from './components/PageHandler'
import Login from './components/User/Login'

//my imports
import configFile from "./config/table.json"
import { Config, AlertSeverity, UserData } from './exports/types'
import { generateCustomTable } from './utils/generateCustomTable'
import { generateDelimitedTable } from './utils/generateDelimitedTable'
import Dashboard from './components/User/Dashboard'
import Register from './components/User/Register'
import RouteGuard from './components/RouteGuard'
import NotFound from './components/Error/NotFound'
import { getAPIUrl, hasJWT } from './utils/utils'


let initContentStorage: Record<string, string> = { "0-0": "", "1-0": "" };

export const defaultConfigState = {
    rows: configFile.defaultRows + 1,
    columns: configFile.defaultColumns,
    content: initContentStorage
}

function App() {

    const [tableConfig, setTableConfig] = React.useState<Config>(defaultConfigState)
    const [tableOutput, setTableOutput] = React.useState<string>("Your output will appear here")
    const [showContentEditor, setShowContentEditor] = React.useState<boolean>(true)
    const [inputType, setInputType] = React.useState<"custom" | "csv">("custom")
    const [resetTrigger, setResetTrigger] = React.useState<boolean>(false)

    //custom specific
    const [dimensionTracker, setDimensionTracker] = React.useState<number[]>([2, 1])//used to force a re-render when dimensions are changed

    //csv specific
    const [delimiter, setDelimiter] = React.useState<string>(",")
    const [csvInputContent, setCsvInputContent] = React.useState<string>("")

    //alert handling
    const [alertContent, setAlertContent] = React.useState<string[]>(["Uh Oh", "You should never see this"])//title, message
    const [alertSeverity, setAlertSeverity] = React.useState<AlertSeverity>("info")
    const [alertOpen, setAlertOpen] = React.useState<boolean>(false)

    //account storage
    const [user, setUser] = React.useState<UserData | undefined>()

    //update content object when more rows or columns are added
    React.useEffect(() => {
        let newContentStorage: Record<string, string> = {}
        for (let row = 0; row < tableConfig.rows; row++) {
            for (let column = 0; column < tableConfig.columns; column++) {
                newContentStorage[`${row}-${column}`] = tableConfig.content[`${row}-${column}`] || ""
            }
        }
        setTableConfig({ ...tableConfig, content: newContentStorage })
    }, [dimensionTracker])

    React.useEffect(() => {
        if (inputType === "custom") handleCustomGenerate()
        else if (inputType === "csv") handleCSVGenerate()
    }, [])


    React.useEffect(() => {//set user data from local storage on first render
        if (!localStorage.getItem("user")) return

        const storedUser = JSON.parse(localStorage.getItem("user")!)
        const token = storedUser.token

        if (token)
            setUser({ token: token, name: storedUser.name })
        fetch(getAPIUrl("auth") + "verify-token", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")!).token
            }
        }).then((res) => {
            if (!res.ok) {
                setUser({ token: token })
            } else {
                res.json().then((data) => {
                    setUser({ token: token, ...data.data })
                })
            }
        })
    }, [])



    const handleCustomGenerate = (customConfig?: Config) => {
        const tableOutput = generateCustomTable(customConfig || tableConfig)
        setTableOutput(tableOutput)// if no custom config is passed, use the current config
        //console.log(tableConfig)
    }

    const handleCSVGenerate = () => {
        const tableOutput = generateDelimitedTable(csvInputContent, delimiter, doAlert)
        if (tableOutput instanceof Array) {
            setTableOutput(tableOutput[1])
        } else {
            setTableOutput(tableOutput as string)
        }
    }

    const doAlert = (content: string[], severity: AlertSeverity) => {
        if (content.length !== 2) return
        setAlertContent(content)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    const homeProps = {
        inputType,
        tableConfig,
        setTableConfig,
        setDimensionTracker,
        tableOutput,
        setTableOutput,
        csvInputContent,
        setCsvInputContent,
        delimiter,
        setDelimiter,
        doAlert,
        showContentEditor,
        setShowContentEditor,
        handleCustomGenerate,
        handleCSVGenerate,
        resetTrigger,
        setResetTrigger,
        user
    }

    const pageHandlerProps = {
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
    }

    const loginProps = {
        user,
        setUser,
        doAlert
    }

    const registerProps = {
        doAlert
    }

    const dashboardProps = {
        ...loginProps,
        setTableConfig
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<PageHandler {...pageHandlerProps} />}>
                    <Route index element={<Home {...homeProps} />} />
                    <Route path="/user">
                        <Route index element={<RouteGuard user={user} element={<Dashboard {...dashboardProps} />} />} />
                        <Route path="/user/login" element={<Login {...loginProps} />} />
                        <Route path="/user/register" element={<Register {...registerProps} />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>

        </div>
    )
}

export default App
