import React from 'react'
// card
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



export default function CardReport({ title, count, image, Nverified,documentSummary }) {
  console.log(count);
  return (
    <>
    {/* {console.log("document title",title )}
    {console.log("document summary",documentSummary )} */}
      <Card sx={{ display: 'flex', maxWidth: 370, width: 340, alignItems: 'flex-start', justifyContent: 'flex-start', padding: '1%' }} className='!shadow-md !rounded-lg'>
        <div className='w-3/5 my-auto'>
        <div className='text-center'>{title === 'Doc Attached' ? title : title === 'Truck Verify' ? title : "" }</div>
        <CardMedia className='w-14 h-28 p-2'
          component="img"
          sx={{ width: 100, height: 100, marginY: 'auto',mx:'auto' }}
          image={image}
          alt="doc attach.png"

        />
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginY: 'auto' }}>
          <CardContent sx={{
            padding: '0px', paddingBottom: '0px', '&:last-child': {
              paddingBottom: '0px',
            }
          }}>
            <Typography component="div" variant="h6" fontFamily='poppins' color='black' textAlign='right' fontWeight='bold' className={title === 'Truck Verify' ? 'font-poppins font-bold !mt-2' : 'font-poppins font-bold !mt-4'}>
              <div className='whitespace-pre'>{title === 'Truck Verify' ? `Verified   ${count}` : title === 'Doc Attached' ? `TotalDoc   ${documentSummary && documentSummary.length>0 ? documentSummary[0].totalDocument:0}`:""}</div>
              <div className='whitespace-pre'>{title === 'Truck Verify' ? `Unverified   ${Nverified}` : title === 'Doc Attached' ? `WeekDoc   ${documentSummary && documentSummary.length>0 ? documentSummary[0].currentWeekCount:0}` : ""}</div>
              <div className='whitespace-pre'>{title === 'E-Way Bill' ? count : title === 'Doc Attached' ? `MonthDoc  ${documentSummary && documentSummary.length > 0 ? documentSummary[0].currentMonthCount:0}` : ""}</div>
              {/* //  <div>{title === 'Doc Attached' ? `Unverified  ${Nverified}` : ""}</div>
                //  <div>{title === 'Doc Attached' ? `Verified  ${count}` : count}</div> */}

            </Typography>
            <Typography variant="subtitle1" color="black" fontFamily='poppins' component="div" className='text-right'>
              {title === 'Doc Attached' ? "" : title === 'Truck Verify' ? "" : title}
            </Typography>
            {/* <Typography variant="subtitle1" color="text.secondary" component="div" className='p-0'>
                  sdfsdfdf
                </Typography> */}
          </CardContent>

        </Box>
      </Card>



    </>
  )
}
