import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { FormEvent } from 'react'
import { Navigate } from 'react-router-dom';
import { getAPIUrl, validateEmail, validatePassword } from '../../utils/utils'
import { AlertSeverity } from '../../exports/types'
import axios from 'axios'

interface RegisterProps {
    doAlert: (content: string[], severity: AlertSeverity) => void
}

const Register = ({ doAlert }: RegisterProps) => {

    const [firstname, setFirstname] = React.useState<string>("");
    const [lastname, setLastname] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [doneRegistration, setDoneRegistration] = React.useState<boolean>(false);

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            doAlert(["Registration Details", "Please enter a valid email."], "error")
            return
        }
        if (!validatePassword(password)) {
            doAlert(["Registration Details", "Please enter a valid password."], "error")
            return
        }
        if (!firstname) {
            doAlert(["Registration Details", "Please enter a first name."], "error")
            return
        }
        if (!lastname) {
            doAlert(["Registration Details", "Please enter a last name."], "error")
            return
        }

        const payload = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        axios
            .post(getAPIUrl("auth") + "register", payload)
            .then((response) => {
                if (response.status === 204) {
                    doAlert(["Registration Details", "Registration successful!"], "success")
                    setDoneRegistration(true)
                    return
                } else {
                    doAlert(["Registration Details", response.data.code + " - " + response.data.message], "error")
                    return
                }
            }).catch((err) => {
                if (!err.response) {
                    doAlert(["Registration Error", "An unknown error occured."], "error")
                    return
                }
                doAlert(["Registration Details", err.response.data.code + " - " + err.response.data.message], "error")
                return
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                sx={inputStyling}
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                autoComplete="family-name"
                                sx={inputStyling}
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
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