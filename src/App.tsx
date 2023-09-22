import React from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

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
import { hasJWT } from './utils/utils'
import Footer from './components/Footer'


let initContentStorage: Record<string, string> = { "0-0": "", "1-0": "" };

export const defaultConfigState = {
    rows: configFile.defaultRows + 1,
    columns: configFile.defaultColumns,
    content: initContentStorage
}

function App() {


    const [tableConfig, setTableConfig] = React.useState<Config>(defaultConfigState)
    const [rowArray, setRowArray] = React.useState<string[]>([])
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
    const [user, setUser] = React.useState<UserData>()

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

    const handleCustomGenerate = (customConfig?: Config) => {
        const rowArray = generateCustomTable(customConfig || tableConfig)
        if (rowArray[1] === false) setRowArray([rowArray[0]])
        else setRowArray(rowArray)// if no custom config is passed, use the current config
        //console.log(tableConfig)
    }

    const handleCSVGenerate = () => {
        const rowArray = generateDelimitedTable(csvInputContent, delimiter, doAlert)
        if (rowArray[1] === false) setRowArray([rowArray[0]])
        else setRowArray(rowArray)
    }

    const doAlert = (content: string[], severity: AlertSeverity) => {
        if (content.length !== 2) return
        setAlertContent(content)
        setAlertSeverity(severity)
        setAlertOpen(true)
    }

    React.useEffect(() => {
        if (inputType === "custom") handleCustomGenerate()
        else if (inputType === "csv") handleCSVGenerate()
    }, [])

    React.useEffect(() => {//set user data from local storage on first render
        if (!localStorage.getItem("user")) return
        setUser(JSON.parse(localStorage.getItem("user")!))
    }, [])

    //axios defaults
    if (user || hasJWT()) {
        axios.defaults.headers.post["token"] = user?.token
        axios.defaults.headers.get["token"] = user?.token
    }

    const homeProps = {
        inputType,
        tableConfig,
        setTableConfig,
        setDimensionTracker,
        rowArray,
        setRowArray,
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
        setResetTrigger
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
