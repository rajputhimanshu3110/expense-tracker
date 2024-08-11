import { Box } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import UserService from '../service/Requests/UserService';
import SessionService from '../service/SessionService';

const ChangePassword = () => {
    const [formData, setFormData] = useState({ pass: '', rpass: '' });
    const [user, setUser] = useState(SessionService.get.loggedInUser);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alert, setAlert] = useState({ type: "success", msg: "b" });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertOpen(false);
    };
    const updatePassword = () => {
        if (formData.pass && formData.rpass) {
            if (formData.pass == formData.rpass) {
                UserService.changePassword({ user: user.id, password: formData.pass }, (res) => {
                    if(res.success){
                        SessionService.set.header(res.token)
                        setAlertOpen(true);
                        setAlert({type:'success',msg:res.message})
                        setFormData({pass:'',rpass:''})
                    }else{
                        setAlertOpen(true);
                        setAlert({ type: 'error', msg: "Server Error" })
                    }
                    
                })
            }
        }
    }

    return (
        <>

            <Snackbar
                open={alertOpen}
                autoHideDuration={4000}
                onClose={handleAlertClose}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={alert.type}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {alert.msg}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                }}
            >
                <TextField
                    label="New Password"
                    variant="standard"
                    value={formData.pass}
                    name="pass"
                    onChange={handleFormChange}
                    sx={{
                        m: 1,
                        minWidth: 233,
                    }}
                />
                <TextField
                    label="Re-enter New Password"
                    variant="standard"
                    value={formData.rpass}
                    name="rpass"
                    type='password'
                    onChange={handleFormChange}
                    sx={{
                        m: 1,
                        minWidth: 233,
                    }}
                />
                <br />

                <Button variant='outlined' sx={{ mt: 4, minWidth: '120' }} onClick={updatePassword}>
                    Submit
                </Button>
            </Box>
        </>
    )
}

export default ChangePassword
