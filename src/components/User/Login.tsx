import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, { FormEvent } from 'react'
import { getAPIUrl, hasJWT } from '../../utils/utils';
import { Navigate } from 'react-router-dom';
import { AlertSeverity, UserData } from '../../exports/types';

interface LoginProps {
    user: UserData | undefined,
    setUser: (user: UserData) => void,
    doAlert: (content: string[], severity: AlertSeverity) => void
}

const Login = ({ user, setUser, doAlert }: LoginProps) => {

    const [identifier, setIdentifier] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [persistUser, setPersistUser] = React.useState<boolean>(false);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
        //make sure email is valid

        const payload = {
            identifier,
            password,
            sendData: true
        }

        fetch(getAPIUrl("auth") + "login", {
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

                    doAlert(["Login Fail", error], "error")
                })
            } else {
                res.json().then((data) => {
                    doAlert(["Login Success", data.message], "success")
                    setTimeout(() => {
                        if (persistUser) {
                            localStorage.setItem("user", JSON.stringify(data.data))
                        }
                        setUser(data.data)
                    }, 500)
                })
            }
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
                        label="Username or Email Address"
                        name="email"
                        autoFocus
                        sx={inputStyling}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
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