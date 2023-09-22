import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, { FormEvent } from 'react'
import { getAPIUrl, hasJWT, validateEmail, validatePassword } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AlertSeverity, UserData } from '../../exports/types';

interface LoginProps {
    user: UserData | undefined,
    setUser: (user: UserData) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void
}

const Login = ({ user, setUser, doAlert: showAlert }: LoginProps) => {

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [persistUser, setPersistUser] = React.useState<boolean>(false);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        //make sure email is valid
        if (!validateEmail(email)) {
            showAlert(["Login Details", "Please enter a valid email."], "error")
            return
        }
        if (!validatePassword(password)) {
            showAlert(["Login Details", "Please enter a valid password."], "error")
            return
        }
        const payload = {
            email: email,
            password: password
        }

        //console.log(persistUser)

        axios//ik axios is digusting but it made it slightly easier so i used it
            .post(getAPIUrl("auth") + "auth", payload)
            .then((response) => {
                //format user data
                const userData: UserData = {
                    ...response.data.user,
                    token: response.data.token
                }
                if (persistUser) localStorage.setItem("user", JSON.stringify(userData))
                setUser(userData)
                //window.location.href = "/user"
            }).catch((err) => {
                console.log(err)
            })
    }

    if (hasJWT() || user) {
        return (<Navigate to="/user" />)
    }

    const inputStyling = {
        input: {
            color: "white"
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                maxWidth="xs"
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={(e) => handleLogin(e)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={inputStyling}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={inputStyling}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            value={persistUser}
                            onChange={(e) => setPersistUser(e.target.checked)}
                            sx={{
                                color: "white",
                                '&.Mui-checked': {
                                    color: "primary.main",
                                },
                            }} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        {/*}
                        <Grid item xs>
                            <Link href="#" sx={{}}>
                                Forgot password?
                            </Link>
                        </Grid>
                        */}
                        <Grid item>
                            <Typography variant="body2" sx={{ color: "white" }}>
                                {"Don't have an account? "}
                                <Link href="/user/register" sx={{ color: "white", textDecorationColor: "white" }}>
                                    Sign up
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login