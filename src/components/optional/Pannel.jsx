import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Pannel({ title, data, checkObj, loading }) {
    console.log(data);
    return (
        <>
            <div>
                <Accordion defaultExpanded>
                    <AccordionSummary

                        aria-controls="panel3-content"
                        id="panel3-header"
                        style={{ backgroundColor: 'rgb(37 99 235)' }}
                    >
                        <Typography className="text-white" style={{ fontFamily: 'Poppins' }}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>

                                </div>
                                <div className='basis-[40%] m-2'>
                                    <h1 className='text-blue-600 font-semibold text-3xl py-2 font-poppins mr-2'>VEHICLE NO - {data.rc_number}</h1>

                                </div>
                                <div className='basis-[20%] m-2'>

                                </div>
                            </div>



                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Owner Name</h1>
                                    <h1 className='text-black  '>{data.owner_name === "null" ? " " : data.owner_name}</h1>
                                </div>

                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Son/Wife/Daughter of</h1>
                                    <h1 className='text-black '>{data.father_name === "null" ? " " : data.father_name}</h1>

                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Present Address</h1>
                                    <h1 className='text-black'>{data.present_address === "null" ? " " : data.present_address}</h1>
                                </div>

                            </div>


                            {/* second row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Engine Number</h1>
                                    <h1 className='text-black'>{data.vehicle_engine_number === "null" ? " " : data.vehicle_engine_number}</h1>
                                </div>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Chassis Number</h1>
                                    <h1 className='text-black'>{data.vehicle_chasi_number === "null" ? " " : data.vehicle_chasi_number}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Seating Capacity</h1>
                                    <h1 className='text-black'>{data.seat_capacity === "null" ? " " : data.seat_capacity}</h1>
                                </div>
                            </div>


                            {/* third row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Registration Date</h1>
                                    <h1 className='text-black'>{data.registration_date.split('T')[0] === "null" ? " " : data.registration_date.split('T')[0]}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Registered At</h1>
                                    <h1 className='text-black'>{data.registered_at === "null" ? " " : data.registered_at}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Body Type</h1>
                                    <h1 className='text-black'>{data.body_type === "null" ? " " : data.body_type}</h1>
                                </div>
                            </div>

                            {/* fifth row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Fitness Valid Upto</h1>
                                    <h1 className='text-black'>{data.fit_up_to.split('T')[0] === "null" ? " " : data.fit_up_to.split('T')[0]}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Road Tax Valid Upto</h1>
                                    <h1 className='text-black'>{data.tax_upto.split('T')[0] === "null" ? " " : data.tax_upto.split('T')[0]}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>RC Status</h1>
                                    <h1 className='text-black'>{data.rc_status === "null" ? "" : data.rc_status}</h1>
                                </div>

                            </div>




                            {/* eight row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Insurance Policy Number</h1>
                                    <h1 className='text-black'>{data.insurance_policy_number === "null" ? " " : data.insurance_policy_number}</h1>
                                </div>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Insurance Valid Upto</h1>
                                    <h1 className='text-black'>{data.insurance_upto.split('T')[0] === "null" ? " " : data.insurance_upto.split('T')[0]}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Insurance Company</h1>
                                    <h1 className='text-black'>{data.insurance_company === "null" ? " " : data.insurance_company}</h1>
                                </div>

                            </div>

                            <div className='flex justify-between items-center'>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>PUCC Number</h1>
                                    <h1 className='text-black'>{data.pucc_number === "null" ? " " : data.pucc_number}</h1>
                                </div>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>PUCC Upto</h1>
                                    <h1 className='text-black'>{data.pucc_upto === "null" ? " " : data.pucc_upto}</h1>
                                </div>


                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm  font-work'>Unladen Weight</h1>
                                    <h1 className='text-black'>{data.unladen_weight === "null" ? " " : data.unladen_weight}</h1>
                                </div>
                            </div>

                            {/* ninth row */}
                            <div className='flex justify-between items-center'>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>National Permit Number</h1>
                                    <h1 className='text-black'>{data.national_permit_number === "null" ? " " : data.national_permit_number}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>National Permit Upto</h1>
                                    <h1 className='text-black'>{data.national_permit_upto === "null" ? " " : data.national_permit_upto}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>National Permit Issue By</h1>
                                    <h1 className='text-black'>{data.national_permit_issued_by === "null" ? " " : data.national_permit_issued_by}</h1>
                                </div>
                            </div>

                            {/* twelth row */}
                            <div className='flex justify-between items-center'>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Permit Number</h1>
                                    <h1 className='text-black'>{data.permit_number === "null" ? " " : data.permit_number}</h1>
                                </div>


                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Permit Upto</h1>
                                    <h1 className='text-black'>{data.permit_valid_upto === "null" ? " " : data.permit_valid_upto}</h1>
                                </div>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Permit Valid From</h1>
                                    <h1 className='text-black'>{data.permit_valid_from === "null" ? " " : data.permit_valid_from}</h1>
                                </div>
                            </div>
                            {/* fourth row */}
                            <div className='flex justify-between items-center'>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Standing Capacity</h1>
                                    <h1 className='text-black'>{data.standing_capacity === "null" ? " " : data.standing_capacity}</h1>
                                </div>



                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>BlackList</h1>
                                    <h1 className='text-black'>{data.blacklist_status === "null" ? " " : data.blacklist_status}</h1>
                                </div>
                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Vehicle Category</h1>
                                    <h1 className='text-black'>{data.vehicle_category === "null" ? " " : data.vehicle_category}</h1>
                                </div>
                            </div>


                            {/* SIXTH row */}
                            <div className='flex justify-between items-center'>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Cylinders</h1>
                                    <h1 className='text-black'>{data.no_cylinders === "null" ? " " : data.no_cylinders}</h1>
                                </div>


                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Fuel Type</h1>
                                    <h1 className='text-black'>{data.fuel_type === "null" ? " " : data.fuel_type}</h1>
                                </div>




                                <div className=' basis-[30%] m-2'>
                                    <h1 className='text-slate-400 text-sm font-work'>Maker Model</h1>
                                    <h1 className='text-black '>{data.maker_model === "null" ? " " : data.maker_model}</h1>
                                </div>

                            </div>




                            {/* SEVENTH row */}
                            <div className='flex justify-between items-center'>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Cubic Capacity</h1>
                                    <h1 className='text-black'>{data.cubic_capacity === "null" ? " " : data.cubic_capacity}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Financed</h1>
                                    <h1 className='text-black'>{data.financed === "null" ? " " : data.financed}</h1>
                                </div>

                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Financer</h1>
                                    <h1 className='text-black'>{data.financer === "null" ? " " : data.financer}</h1>
                                </div>
                            </div>




                            {/* tenth  row */}




                            {/* eleventh */}
                            <div className='flex justify-between items-center'>


                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Sleeping Capacity</h1>
                                    <h1 className='text-black'>{data.sleeper_capacity === "null" ? " " : data.sleeper_capacity}</h1>
                                </div>


                                <div className='basis-[30%] m-2'>
                                    <h1 className='text-slate-400 font-work'>Permit Type</h1>
                                    <h1 className='text-black'>{data.permit_type === "null" ? " " : data.permit_type}</h1>
                                </div>


                            </div>


                            <div className='flex justify-between items-center'>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>



        </>
    )
}
