import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import CustomModal from './CustomModal';




export default function DocExpiring({ title, data }) {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [docType,setDocType] = React.useState(false);
    const handleOpen = (e) => {setOpen(true);setDocType(e.target.parentElement.parentElement.children[0].innerHTML)};
 
    // Check if data is defined and contains valid data
    if (!data) {
        return null;  // Do not render anything if there's no valid data
    }
    return (
        <>

            {/* <Card sx={{ padding: '1%', boxShadow: 2, borderRadius: 2, maxWidth: 800, width: 600, flexBasis: '46%', marginX: 'auto',height:300 }}> */}
            <Card className='min-w-[300px] p-2 bg-white shadow-lg !rounded-lg h-68 mt-4' >
                <CardContent >
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className='font-poppins'>{title}</span>
                    </Typography>


                    <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='!font-poppins'>Document Type</TableCell>
                                        <TableCell align="right" className='!font-poppins'>Vehicles Expiring  (Next Month)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="td" scope="row" align='left'>{row.Document_Type}</TableCell>
                                            <TableCell   component="td" scope="row" align='right' className='!text-red-600'><Link href="#" sx={{}} onClick={handleOpen}>{row.Vehicles_Expiring}</Link></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>



                    </Box>

                </CardContent>
            </Card>




         <CustomModal Open={open} handleClose={handleClose}  documentType={docType}/>


        </>
    )
}
