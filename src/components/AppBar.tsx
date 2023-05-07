import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';

//component imports
import InputSwitcher from './InputSwitcher';

interface InputSwitcherProps {
    inputType: "custom" | "csv",
    setInputType: (inputType: "custom" | "csv") => void
}

const Header = ({ inputType, setInputType }: InputSwitcherProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: "0.5rem" }}>
                <Toolbar>
                    <Typography variant="h4" component="div">
                        Table Generator
                    </Typography>
                    <InputSwitcher inputType={inputType} setInputType={setInputType} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;