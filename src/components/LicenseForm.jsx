import React from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import './../css/license.css';
import CustomButton from './optional/CustomButton';


const LicenseForm = ({ title, data, checkArray, loading, url }) => {

  
  const handleClick = () => {
    window.print();
  }

  // changing date format
  const changedateformatter = (date) => {
    const search_date = date.split('-');
    const new_form_date = search_date[2] + '/' + search_date[1] + '/' + search_date[0]
    return new_form_date;
  }


  return (
    <div id='license-viewer'>
      <Box sx={{ p: 3 }} >


        {/* Result Section */}
        <Paper elevation={3} sx={{ mt: 4, p: 2, border: '2px solid #b9c9fe' }} >
          <CustomButton id={'prtbtn'} value={'Print'} receiveAction={handleClick} padding={'15px 15px'} />


          <Typography sx={{ padding: '10px', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'underline', letterSpacing: 0, textAlign: 'center' }} variant="h6" gutterBottom className='font-poppins'>
            Details Of Driving License: {data.license_number}
          </Typography>




          <div className=' flex items-center justify-end py-3'>
            <img src={`data:image/png;base64,${url}`} width='100px' height='150px' className='' />
          </div>

          <table className='m-0 mb-2 w-full'>
            <tr className='first-row'>
              <td className='p-2 first-col text-left font-bold text-[14px]'>Current Status</td>
              <td className='p-2 second-col text-left text-base'>{data.current_status}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 first-col text-left font-bold text-[14px]'>Holder's Name</td>
              <td className='p-2 second-col text-left text-base'>{data.name}</td>
            </tr>
            <tr className='first-row'>
              <td className='p-2 first-col text-left font-bold text-[14px]'>Old / New DL No.</td>
              <td className='p-2 second-col text-left text-base'>{data.license_number}</td>
            </tr>
          </table>


          <Typography sx={{ padding: '10px', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'underline', letterSpacing: 0 }} variant="h6" gutterBottom className='font-poppins'>
            <center>Driving License Initial Details</center>
          </Typography>


          <table className='m-0 mb-2 w-full'>
            <tr className='first-row'>
              <td className='p-2 first-col text-left font-bold text-[14px]'>Initial Issue Date</td>
              <td className='p-2 second-col text-left text-base'>{changedateformatter(data.doi)}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 first-col text-left font-bold text-[14px]'>Initial Issuing Office</td>
              <td className='p-2 second-col text-left text-base'>{data.ola_name}</td>
            </tr>
          </table>


          <Typography sx={{ padding: '10px', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'underline', letterSpacing: 0 }} variant="h6" gutterBottom className='font-poppins'>
            <center>Driving License Validity Details</center>
          </Typography>

          <table className='m-0 mb-2 table-fixed w-full'>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-[14px] w-[30%]'>Non-Transport</td>
              <td className='p-2 w-[30%] text-left text-base'><span className=' text-left font-bold text-[14px]'>From: </span>{changedateformatter(data.doi)}</td>
              <td className='p-2 w-[30%] text-left text-base'><span className='text-left font-bold text-[14px]' >To: </span>{changedateformatter(data.doe)}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 text-left font-bold text-[14px]  w-[30%]'>Transport</td>
              <td className='p-2 w-[30%] text-left text-base'><span className='text-left font-bold text-[14px]'>From: </span>{changedateformatter(data.transport_doi)}</td>
              <td className='p-2 w-[30%] text-left text-base'><span className='text-left font-bold text-[14px]'>To: </span>{changedateformatter(data.transport_doe)}</td>
            </tr>
          </table>


          <Typography sx={{ padding: '10px', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'underline', letterSpacing: 0 }} variant="h6" gutterBottom className='font-poppins'>
            <center>Other Information</center>
          </Typography>

          <table className='m-0 mb-2 w-full'>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>Father/Husband Name</td>
              <td className='p-2 second-col text-left text-base'>{data.father_or_husband_name}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>DOB</td>
              <td className='p-2 second-col text-left text-base'>{changedateformatter(data.dob)}</td>
            </tr>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>Gender</td>
              <td className='p-2 second-col text-left text-base'>{data.gender}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>Present Address</td>
              <td className='p-2 second-col text-left text-base'>{data.temporary_address}</td>
            </tr>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>Permanent Address</td>
              <td className='p-2 second-col text-left text-base'>{data.permanent_address}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 text-left font-bold text-[14px] first-col'>State</td>
              <td className='p-2 second-col text-left text-base'>{data.state}</td>
            </tr>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-sm first-col'>Ola Code</td>
              <td className='p-2 second-col text-left text-base'>{data.ola_code}</td>
            </tr>
            <tr className='second-row'>
              <td className='p-2 text-left font-bold text-sm first-col'>Blood Group</td>
              <td className='p-2 second-col text-left text-base'>{data.blood_group}</td>
            </tr>
            <tr className='first-row'>
              <td className='p-2 text-left font-bold text-sm first-col'>Vehicle Classes</td>
              <td className='p-2 second-col text-left text-base'> {data.vehicle_classes.map((item, index) =>
                (<><span key={index}> {item}</span></>)
              )}</td>
            </tr>
          </table>
          {/* Watermark */}
          <div className='watermark'>DL VERIFIED</div>
        </Paper>

      </Box>



    </div>
  );
};

export default LicenseForm;
