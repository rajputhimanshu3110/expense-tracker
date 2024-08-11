import React, {useState} from 'react'
import { Snackbar, Alert } from '@mui/material';

const AlertBox = (props) => {
    const [alertOpen, setAlertOpen] = useState(props.open);

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertOpen(false);
    };
  return (
    <>
          <Snackbar
              open={alertOpen}
              autoHideDuration={4000}
              onClose={handleAlertClose}
          >
              <Alert
                  onClose={handleAlertClose}
                  severity={props.type}
                  variant="filled"
                  sx={{ width: "100%" }}
              >
                  {props.msg}
              </Alert>
          </Snackbar>
    </>
  )
}

export default AlertBox
