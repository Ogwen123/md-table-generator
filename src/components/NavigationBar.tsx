import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ padding: "0.5rem" }}>
                <Toolbar>
                    <Typography variant="h4" component="div">
                        Table Generator
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}