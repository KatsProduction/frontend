import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Pannel({ title, data, checkArray, loading ,url}) {
    return (
        <>
            <div>
                <Accordion defaultExpanded>
                    <AccordionSummary
                      
                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={{ backgroundColor: 'rgb(37 99 235)' }}
                    >
                        <Typography className="text-white font-semibold">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div className=' flex items-center justify-start '>
                                <img src={`data:image/png;base64,${url}`} width='100px' height='150px'className='' />
                                <div className='m-auto'>
                                <h1 className='text-blue-600 font-semibold text-4xl'>DL - {data.license_number}</h1>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400  text-sm font-work'>Name</h1>
                                    <h1 className='text-black  '>{data.name}</h1>
                                </div>

                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Blood Group</h1>
                                    <h1 className='text-black '>{data.blood_group}</h1>

                                </div>

                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Father Name</h1>
                                    <h1 className='text-black '>{data.father_or_husband_name}</h1>
                                </div>
                            </div>


                            {/* second row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Ola Code</h1>
                                    <h1 className='text-black'>{data.ola_code}</h1>
                                </div>

                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm  font-work'>Ola Name</h1>
                                    <h1 className='text-black'>{data.ola_name}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Temporary Address</h1>
                                    <h1 className='text-black'>{data.temporary_address}</h1>
                                </div>
                            </div>


                            {/* third row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>PinCode</h1>
                                    <h1 className='text-black'>{data.temporary_zip}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Transport DOI</h1>
                                    <h1 className='text-black'>{data.transport_doi}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Transport DOE</h1>
                                    <h1 className='text-black'>{data.transport_doe}</h1>
                                </div>
                            </div>


                            {/* fourth row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>State</h1>
                                    <h1 className='text-black'>{data.state}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Initial DOI</h1>
                                    <h1 className='text-black'>{data.initial_doi}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Gender</h1>
                                    <h1 className='text-black'>{data.gender}</h1>
                                </div>

                            </div>


                            {/* fifth row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>DOB</h1>
                                    <h1 className='text-black'>{data.dob}</h1>
                                </div>

                                {/* <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>License Number</h1>
                                    <h1 className='text-black'>{data.license_number}</h1>
                                </div> */}

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Vehicle Class</h1>
                                    <h1 className='text-black'>
                                        {data.vehicle_classes.map((item, index) =>

                                            (<><span key={index}>{item},</span></>)
                                        )}</h1>
                                </div>



                            </div>



                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>



        </>
    )
}
