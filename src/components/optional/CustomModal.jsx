import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

// import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useEffect } from 'react';
import DataTable from './DataTable';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%) !important',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '700px',
  height: '450px'
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


export default function CustomModal({ Open, handleClose, documentType }) {
  // const [open, setOpen] = React.useState(false);
  const [docData, setDocData] = React.useState("");
  useEffect(() => {
    if (Open && documentType) {
      console.log('hi');
      docDetails();
    }
  }, [Open, documentType]);


  async function docDetails() {
    const result = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_APP_BASE_URL}/docType/detailedInfo`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        documentType: documentType
      }
    });
    console.log(result.data);
    setDocData(result.data.out);
  }

 



  return (
    <div>

      {/* Slide transition instead of Fade */}
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      > */}
       <Dialog
        open={Open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            maxWidth: '950px',  // Adjust the width and height as needed
            width:950,
            height: '500px',
            padding:'2%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
          }
        }}
      >
      
            <DataTable jsonData={docData} />


      </Dialog>

  
         

    </div>
  );
}
