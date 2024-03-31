import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, Link } from "@mui/material"

//component imports
import InputSwitcher from './TableGeneration/InputSwitcher';
import { UserData } from '../exports/types';
import { getAPIUrl, hasJWT } from '../utils/utils';

interface NavigationBarProps {
    inputType: 'custom' | 'csv',
    setInputType: (inputType: 'custom' | 'csv') => void,
    user: UserData | undefined,
    setUser: (user: UserData | undefined) => void
}

const Header = ({ inputType, setInputType, user, setUser }: NavigationBarProps) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [alert, setAlert] = React.useState<[string, boolean]>(["", false])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const logout = () => {
        fetch(getAPIUrl("auth") + "logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: user?.token })
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    let error = ""
                    if (data.error instanceof Array) {
                        error = data.error[0]
                    } else {
                        error = data.error
                    }

                    setAlert(["Logout Failed", true])
                })
            } else {
                res.json().then((data) => {
                    localStorage.removeItem("user")
                    setUser(undefined)
                })
            }
        })
    }

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            flexGrow: 0,
                            textDecoration: 'none',
                            marginLeft: "2.5rem"
                        }}
                    >
                        Table Generator
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <InputSwitcher inputType={inputType} setInputType={setInputType} />
                    </Box>
                    {/* ---------------------------switch between mobile and desktop layout */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Table Generator
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 0, marginRight: "2.5rem", marginLeft: "auto" }}>
                        {
                            alert[1] &&
                            <Typography>
                                {alert[0]}
                            </Typography>
                        }
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/*put settings here for user */}
                            {user || hasJWT() ?
                                /*shown is someone is logged in*/ <div>
                                    <Link
                                        href="/user"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <MenuItem
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                    </Link>
                                    <MenuItem
                                        onClick={logout}
                                    >
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </div>
                                :
                                /*shown if noone is logged in*/ <div>
                                    <Link
                                        href="/user/login"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <MenuItem
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">Login</Typography>
                                        </MenuItem>
                                    </Link>
                                    <Link
                                        href="/user/register"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        <MenuItem
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">Register</Typography>
                                        </MenuItem>
                                    </Link>
                                </div>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
