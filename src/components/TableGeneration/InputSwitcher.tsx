import React from 'react'
import { FormControl, Typography, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'

interface InputSwitcherProps {
    inputType: "custom" | "csv",
    setInputType: (inputType: "custom" | "csv") => void
}

const InputSwitcher = ({ inputType, setInputType }: InputSwitcherProps) => {

    const radioButtonStyling = {
        color: "white",
        '&.Mui-checked': {
            color: "white",
        },
    }

    const divStyling = {
        display: { xs: "none", md: "flex" },
        flexDirection: "row" as "row",
        marginLeft: "2rem",
        border: "1px solid white",
        borderRadius: "5px",
        padding: "0.5rem"
    }

    return (
        <div>
            {window.location.pathname === "/" ?
                <Box sx={divStyling}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>Input Type</Typography>
                    <FormControl color='secondary' sx={{ marginLeft: "1rem" }}>
                        <RadioGroup
                            row
                            aria-labelledby="input-switcher-radio-buttons"
                            name="row-radio-buttons-group"
                            defaultValue="custom"
                            value={inputType}
                            onChange={(event) => setInputType(event.target.value as "custom" | "csv")}
                        >
                            <FormControlLabel color='secondary' value="custom" control={<Radio sx={radioButtonStyling} />} label="Custom" />
                            <FormControlLabel color='secondary' value="csv" control={<Radio sx={radioButtonStyling} />} label="CSV" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                : <div></div>
            }
        </div>
    );
}

export default InputSwitcher