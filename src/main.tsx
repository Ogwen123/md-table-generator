import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CssBaseline } from "@mui/material"
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { grey, teal, purple } from '@mui/material/colors'

import font from "./assets/RobotoMono-Regular.ttf"

const theme = createTheme({
    palette: {
        primary: {
            main: teal[800],
            dark: grey[900]
        },
        secondary: {
            main: grey[300],
            light: purple[500]
        },
        background: {
            default: grey[800],
        }
    },
    typography: {
        fontFamily: "Mono Font",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "@font-face": {
                    fontFamily: "Mono Font",
                    src: `url(${font})`
                }
            }
        }
    }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>
)
