import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


export default function Alert({ open, onClose }) {
    // const [open, setOpen] = React.useState(true);

    const navigate = useNavigate();




    const handleLogoutConfirm = () => {
        onClose()
        document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        navigate('/');
    };

    return (
        <>

            <Dialog
                fullWidth={true}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are You Sure You Want To Logout ?"}</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description">
                        
                    </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={onClose}>Disagree</Button>
                    <Button onClick={handleLogoutConfirm}>Agree</Button> */}
                    <CustomButton type='button' value='Yes' receiveAction={handleLogoutConfirm} padding='10px 10px' height='47' />
                    <CustomButton type='button' value='No'  receiveAction={onClose} padding='10px 10px' height='47' />
                </DialogActions>
            </Dialog>

        </>
    )
}
