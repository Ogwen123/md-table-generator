import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { FormEvent } from 'react'
import { Navigate } from 'react-router-dom';
import { getAPIUrl } from '../../utils/utils'
import { AlertSeverity } from '../../exports/types'

interface RegisterProps {
    doAlert: (content: string[], severity: AlertSeverity) => void
}

const Register = ({ doAlert }: RegisterProps) => {

    const [name, setName] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [doneRegistration, setDoneRegistration] = React.useState<boolean>(false);

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()


        const payload = {
            name,
            username,
            password,
            email
        }

        fetch(getAPIUrl("auth") + "register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    let error = ""
                    if (data.error instanceof Array) {
                        error = data.error[0]
                    } else {
                        error = data.error
                    }

                    doAlert(["Registration Fail", error], "error")
                })
            } else {
                res.json().then((data) => {
                    doAlert(["Registration Success", data.message], "success")
                    setTimeout(() => {
                        setDoneRegistration(true)
                    }, 500)
                })
            }
        })
    }

    const inputStyling = {
        input: {
            color: "white"
        }
    }

    if (doneRegistration) {
        return (<Navigate to="/user" />)
    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}

            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                label="Name"
                                autoFocus
                                sx={inputStyling}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                sx={inputStyling}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                sx={inputStyling}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                sx={inputStyling}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}


export default Register