import React from 'react'
import { Button, Alert, Collapse, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"

//project imports
import { AlertSeverity } from '../exports/types'
import generalConfig from '../config/general.json'
import { generalSpacing } from '../exports/styling'

interface AlertProps {
  alertContent: string[],
  alertSeverity: AlertSeverity,
  alertOpen: boolean,
  setAlertContent: (alertContent: string[]) => void,
  setAlertSeverity: (alertSeverity: AlertSeverity) => void,
  setAlertOpen: (alertOpen: boolean) => void,
}

const CollapsableAlert = ({ alertContent, alertSeverity, alertOpen, setAlertContent, setAlertSeverity, setAlertOpen }: AlertProps) => {
  return (
    <Collapse
      in={alertOpen}
      addEndListener={() => setTimeout(() => {
        setAlertOpen(false)
      }, generalConfig.alertDuration)
      }
    >
      <Alert
        variant="filled"
        severity={alertSeverity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlertOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={generalSpacing}

      >
        <AlertTitle>{alertContent[0]}</AlertTitle>
        {alertContent[1]}
      </Alert>
    </Collapse>
  )
}

export default CollapsableAlert