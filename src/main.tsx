import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CssBaseline } from "@mui/material"
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { grey, teal, purple } from '@mui/material/colors'

import font from "./assets/RobotoMono-Regular.ttf"
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
    palette: {
        primary: {
            main: teal[600],
            dark: grey[900]
        },
        secondary: {
            main: grey[300],
            light: purple[500]
        },
        background: {
            default: grey[800],
        },
        text: {
            primary: "#fff"
        }
    },
    typography: {
        fontFamily: "Mono Font",
        allVariants: {
            color: "white"
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": {
                    fontFamily: "Mono Font",
                    src: `url(${font})`
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[900],
                    color: "white"
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: grey[900],
                    color: "white"
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    "& h6": {
                        color: "white"
                    }
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    color: "white",
                    "& p": {
                        color: "white"
                    }
                }
            }
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
)
