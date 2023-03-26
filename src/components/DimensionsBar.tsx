import React from 'react'
import { Paper, Typography, Slider, Grid, Divider } from "@mui/material"

//project imports
import { Config, ConfigTypes } from '../exports/types'
import { paperLabelStyling, generalSpacing } from '../exports/styling'
import configFile from "../config/configBar.json"

interface ConfigBarProps {
    setTableConfig: (config: Config) => void
    tableConfig: Config
}

const ConfigBar = ({ setTableConfig, tableConfig }: ConfigBarProps) => {

    //const [rows, setRows] = React.useState<number>((configFile as ConfigTypes.ConfigBar).defaultRows)// for displaying the number of rows next to the slider
    //const [columns, setColumns] = React.useState<number>((configFile as ConfigTypes.ConfigBar).defaultColumns)// for displaying the number of cloumns next to the slider

    //event handlers
    const handleRowChange = (event: Event, newValue: number | number[]) => {
        setTableConfig({ ...tableConfig, rows: (newValue as number) })
        //setRows(newValue as number)
    }

    const handleColumnChange = (event: Event, newValue: number | number[]) => {
        setTableConfig({ ...tableConfig, columns: (newValue as number) })
        //setColumns(newValue as number)
    }

    //mui styling
    const barStyling = {
        ...generalSpacing,
        backgroundColor: "primary.main",
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
    }

    const sliderStyling = {
        width: "10rem",
        marginLeft: "1rem",
        marginRight: "1rem",
    }

    const sliderLabelStyling = {
        color: "secondary",
        marginLeft: "1rem",
        marginRight: "1rem",
    }

    return (
        <div>
            <Typography variant="h6" sx={paperLabelStyling}>
                Dimensions
            </Typography>
            <Paper elevation={12} variant='elevation' sx={barStyling}>
                <Grid container spacing={2}>
                    <Grid item className='rows-div'>
                        <Typography component="p" sx={sliderLabelStyling}>
                            {tableConfig.rows} {tableConfig.rows !== 1 ? "Rows" : "Row"} {/*change label according to number of rows*/}
                        </Typography>
                        <Slider
                            color="secondary"
                            min={configFile.minRows}
                            max={configFile.maxRows}
                            step={1}
                            defaultValue={1}
                            value={tableConfig.rows}
                            sx={sliderStyling}
                            onChange={handleRowChange}
                        />
                    </Grid>
                    <Grid item className='rows-div'>
                        <Typography component="p" sx={sliderLabelStyling}>
                            {tableConfig.columns} {tableConfig.columns !== 1 ? "Columns" : "Column"}
                        </Typography>
                        <Slider
                            color="secondary"
                            min={configFile.minColumns}
                            max={configFile.maxColumns}
                            step={1}
                            defaultValue={1}
                            value={tableConfig.columns}
                            sx={sliderStyling}
                            onChange={handleColumnChange}
                        />
                        <Divider orientation="vertical" flexItem />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ConfigBar